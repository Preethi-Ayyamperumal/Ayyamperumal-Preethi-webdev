(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.addWebsite = addWebsite;
        model.loadUserProfile = loadUserProfile;
        model.loadPages = loadPages;
        model.editWebsite = editWebsite;
        model.addNewWebsite = addNewWebsite;
        model.showWebsites = showWebsites;

        function init() {
            model.uid = $routeParams.uid;
            model.websites = WebsiteService.findWebsitesByUser(model.uid);
        }

        init();

        function addWebsite(website) {
            var _website = WebsiteService.createWebsite(model.uid, website);
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }

        function addNewWebsite() {
            $location.url($location.url);
        }

        function loadPages(websitedId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements + "/" + websitedId + "/page");
        }

        function editWebsite(websitedId) {

            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements + "/" + websitedId + "/");
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.uid );
        }

        function showWebsites() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }
    }
})();