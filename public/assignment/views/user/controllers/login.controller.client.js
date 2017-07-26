(function () {

    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var model = this;
        model.login = login;
        model.register = register;
        function init() {

        }

        init();

        function login(user) {
            if (!user) {
                model.errorMessage = "User not found";
                return;
            }
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user === null) {
                model.errorMessage = "User not found";
            } else {
                $rootScope.currentUser = user._id;
                $location.url("profile/" + user._id);
            }
        }

        function register() {
            $location.url("register/");
        }

    }
})();