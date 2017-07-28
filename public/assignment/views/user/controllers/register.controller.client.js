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
            if(!newuser || (!newuser.username) || (!newuser.password) || (!newuser.password2) )
            {
                model.errorMessage = "Enter Username and Passwords";
                return;
            }
            if(newuser.password !=  newuser.password2 )
            {
                model.errorMessage = "Passwords doesn't match";
                return;
            }

            UserService.findUserByUsername(newuser.username)
              .then(function (_user) {
                       if(_user.hasOwnProperty('error')) {

                           return UserService.createUser(newuser)
                       } else {
                           model.errorMessage = "User already exists";
                           return;
                       }})
              .then(function (_user){
                  if(_user)
                  {
                      $location.url("/profile/"+_user._id);}
        });
        }
    }
})();