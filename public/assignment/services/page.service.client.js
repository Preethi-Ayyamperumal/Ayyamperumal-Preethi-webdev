(function () {
    angular
        .module("WebAppMaker")
        .service("PageService ", PageService );

    function PageService () {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];


        var api={
            "createUser" : createUser,
            "findUserById" :findUserById ,
            "findUserByUsername" :findUserByUsername ,
            "findUserByCredentials" :findUserByCredentials ,
            "updateUser" : updateUser,
            "deleteUser" :deleteUser

        };
        return api;

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId=websiteId;
            pages.push(page);
            return page;
        }
        function findPageByWebsiteId(websiteId)  {
            var websitePages=[];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    websitePages.push(pages[p]);
                }
            }
            return websitePages;

        }
        function findPageById(pageId)   {
            for(var p in pages){
                if(pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;
        }
        function updatePage(pageId, page)    {
            for(var p in pages){
                if(pages[p]._id === pageId) {
                    pages[p]=page;
                    break;
                }
            }
        }

        function deletePage(pageId)  {
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