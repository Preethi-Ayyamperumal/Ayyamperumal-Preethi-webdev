(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService );

    function PageService ($http) {

        var api={
            "createPage" : createPage,
            "findPagesByWebsiteId" :findPagesByWebsiteId ,
            "findPageById" :findPageById ,
            "updatePage" :updatePage ,
            "deletePage" : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId=websiteId;
            var url="/api/website/"+websiteId+"/page";
            return $http.post(url,page)
                .then(function (response) {
                    return response.data;
                });

        }
        function findPagesByWebsiteId(websiteId)  {
            var url="/api/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }
        function findPageById(pageId)   {
            var url="/api/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function updatePage(pageId, page)    {
            var url="/api/page/"+pageId;
            return $http.put(url,page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(userId,websiteId,pageId)  {
            var index=-1;
            for(var p in pages){
                if(pages[p]._id === pageId) {
                    index = p;
                    break;
                }
            }
            if (index > -1) {
                pages.splice(index, 1);
            }
        }


    }
})();