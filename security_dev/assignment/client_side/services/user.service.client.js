(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http, $rootScope) {
        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "setCurrentUser":setCurrentUser,
            "login":login
        };
        return services;


        function login(user){
            return $http.post("/api/login", user);
        }
        
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?"+"username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?"+"username="+username+"&"+"password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+ userId;
            return $http.delete(url);
        }
    }
})();