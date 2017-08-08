(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($location, $routeParams, PageService) {
        var model = this;
        model.showPages = showPages;
        model.deletePage = deletePage;
        model.updatePage = updatePage;
        model.loadUserProfile = loadUserProfile;
        model.loadWidgets = loadWidgets;
        model.editPage = editPage;
        model.newPage = newPage;
        model.showWebsites = showWebsites;


        function init() {
            model.userId=$routeParams.uid;
            model.wid = $routeParams.wid;
            model.pid = $routeParams.pid;
            PageService.findPagesByWebsiteId(model.wid)
                .then(function (pages) {
                    model.pages =pages;
                });
            PageService.findPageById(model.pid)
                .then(function (page) {
                    model.page =page;
                });
        }

        init();
        function showPages() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }

        function updatePage(page) {
            PageService.updatePage(model.pid, page)
                .then(function (response) {
                    showPages();
                });
        }


        function deletePage() {
            PageService.deletePage(model.wid,model.pid)
                .then(function (response) {
                    window.history.back();
                });
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }

        function loadWidgets(pageId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements + "/" + pageId + "/widget");
        }

        function editPage(pageId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements + "/" + pageId + "/");
        }

        function showWebsites() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements.splice(-1, 1);
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }


        function newPage() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements + "/new/");
        }
    }
})();