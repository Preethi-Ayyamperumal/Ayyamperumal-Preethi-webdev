(function () {

    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
        $routeProvider
            .when("/login", {
                templateUrl: "./views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "./views/home/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "./views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:uid", {
                templateUrl: "./views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
        // website routes
            .when("/profile/:uid/website", {
                templateUrl: "./views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/profile/:uid/website/new", {
                templateUrl: "./views/website/templates/website-new.view.client.html",
                 controller: "NewWebsiteController",
                 controllerAs: "model"
            })
            .when("/profile/:uid/website/:wid", {
                templateUrl: "./views/website/templates/website-edit.view.client.html",
                controller: "EditWebsiteController",
                 controllerAs: "model"
            })
            .when("/profile/:uid/website/:wid/page", {
                templateUrl: "./views/page/templates/page-list.view.client.html",
                 controller: "PageListController",
                 controllerAs: "model"
            })
            .when("/profile/:uid/website/:wid/page/new", {
                templateUrl: "./views/page/templates/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/profile/:uid/website/:wid/page/:pid", {
                templateUrl: "./views/page/templates/page-edit.view.client.html",
                 controller: "EditPageController",
                 controllerAs: "model"
            })
            .when("/profile/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "./views/widget/templates/widget-list.view.client.html",
                 controller: "WidgetListController",
                 controllerAs: "model"
            })
            .when("/profile/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "./views/widget/templates/widget-choose.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when("/profile/:uid/website/:wid/page/:pid/widget/:wgid", {
                 templateUrl: "./views/widget/templates/widget-edit.view.client.html",
                 controller: "EditWidgetController",
                 controllerAs: "model"
            })
    }
})();