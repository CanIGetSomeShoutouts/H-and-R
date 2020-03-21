const es = require('event-stream')
const gulp = require('gulp')
const minimist = require('minimist')
const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const mergeStream = require('merge-stream')
const stripAnsi = require('strip-ansi')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const babelify = require('babelify')
const bro = require('gulp-bro')
const rename = require('gulp-rename')

const plugins = require('gulp-load-plugins')()
const { concat, uglify, zip, plumber, babel, notify, stripComments: strip } = plugins
const gulpif = plugins.if

var scripts = require('./content/vendor.scripts.json')

var source = {
    js: {
        src: [
            // root module file
            'content/client/module.js',

            // subordinate module files
            'content/client/**/module.js',

            // other js files [controllers, services, etc.]
            'content/client/**/!(module)*.js'
        ]
    }
}

var destinations = {
    js: 'content/build'
}

const appWasBroken = {
    js: false
}

gulp.task('js', buildApp('js'))

// creates task to concat angular files
function buildApp(fileset) {
    return function () {
        let isBroken = false

        gulp.src(source[fileset].src, { base: './' })
            .pipe(plumber({
                errorHandler: error => {
                    isBroken = true
                    appWasBroken[fileset] = true
                    const strippedError = Object.create(error)
                    strippedError.stack = stripAnsi(error.stack)
                    return notify.onError("<%= error.stack %>")(strippedError)
                }
            }))
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015'],
                plugins: ["transform-object-rest-spread"]
            }))
            // .pipe(uglify())
            .pipe(concat('all.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(destinations.js))
            .pipe(gulpif(
                file => {
                    if (!appWasBroken[fileset] || isBroken) return false
                    appWasBroken[fileset] = false
                    return true
                },
                notify(`${fileset} app fixed!`)
            ))
            .on('error', swallowError)
    }
}

gulp.task('watch', ['js', 'rjs'], function () {
    gulp.watch(source.js.src, { interval: 200 }, ['js'])
    gulp.watch('./content/client.react/**/*.{js,jsx}', ['rjs'])
})

// builds vendor files listed in app.scripts.json
gulp.task('vendor', () => buildVendor(scripts, destinations.js))

function buildVendor(scripts, dest) {
    let tasks = []
    _.forIn(scripts.chunks, function (chunkScripts, chunkName) {
        let paths = []
        chunkScripts.forEach(function (script) {
            let scriptFileName = scripts.paths[script]
            let scriptPath = path.join(__dirname, scriptFileName)
            if (!fs.existsSync(scriptPath)) {
                throw console.error(`Required path doesn't exist: ${scriptPath}`, script)
            }
            paths.push(scriptFileName)
        })

        tasks.push(gulp.src(paths)
            .pipe(concat(chunkName + '.js'))
            .on('error', swallowError)
            .pipe(strip())
            .pipe(uglify())
            .pipe(gulp.dest(dest)))
    })
    return mergeStream(tasks)
}

gulp.task('default', ['dev'])
gulp.task('dev', ['vendor'/* , 'js', 'rjs' */, 'watch'])

const knownOptions = {
    string: 'packageName',
    string: 'packagePath',
    default: {
        packageName: 'Package.zip',
        packagePath: path.join(__dirname, '_package')
    }
}

const options = minimist(process.argv.slice(2), knownOptions)
// This task is specifically setup for deploying to AZURE.

gulp.task('prod', ['vendor', 'js', 'rjs'])

function buildProdPackage() {
    let packagePaths = ['**',
        '!**/_package/**',
        '!**/typings/**',
        '!typings',
        '!_package',
        '!gulpfile.js',
        '!**/client/libs/**'
    ]

    // add exclusion patterns for all dev dependencies
    let packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'))
    let devDeps = packageJSON.devDependencies

    for (let propName in devDeps) {
        let excludePattern1 = '!**/node_modules/' + propName + '/**'
        let excludePattern2 = '!**/node_modules/' + propName
        packagePaths.push(excludePattern1)
        packagePaths.push(excludePattern2)
    }

    return gulp.src(packagePaths)
        .pipe(zip(options.packageName))
        .pipe(gulp.dest(options.packagePath))
}

function swallowError(src, task, error) {
    notify(error.toString())
    console.log(error.toString())
    this.emit('end')
}

gulp.task('rjs', buildRjs)

function buildRjs() {
    return gulp.src('./content/client.react/angular.wrapper/module.js')
        .pipe(bro({
            extensions: [".jsx", ".js"],
            debug: true,
            paths: ["./content/client.react/"],
            transform: [
                babelify.configure({
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread"]
                }),
                ['browserify-shim', { global:true}]
            ]
        }))
        .pipe(rename("all.react.js"))
        .pipe(gulp.dest('./content/build'))
}