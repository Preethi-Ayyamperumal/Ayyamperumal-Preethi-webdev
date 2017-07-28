(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var url="/api/user/"+userId+"/website";
            website.developerId = userId;
            return $http.post(url,website)
                .then(function (response) {
                    return response.data;
                });


        }

        function findWebsitesByUser(userId) {
            var url="/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function findWebsiteById(userId,websiteId) {
            var url="/api/user/"+userId+"/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(userId,websiteId, website) {
            var url="/api/user/"+userId+"/website/"+websiteId;
            return $http.put(url,website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var index = -1;
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    index = w;
                    break;
                }
            }
            if (index > -1) {
                websites.splice(index, 1);
            }
        }


    }
})();