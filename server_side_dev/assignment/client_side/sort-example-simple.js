/*
 (function () {
 angular
 .module("HelloWorld", ["jgaTable"])
 .controller("MainController",MainCtrl);

 function MainCtrl($scope) {
 $scope.items = [
 {
 name: "one",
 desc: "description one"
 },
 {
 name: "two",
 desc: "description two"
 },
 {
 name: "three",
 desc: "description three"
 },
 {
 name: "four",
 desc: "description four"
 },
 {
 name: "five",
 desc: "description five"
 }
 ];
 }
 })();*/

(function () {
    angular
        .module("MyAppName", ["wbdvDirectives"])
        .controller("myController",myCtrl);

    function myCtrl($scope) {
        $scope.hello="Hello World!";
        $scope.second_hello = "Hello World Second Timee!";


        var test_items = [
            {
                name: "one",
                desc: "description one"
            },
            {
                name: "two",
                desc: "description two"
            },
            {
                name: "three",
                desc: "description three"
            },
            {
                name: "four",
                desc: "description four"
            },
            {
                name: "five",
                desc: "description five"
            }
        ];
        $scope.items = test_items;

        $scope.sortItems = function (start, end) {

            //console.log("start: " + start + " end: " + end);
            var item = test_items[start];

            var del_index = start < end ? start:start+1;
            $scope.items.splice(end, 0, item);
            $scope.items.splice(del_index, 1);


            for(var i in $scope.items)
            {
                console.log($scope.items[i].name);
            }
        }
    }
})();
