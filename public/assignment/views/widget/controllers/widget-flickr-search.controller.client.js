(function () {
    angular
        .module('WebAppMaker')
        .controller('FlickrImageSearchController', FlickrImageSearchController);

    function FlickrImageSearchController(FlickrService,WidgetService,$routeParams, $location) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhotos = selectPhotos;
        model.loadUserProfile = loadUserProfile;
        model.loadWidget=loadWidget;
        function init() {
            model.wgid = $routeParams.wgid;
            model.userId = $routeParams.uid;

        }
        init();

        function selectPhotos(photo) {
            console.log(photo);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            WidgetService
                .findWidgetById(model.wgid)
                .then(function (widget)
                {
                    widget.url=url;
                    WidgetService
                        .updateWidget(model.wgid, widget)
                        .then(function (status) {
                            console.log(status);
                            var pathelements = $location.url().split("/");
                            pathelements.splice(-1, 1);
                            pathelements.splice(-1, 1);
                            pathelements = pathelements.join("/")
                            $location.url(pathelements);
                        });
                });




        }

        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }

        function loadWidget() {
            var pathelements = $location.url().split("/");
            pathelements.splice(-1, 1);
            pathelements = pathelements.join("/")
            $location.url(pathelements);
        }

    }
})();