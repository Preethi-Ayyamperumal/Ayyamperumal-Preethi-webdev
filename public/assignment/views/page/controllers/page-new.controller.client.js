(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController( $location,$routeParams, PageService,$rootScope) {
        var model = this;

        model.wid = $routeParams.wid;
        model.addPage=addPage;
        model.showPages=showPages;
        model.loadUserProfile = loadUserProfile;
        model.newPage = newPage;
        model.showWebsites = showWebsites;
        model.loadWidgets=loadWidgets;
        model.editPage=editPage;
        function init() {
            model.pages = PageService.findPageByWebsiteId(model.wid);
        }
        init();


        function addPage(page) {
            var _page = PageService.createPage(model.wid,page);
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }

        function showWebsites(){
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements.splice(-1,1);
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }


        function showPages()
        {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }

        function loadUserProfile() {
            $location.url("/profile/" + $rootScope.currentUser);
        }

        function loadWidgets(pageId) {
            $location.url($location.url()+"/"+pageId+"/widget");
        }
        function editPage(pageId) {
            $location.url($location.url()+"/"+pageId+"/");
        }

        function newPage() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements+"/new/");
        }
    }
})();