(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "Username does not exist.";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController() {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match.";
                return;
            }
            var user = UserService.findUserByUsername(username);
            if (user === null) {
                user = {
                    username: username,
                    password: password,
                    firstName: "",
                    lastName: "",
                    email: ""
                };
                UserService.createUser(user);
                user = UserService.findUserByUsername(username);
                $location.url("/user/" + user._id);
            }
            else {
                vm.error = "Username already exists.";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            }
        }
    }

    function ProfileController($routeParams, $location, $timeout, UserService) {
        var vm = this;
        vm.user = UserService.findUserById($routeParams.uid);
        vm.username = vm.user.username;
        vm.firstName = vm.user.firstName;
        vm.lastName = vm.user.lastName;
        vm.email = vm.user.email;
        vm.updateUser = updateUser;

        function updateUser() {
            var update_user = {
                _id: $routeParams.uid,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email
            };
            UserService.updateUser($routeParams.uid, update_user);
            vm.updated = "Profile changes saved!";

            $timeout(function () {
                vm.updated = null;
            }, 3000);
        }
    }
})();