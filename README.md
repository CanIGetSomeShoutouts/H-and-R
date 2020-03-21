# node-angular-starter
This is the starter template for all Sabio cohort projects.

# Server Side
**server.js** acts as the main file or entry point into the application. From here, server.js sets up the necessary configurations such as:

* Serving up static files,
* Handling 404 for static files
* Setting up MongoDB connection
* PassportJS configuration
* Request body parsing and validation
* Registering routes

## App Folder Structure
From here, the /app folder is where most of the server side code lives.  The folder is laid out in a typical MVC like structure with folders for controllers, services and models with an additional folder for routes.  Both the controllers and the services are examples of exporting a contructor function.  This means that any module that wants to _require_ in these modules needs to invoke the module to have access to the functions inside.

### Response Models
Inside of the models/responses folder you will find a set of ES6 classes that allow you to create response objects to send back to your clients.

### Routes
**routes/index.js** is considered the main route file where all routes are to be registered.  Each set of routes will be contained in their own route js file, i.e. api/hackers* routes, would be contained within hackers.routes.js. Each of these route files creates it's own instance of an Express router, which in turn is exported by the file. We can then attach these router instances and their routes to our main router instance inside index.js by requiring the modules.

## Serving static files via Express
To serve static file using express, you need to let express know where those files should be served from.  Using the function express.static, you pass in the name of the directory that contains all your static files.
This starter project serves all static files from the /content directory. To reference these files in your client side code, you only need to prefix /content, i.e. /content/css/style.css.  You can allow to remove the prefix which would mean you can serve the same css file as /css/style.css.  The fallthrough option makes client errors fall-through as just unhandled requests which allows us to have a 404 handler immediately after our static file serving code.

Reference: https://expressjs.com/en/starter/static-files.html


# Client Side
The client side of this app is powered mostly by Angular & Angular UI Router. This app is meant to be a SPA where index.html acts as the parent html file.  Each angular feature is broken into a module and should follow John Papa's style guide.

## Modules
The /content/modules folder will contain all the angular code and modules for the app. There is a main.js file for bootstrapping the app to the html and the app.js which acts as the primary/main module.

Each module should be contained in it's own folder with an accompaning module.js file. The module.js file is responsible for setting up all the state routing and including any dependencies spefically needed for that module.  Each module should follow an MVC like structure as well with controller, services and views folders.  Directives, controllers, services, etc that can be used site wide can be included in the _common module.

Reference: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y160

## Routing
This starter app is set up to utilize UI Routers nested states/views feature. By doing this we can use a template for all other states to inherit.  The layout module sets up the an abstract state (client) that all other modules will inherit from by creating child states.  index.html contains a named view called "root" which the layout module uses to include layout.tpl.html. Inside of layout.tpl.html is a named view called "content". The content named view is how/where all the child states will inject their views.  The do so by using the absolute view "content@client".
Template urls should be prefixed according to what you've detailed in your express app for serving static files.

## Bower & Gulp
Since this is app is built to be a SPA, there is a need to have a system of building production like files to include on the page. If we did not use one of these systems, we would need to individually include every controller, service and module file into out index.html which would be a hassle to maintain.  This is where Bower & Gulp come into play.  While they serve 2 different tasks, they both end up working together.

### Bower
Bower, like NPM, is meant as a dependancy manager.  This app uses Bower to manage only client side dependencies, i.e. angular, bootstrap, jQuery.  The bower.json is synonymous  with package.json and is used to list all dependencies. The .bowerrc file is a bower configuration file that tell bower to install dependencies inside of content/libs (by default bower install into a directory call bower_components).

### Gulp
Gulp is a build/task manager that allows for easy automation. This app uses it to build client side js files. Gulp requires to you have gulp install both globally (npm install gulp -g) and locally (npm install gulp --save-dev).  Two files play key roles in Gulp's build process, the /gulpfile.js and /content/vendor.scripts.json.  Inside of gulpfile.js we can create tasks we can from from the gulp command.  Be default typing gulp into you command line (when in the server directory) will run the default task, which is dev. The dev task runs the following tasks and include the built files into the /content/build directory:

* Vendor

    This task takes your vendor.scripts.json file and proceeds to build one js file including all vendors listed.  You can break your vendors into two or even three sections if you like. Current this app only has vendor and vendor.ui.  The paths key in the vendor.scripts.json file point to the physical location of each vendor js main file. This is what Gulp uses to concat all the files together. Whenever you bower install a package, your next step should be to include it in your vendor.scripts.json file so that Gulp will build this into your vendor file. Your vendor file is then the only file you need to include in your index.html when referencing third party libraries.

* JS

   This task looks at all the paths listed in the "sources" object within gulpfile.js. The sources object will contain a list of all the angular files that need to be joined together into one file.  The file that is created from all of these angular files will be called all.js. Since all your angular files will be wrapped in an iffe, there is no need for concern of global variable conflicts.

* Watch

   This task simply just watches for changes in the sources object and will rerun the js task.