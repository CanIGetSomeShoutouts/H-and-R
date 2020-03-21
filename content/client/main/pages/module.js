/* global angular */ (function() {
  "use strict";

  // add crud moduled as dependencies to the array below.
  angular.module("client.main.pages", [
    "ui.router",
    "client.main.pages.appointmentEvents",
    "client.main.pages.questionnaireResponses",
    "client.main.pages.treatmentInvitations",
    "client.main.pages.users",
    "client.main.pages.login",
    "client.main.pages.intakeForms",
    "client.main.pages.journalEvents",
    "client.main.pages.journalTags",
    "client.main.pages.supportPosts",
    "client.main.pages.traumas",
    "client.main.pages.files",
    "client.main.pages.questionnaires",
    "client.main.pages.trauma.types",
    "client.main.pages.clientProfiles",
    "client.main.pages.register",
    "client.main.pages.addresses",
    "client.react"
  ]);

  angular.module("client.main.pages").config(RouteConfig);
  RouteConfig.$inject = ["$stateProvider"];

  function RouteConfig($stateProvider) {
    $stateProvider
      // NOTE: States organized in alphabetical order!!
      .state('main.appointmentEvent', {
        url: '/test-appointment-form',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="TestAppointmentForm">'
          }
        }
      })
      .state('main.confirmTreatment', {
        url: '/confirm-treatment/:invitationId',
        views: {
          'body@main': {
            component: "confirmTreatmentInvitation"
          }
        }
      })
      .state('main.intakeForm', {
        url: '/:treatmentInvitationId/intake-form',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="IntakeForm" />'
          }
        },
        resolve: {
          urlParams: getTreatmentUrlParams
        },
        params: {
          treatmentInvitationId: null
        }
      })
      .state('main.journal', {
        url: "/my-journal",
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="Journal" />'
          }
        }
      })
      .state("main.journal-detail-test", {
        url: "/journal-detail-test/:id",
        views: {
          "body@main": {
            template:
              '<react-loader props="$resolve" react-component="JournalDetailTest" /> '
          }
        },
        resolve: {
          urlParams: getJournalUrlParams
        }
      })
      .state('main.journalTags.menuTest', {
        url: '/menu-test',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="TagMenuTestPage" />'
          }
        }
      })
      .state('main.myClients', {
        url: '/my-clients',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="MyClients" />'
          }
        }
      })
      .state('main.myTimeline', {
        url: '/my-timeline',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="MyTimeline" />'
          }
        },
        resolve: {}
      })
      .state('main.profileCreateDetail', {
        url: '/{_id}/profile/create',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="ProfileCreateDetail" />'
          }
        }
      })
      .state('main.settings', {
        url: '/settings',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="SettingsDetail" />'
          }
        },
        resolve: {}
      })
      .state('main.supporter', {
        url: "/supporter",
        views: {
          "body@main": {
            template: '<react-loader props="$resolve" react-component="Supporter" />'
          }
        }
      })
      .state('main.supporters', {
        url: '/my-supporters',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="SupportManagement" />'
          }
        },
      })
      .state('main.supportInvitationsList', {
        url: '/admin/support-invitations/list',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="SupportInvitationsList" />'
          }
        }
      })
      .state('main.supportInvitationsDetail', {
        url: '/admin/support-invitations/detail',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="SupportInvitationsDetail" />'
          }
        }
      })
      .state('main.supportPost', {
        url: '/test-support-post-form/:clientId',
        views: {
          "body@main": {
            template:
              '<react-loader props="$resolve" react-component="TestSupportPostForm">'
          }
        },
        resolve: {
          urlParams: getClientUrlParams
        }
      })
      .state('main.userConfirmEmail', {
        url: "/users/:id/confirm-email",
        views: {
          'body@main': {
            component: "userConfirmEmail"
          }
        }
      })
      .state("main.userJournal", {
        url: "/journal/:userId",
        views: {
          "body@main": {
            template:
              '<react-loader props="$resolve" react-component="UserJournal" />'
          }
        },
        resolve: {
          urlParams: getUrlParams
        }
      })
      .state("main.userJournalDetail", {
        url: "/journal/:userId/:journalEventId",
        views: {
          "body@main": {
            template:
              '<react-loader props="$resolve" react-component="UserJournal" />'
          }
        },
        resolve: {
          urlParams: getJournalEventId
        }
      })
      .state("main.userProfile", {
        url: "/profiles/:id",
        views: {
          "body@main": {
            template:
              '<react-loader props="$resolve" react-component="Profile" />'
          }
        },
        resolve: {
          urlParams: getProfileUrlParams
        }
      })
      .state("main.userTimeline", {
        url: "/timeline/:userId",
        views: {
          "body@main": {
            template: '<react-loader props="$resolve" react-component="UserTimeline" />'
          }
        },
        resolve: {
          urlParams: getUrlParams
        }
      })
      .state("main.userSupportPosts", {
        url: "/test-support-posts/:userId",
        views: {
          "body@main": {
            template:
              '<react-loader props="$resolve" react-component="TestSupport" />'
          }
        },
        resolve: {
          urlParams: getUrlParams
        }
      })
      .state('main.userIntakeform', {
        url: '/profile/:userId/intake-form',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="ViewUserIntakeform" />'
          }
        },
        resolve: {
          urlParams: getUrlParamsView
        }
      })
      .state('main.supportees', {
        url: '/my-supportees',
        views: {
          'body@main': {
            template: '<react-loader props="$resolve" react-component="MyClients">'
          }
        }
      })
  }

  // NOTE: Resolve functions organized alphabetically !!!
  getClientUrlParams.$inject = ['$stateParams']
  getJournalEventId.$inject = ['$stateParams']
  getJournalUrlParams.$inject = ['$stateParams']
  getProfileUrlParams.$inject = ['$stateParams']
  getTreatmentUrlParams.$inject = ['$stateParams']
  getUrlParams.$inject = ['$stateParams']
  getUrlParamsView.$inject = ['$stateParams']

  function getClientUrlParams($stateParams) {
    return {
      clientId: $stateParams.clientId
    }
  }

  function getJournalEventId($stateParams) {
    return {
      id: $stateParams.journalEventId,
      userId: $stateParams.userId
    }
  }

  function getJournalUrlParams($stateParams) {
    return {
      id: $stateParams.id
    }
  }

  function getProfileUrlParams($stateParams) {
    return {
      id: $stateParams.id
    }
  }

  function getTreatmentUrlParams($stateParams) {
    return {
      id: $stateParams.treatmentInvitationId
    }
  }

  function getUrlParams($stateParams) {
    return {
      userId: $stateParams.userId
    }
  }
  function getUrlParamsView($stateParams) {
    return {
      id: $stateParams.userId
    }
  }
})();
