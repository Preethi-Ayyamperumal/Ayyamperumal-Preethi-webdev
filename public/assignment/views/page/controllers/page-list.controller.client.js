(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController( $location,$routeParams, PageService,$rootScope) {
        var model = this;

        model.websiteId = $routeParams.wid;
        model.loadWidgets=loadWidgets;
        model.editPage=editPage;
        model.loadUserProfile = loadUserProfile;
        model.newPage = newPage;
        model.showWebsites = showWebsites;

        function init() {
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function loadWidgets(pageId) {
            $location.url($location.url()+"/"+pageId+"/widget");
        }
        function editPage(pageId) {
            $location.url($location.url()+"/"+pageId+"/");
        }

        function loadUserProfile() {
            $location.url("/profile/" + $rootScope.currentUser);
        }

        function showWebsites()
        {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }

        function newPage() {
            var pathelements = $location.url().split("/");
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/new/");
        }
    }
})();