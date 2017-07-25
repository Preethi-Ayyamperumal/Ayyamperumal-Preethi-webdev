(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController( $location,$routeParams, WebsiteService) {
        var model = this;

        model.userId = $routeParams.uid;
        model.loadPages=loadPages;
        model.editWebsite=editWebsite;
        model.loadUserProfile = loadUserProfile;
        model.addWebsite = addWebsite;
        function init() {
            model.websites = WebsiteService.findWebsitesByUser(model.userId);
        }
        init();

        function loadPages(websitedId) {
            $location.url($location.url()+"/"+websitedId+"/page");
        }
        function editWebsite(websitedId) {
            $location.url($location.url()+"/"+websitedId+"/");
        }
        function addWebsite() {
            $location.url($location.url()+"/new/");
        }
        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }
})();