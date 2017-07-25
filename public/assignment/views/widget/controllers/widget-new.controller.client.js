(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($sce ,$location,$routeParams, WidgetService) {
        var model = this;
        model.chooseWidget = chooseWidget;
        model.loadUserProfile = loadUserProfile;
        model.pid=$routeParams.pid;
        model.userId=$routeParams.uid;


        function init() {
        }
        init();


        function chooseWidget(type) {
            var widget = {};
            widget.widgetType=type;
            widget = WidgetService.createWidget(model.pid,widget);
            var pathelements = $location.url().split("/");
            pathelements.splice(-1,1);
            pathelements= pathelements.join("/");
            $location.url(pathelements+"/"+widget._id);
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }
})();