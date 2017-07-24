(function () {

    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }
            user = UserService.findUserByUsernameAndPassword(user.username, user.password);
            if(user === null) {
                model.errorMessage = "User not found";
            } else {
                $location.url("profile/"+user._id);
            }
        }
    }
})();