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
                        controller: "courseList.controller",
                        controllerAs: "model"
                    })
                /*.when("/course/:index/:title",
                    {
                        templateUrl: "courseEdit.view.html",
                        controller: "courseEdit.controller",
                        controllerAs: "model"
                    })*/
                .when("/course/:id",
                 {
                 templateUrl: "courseEdit.view.html",
                 controller: "courseEdit.controller",
                 controllerAs: "model"
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
                        /*controllerAs:"msg"*/
                    })
        });
})();