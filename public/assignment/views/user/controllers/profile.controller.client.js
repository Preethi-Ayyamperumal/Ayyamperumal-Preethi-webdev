(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($location,$routeParams, UserService,$rootScope) {
        var model = this;
        var userId = $routeParams.uid;

        model.updateUser = updateUser;
        model.logoutUser = logoutUser;
        model.loadUserWebsites =loadUserWebsites;
        model.loadUserProfile = loadUserProfile;
        function init() {
            model.user = UserService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
        }

        function loadUserWebsites() {
                $location.url($location.url()+"/website/");
        }
        function logoutUser() {
            $location.url("/login");
        }
        function updateUser(user) {
            UserService.updateUser(userId,user);
            loadUserProfile();
        }
        function loadUserProfile() {
            $location.url("/profile/" + userId);
        }
}

})();