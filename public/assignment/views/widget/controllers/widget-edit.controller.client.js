(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($sce, $location, $routeParams, WidgetService) {
        var model = this;
        model.saveWidget = saveWidget;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;
        model.loadWidgets = loadWidgets;
        model.deleteWidget = deleteWidget;
        model.loadUserProfile = loadUserProfile;

        function init() {
            model.wgid = $routeParams.wgid;
            model.userId = $routeParams.uid;
            model.websiteId = $routeParams.wid;
            model.pageId = $routeParams.pid;
            WidgetService.findWidgetById(model.wgid)
                .then(function(widget){
                        model.widget =widget;
            });
        }

        init();

        function getWidgetIncludeUrl() {

            if (model.widget) {
                model.widgetType = model.widget.type;
                return "views/widget/templates/widget-" + model.widgetType.toLowerCase() + "-edit.view.client.html";
            }
        }
        function loadWidgets() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }

        function saveWidget(widget) {
            WidgetService.updateWidget(model.wgid, widget)
                .then(function(resp){
                    loadWidgets();
                });
        }

        function deleteWidget() {
            WidgetService.deleteWidget(model.pageId,model.wgid)
            .then(function(resp){
                loadWidgets();
            });
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }
})();