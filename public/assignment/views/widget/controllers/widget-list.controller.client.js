(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce ,$location,$routeParams, WidgetService) {
        var model = this;
        model.pid=$routeParams.pid;
        model.userId=$routeParams.uid;
        model.showPages=showPages;
        model.trustHtmlContent = trustHtmlContent;
        model.trustUrlResource = trustUrlResource;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        model.editWidget=editWidget;
        model.chooseWidget=chooseWidget;
        model.loadUserProfile = loadUserProfile;

        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
        }
        init();

        function trustUrlResource(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function trustHtmlContent(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }

        function getWidgetIncludeUrl(widgetType) {
            return "views/widget/templates/widgets/widget-" + widgetType+ ".view.client.html";
        }

        function editWidget(widgetID){
            $location.url($location.url()+"/"+widgetID);
        }

        function chooseWidget()
        {
            $location.url( $location.url()+"/new/");
        }

        function showPages()
        {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }

    }
})();