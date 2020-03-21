; (function () {
  "use strict"

  angular
    .module("client.main.pages.journalEvents")
    .controller("journalListController", JournalListController)

  JournalListController.$inject = ["journalsEventsService", "$log", "$state", "uiNotificationsService"]

  function JournalListController(journalsEventsService, $log, $state, uiNotificationsService) {
    const vm = this
    vm.journals = []
    vm.delete = _delete
    vm.$onInit = $init

    function $init() {
      vm.journals = vm.journalList
    }

    function _delete(id, index) {
      uiNotificationsService.confirm("Are you sure you want to delete this journal event?", "Yes, delete", "No, cancel")
        .then(response => {
          if (!response) { return }
          return journalsEventsService.delete(id)
            .then(response => {
              uiNotificationsService.success("Journal event succesfully deleted.")
              vm.journals.splice(index, 1)
            })
            .catch(xhr => {
              $log.log(xhr)
              uiNotificationsService.error("An error occurred while attempting to delete the journal event.")
            })
        })
    }

  }
})();

; (function () {
  angular.module("client.main.pages.journalEvents").component("journalList", {
    templateUrl:
      "client/main/pages/journal.events/list/journal.events.list.html",
    controller: "journalListController as $ctrl",
    bindings: {
      journalList: "<"
    }
  })
})()
