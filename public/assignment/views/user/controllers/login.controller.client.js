(function () {

    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService,$rootScope) {
        var model = this;
        model.login = login;
        model.register = register;
        function init() {

        }

        init();

        function login(user) {
            if (!user) {
                model.errorMessage = "Username and Password Empty";
                return;
            }
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user === null) {
                model.errorMessage = "Username/Password Incorrect";
            } else {
                $rootScope.currentUser=user;
                $location.url("profile/" + user._id);
            }
        }

        function register() {
            $location.url("register/");
        }

    }
})();