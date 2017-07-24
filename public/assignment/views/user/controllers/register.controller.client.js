(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var model = this;

        model.registerUser = registerUser;

        function init() {

        }
        init();

        function registerUser(user) {
            var _user = UserService.findUserByUsername(user.username);
            if(!_user) {
                var user = UserService.registerUser(user);
                $location.url("/profile/"+user._id);
            } else {
                model.error = "User already exists";
            }
        }
    }
})();