(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController( $location,$routeParams, PageService,$rootScope) {
        var model = this;

        model.wid = $routeParams.wid;
        model.pid=$routeParams.pid;
        model.showPages=showPages;
        model.deletePage=deletePage;
        model.updatePage=updatePage;
        model.loadUserProfile = loadUserProfile;
        model.loadWidgets=loadWidgets;
        model.editPage=editPage;
        model.newPage=newPage;
        model.showWebsites = showWebsites;


        function init() {
            model.pages = PageService.findPageByWebsiteId(model.wid);
            model.page= PageService.findPageById(model.pid);
        }
        init();
        function showPages()
        {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }
        function updatePage(page) {
            PageService.updatePage(model.pid,page);
            showPages();
        }


        function deletePage() {
            PageService.deletePage(model.pid);
            window.history.back();
        }

        function loadUserProfile() {
            $location.url("/profile/" + $rootScope.currentUser);
        }

        function loadWidgets(pageId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/"+pageId+"/widget");
        }

        function editPage(pageId) {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/"+pageId+"/");
        }
        function showWebsites(){
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements.splice(-1,1);
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }


        function newPage() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/new/");
        }
    }
})();