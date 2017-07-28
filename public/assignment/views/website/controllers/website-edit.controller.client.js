(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var model = this;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;
        model.loadUserProfile = loadUserProfile;
        model.loadPages = loadPages;
        model.editWebsite = editWebsite;
        model.addWebsite = addWebsite;
        model.showWebsites = showWebsites;
        function init() {
            model.userId = $routeParams.uid;
            model.wid = $routeParams.wid;
            WebsiteService.findWebsitesByUser(model.userId)
                .then(function(websites){
                    model.websites =websites;
                });

            WebsiteService.findWebsiteById(model.userId,model.wid)
                .then(function(website){
                    model.website =website;
                });

        }

        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(model.userId,model.wid, website)
                .then(function (response) {
                    showWebsites();
                });
        }

        function addWebsite() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements + "/new/");
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
            $location.url(pathelements + "/" + websitedId);
        }

        function showWebsites() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.wid)
                .then(function (response) {
                    window.history.back();
                });
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }
})();