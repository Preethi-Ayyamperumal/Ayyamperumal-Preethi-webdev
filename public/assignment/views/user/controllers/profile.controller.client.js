(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($location, $routeParams, UserService) {
        var model = this;
        model.updateUser = updateUser;
        model.logoutUser = logoutUser;
        model.loadUserWebsites = loadUserWebsites;
        model.loadUserProfile = loadUserProfile;
        function init() {
            model.userId = $routeParams.uid;
            model.user = UserService.findUserById(model.userId);
        }

        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function loadUserWebsites() {
            $location.url($location.url() + "/website/");
        }

        function logoutUser() {
            $location.url("/login");
        }

        function updateUser(user) {
            UserService.updateUser(model.userId, user);
            loadUserProfile();
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }

})();