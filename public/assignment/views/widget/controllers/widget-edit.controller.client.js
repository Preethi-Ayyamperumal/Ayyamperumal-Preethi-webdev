(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($sce ,$location,$routeParams, WidgetService) {
        var model = this;
        model.wgid=$routeParams.wgid;
        model.saveWidget=saveWidget;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        model.loadWidgets=loadWidgets;
        model.deleteWidget=deleteWidget;
        model.loadUserProfile = loadUserProfile;

        function init() {
            model.widget = WidgetService.findWidgetById(model.wgid);
        }
        init();

        function getWidgetIncludeUrl() {
            model.widgetType=model.widget.widgetType;
            return "views/widget/templates/widget-" + model.widgetType + "-edit.view.client.html";
        }
        function loadWidgets() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/")
            $location.url(pathelements);
        }

        function saveWidget(widget)
        {
            WidgetService.updateWidget(model.wgid,widget);
            loadWidgets();
        }

        function deleteWidget()
        {
            WidgetService.deleteWidget(model.wgid);
            loadWidgets();
        }
        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }
})();