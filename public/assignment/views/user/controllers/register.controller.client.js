(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var model = this;
        model.register = register;

        function init() {

        }

        init();

        function register(newuser) {
            var _user = UserService.findUserByUsername(newuser.username);
            if (!_user) {
                if (newuser.password === newuser.password2) {
                    var user = UserService.createUser(newuser);
                    $location.url("/profile/" + user._id);
                } else {
                    model.error = "Passwords dosen't match";
                }
            } else {
                model.error = "User already exists";
            }
        }
    }
})();