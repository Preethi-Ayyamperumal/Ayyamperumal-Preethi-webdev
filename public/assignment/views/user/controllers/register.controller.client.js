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
            if(!newuser)
            {
                model.errorMessage = "Enter Username and Passwords";
                return;
            }
            var _user = UserService.findUserByUsername(newuser.username);
            if (!_user) {
                if (newuser.password === newuser.password2) {
                    var user = UserService.createUser(newuser);
                    $location.url("/profile/" + user._id);
                } else {
                    model.errorMessage = "Passwords doesn't match";
                }
            } else {
                model.errorMessage = "Username already exists";
            }
        }
    }
})();