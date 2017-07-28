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
            UserService.findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                    if(user.dob){
                        model.user.dob = new Date(user.dob);
                    }
                });
        }

        init();


        function loadUserWebsites() {
            $location.url($location.url() + "/website/");
        }

        function logoutUser() {
            $location.url("/login");
        }

        function updateUser(user) {
            UserService.updateUser(model.userId, user)
                .then(function (response) {
                    loadUserProfile();
                })
        }

        function loadUserProfile() {
            $location.url("/profile/" + model.userId);
        }
    }

})();