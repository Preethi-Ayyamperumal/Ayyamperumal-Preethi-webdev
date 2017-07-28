(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($location, $routeParams, PageService) {
        var model = this;
        model.loadWidgets = loadWidgets;
        model.editPage = editPage;
        model.loadUserProfile = loadUserProfile;
        model.newPage = newPage;
        model.showWebsites = showWebsites;

        function init() {
            model.userId = $routeParams.uid;
            model.websiteId = $routeParams.wid;
            PageService.findPagesByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages =pages;
                });
        }

        init();

        function loadWidgets(pageId) {
            $location.url($location.url() + "/" + pageId + "/widget");
        }

        function editPage(pageId) {
            $location.url($location.url() + "/" + pageId + "/");
        }

        function loadUserProfile() {
            $location.url("/profile/" +model.userId );
        }

        function showWebsites() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }

        function newPage() {
            var pathelements = $location.url().split("/");
            pathelements = pathelements.join("/")
            $location.url(pathelements + "/new/");
        }
    }
})();