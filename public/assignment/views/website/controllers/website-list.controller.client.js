(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($location, $routeParams, WebsiteService) {
        var model = this;
        model.loadPages = loadPages;
        model.editWebsite = editWebsite;
        model.loadUserProfile = loadUserProfile;
        model.addWebsite = addWebsite;
        function init() {
            model.userId = $routeParams.uid;
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function(websites){
                    model.websites =websites;
                });
        }

        init();

        function loadPages(websitedId) {
            $location.url($location.url() + "/" + websitedId + "/page");
        }

        function editWebsite(websitedId) {
            $location.url($location.url() + "/" + websitedId + "/");
        }

        function addWebsite() {
            $location.url($location.url() + "/new/");
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }
})();