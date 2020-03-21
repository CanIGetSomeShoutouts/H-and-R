"use strict"

// this file allows us to find react components from angular.

// import all components here
const HackersList = require("../hackers/Hackers.List")
const HackersDetail = require("../hackers/Hackers.Detail")
const Journal = require("../main/pages/journal")
const JournalDetailTest = require('../main/pages/journal.detail.test')
const SettingsDetail = require("../main/pages/settings")
const SupportManagement = require('../main/pages/support.management')
const TagMenuTestPage = require('../main/pages/journal.tag.test.page')
const SupportInvitationsList = require('../main/pages/support.invitations/support.invitations.list')
const SupportInvitationsDetail = require('../main/pages/support.invitations/support.invitations.detail')
const IntakeForm = require('../main/pages/intake.form')
const UserJournal = require("../main/pages/user.journal")
const IconUploader = require('../main/shared/journal.tag.icon.uploader')
const MyClients = require('../main/pages/my.clients')
const ProfileCreateDetail = require('../main/pages/profile.create.detail')
const Login = require('../secondary/pages/login.page')
const RegistrationDetail = require('../secondary/pages/registration')
const SupporterSignup = require('../secondary/pages/supporter.sign.up')
const Profile = require('../main/pages/user.profile')
const TestAppointmentForm = require('../main/pages/test.appointment.form')
const AppointmentForm = require('../main/shared/appointment.form')
const Supporter = require("../main/pages/supporter")
const MyTimeline = require('../main/pages/my.timeline')
const UserTimeline = require("../main/pages/user.timeline")
const Homepage = require("../secondary/pages/homepage")
const ViewUserIntakeform = require('../main/pages/user.intakeform')
const TestSupportPostForm = require("../main/pages/test.support.post.form")
const TestSupport = require("../main/pages/test.support.posts")
const UserSupportPosts = require("../main/shared/user.support.posts")
const ChangeEmailForm = require('../main/pages/change.email.form')

module.exports = {
    // list all components here
    HackersList: HackersList,
    HackersDetail: HackersDetail,
    TagMenuTestPage: TagMenuTestPage,
    Journal: Journal,
    JournalDetailTest: JournalDetailTest,
    SettingsDetail: SettingsDetail,
    SupportManagement: SupportManagement,
    ProfileCreateDetail: ProfileCreateDetail,
    SupportInvitationsList: SupportInvitationsList,
    SupportInvitationsDetail: SupportInvitationsDetail,
    IntakeForm: IntakeForm,
    UserJournal: UserJournal,
    IconUploader: IconUploader,
    MyClients: MyClients,
    Login: Login,
    RegistrationDetail: RegistrationDetail,
    SupporterSignup: SupporterSignup,
    Supporter: Supporter,
    Homepage: Homepage,
    Profile: Profile,
    TestAppointmentForm: TestAppointmentForm,
    AppointmentForm: AppointmentForm,
    TestSupportPostForm: TestSupportPostForm,
    RegistrationDetail: RegistrationDetail,
    MyTimeline: MyTimeline,
    UserTimeline: UserTimeline,
    ViewUserIntakeform: ViewUserIntakeform,
    TestSupport: TestSupport,
    UserSupportPosts: UserSupportPosts,
    ChangeEmailForm: ChangeEmailForm
}
