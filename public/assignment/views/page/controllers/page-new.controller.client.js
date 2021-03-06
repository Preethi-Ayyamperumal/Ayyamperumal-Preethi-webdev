(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var model = this;
        model.addPage = addPage;
        model.showPages = showPages;
        model.loadUserProfile = loadUserProfile;
        model.newPage = newPage;
        model.showWebsites = showWebsites;
        model.loadWidgets = loadWidgets;
        model.editPage = editPage;
        function init() {
            model.userId=$routeParams.uid;
            model.wid = $routeParams.wid;
            PageService.findPagesByWebsiteId(model.wid)
                .then(function (pages) {
                    model.pages =pages;
                });
        }

        init();


        function addPage(page) {
            PageService.createPage(model.wid, page)
                .then(function (response) {
                    var pathelements = $location.url().split("/");
                    pathelements.splice(-1, 1);
                    pathelements = pathelements.join("/");
                    $location.url(pathelements);
                });
        }

        function showWebsites() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements.splice(-1, 1);
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/");
            $location.url(pathelements);
        }


        function showPages() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/");
            $location.url(pathelements);
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }

        function loadWidgets(pageId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/");
            $location.url(pathelements + "/" + pageId + "/widget");
        }

        function editPage(pageId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/");
            $location.url(pathelements + "/" + pageId + "/");
        }

        function newPage() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/");
            $location.url(pathelements + "/new/");
        }
    }
})();