(function () {
    angular
        .module("WhiteBoardApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/",
                    {
                        /*templateUrl: "courseList/courseList.view.html",*/
                        templateUrl: "courseList.view.html",
                        controller: "courseList.controller"
                    })
                .when("/course/:id",
                    {
                        templateUrl: "courseEdit.view.html",
                        controller: "courseEdit.controller"
                    })
                .when("/profile",
                    {
                        /*templateUrl: "profile/profile.view.html",*/
                        templateUrl:"profile.view.html",
                        controller: "profile.controller"
                    })
                .when("/message",
                    {
                        /*templateUrl: "profile/profile.view.html",*/
                        templateUrl:"message.view.html",
                        controller: "profile.controller"
                    })
        });
})();