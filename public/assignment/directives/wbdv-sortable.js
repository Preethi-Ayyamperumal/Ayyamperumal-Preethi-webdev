(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("wbdvSortable",wbdvSortableDirective);

    function wbdvSortableDirective($http,$routeParams) {
        function linkFunction(scope, element) {
            console.log(element);
            //var ul = $(".draggableWidget");
            var startIndex = -1;
            var endIndex = -1;
            $(element).sortable({
                start: function (event, ui) {
                    startIndex = $(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex = $(ui.item).index();
                    console.log([startIndex, endIndex]);
                    $http.put("/api/page/"+ $routeParams.pid +"/widget?initial="+startIndex+"&final="+endIndex);
                }
            });
        }
        return {
            link: linkFunction
        }
    }

})();