(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            model.user = UserService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function unregister() {
            UserService.deleteUser(userId);
        }
    }

})();