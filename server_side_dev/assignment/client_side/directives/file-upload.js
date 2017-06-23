(function () {
    angular
        .module("WebAppMaker")
        .directive("imgUpload", ['$parse', imgConstruct]);

    function imgConstruct($parse) {
        var directive = {};
        directive.restrict = 'ACE';
        directive.link = function(scope, element, attrs) {
            var model = $parse(attrs.imgUpload);
            var modelSetter = model.assign;

            console.log(modelSetter);

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        };
        return directive;
    }
})();