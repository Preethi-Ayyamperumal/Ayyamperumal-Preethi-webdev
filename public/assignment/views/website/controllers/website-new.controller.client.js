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
            model.userId = $routeParams.uid;
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function(websites){
                    model.websites =websites;
                });
        }

        init();

        function addWebsite(website) {
            WebsiteService.createWebsite(model.userId, website)
                .then(function(response){
                    var pathelements = $location.url().split("/");
                    pathelements.splice(-1, 1);
                    pathelements = pathelements.join("/")
                    $location.url(pathelements);
                });

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
            $location.url("/profile/" + model.userId );
        }

        function showWebsites() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }
    }
})();