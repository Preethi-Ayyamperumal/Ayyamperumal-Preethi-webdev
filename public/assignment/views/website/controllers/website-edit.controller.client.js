(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController( $location,$routeParams, WebsiteService,$rootScope) {
        var model = this;
        model.userId=$routeParams.uid;
        model.wid = $routeParams.wid;
        model.deleteWebsite=deleteWebsite;
        model.updateWebsite=updateWebsite;
        model.loadUserProfile = loadUserProfile;
        model.loadPages=loadPages;
        model.editWebsite=editWebsite;
        model.addWebsite=addWebsite;
        model.showWebsites=showWebsites;
        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
            model.website= WebsiteService.findWebsiteById(model.wid);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(model.wid,website);
            showWebsites();
        }
        function addWebsite() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/new/");
        }
        function loadPages(websitedId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/"+websitedId+"/page");
        }
        function editWebsite(websitedId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/"+websitedId);
        }

        function showWebsites() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.wid);
            window.history.back();
        }

        function loadUserProfile() {
            $location.url("/profile/" + $rootScope.currentUser);
        }
    }
})();