(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", makeSortable);

    function makeSortable() {
        function linker(scope, element, attrb) {
            var start = -1;
            var end = -1;
            $(element)
                .sortable({
                    start: function(event, ui) {
                        start = $(ui.item).index();
                    },
                    stop: function (event, ui) {
                        end = $(ui.item).index();
                        console.log(start, end);
                        // if(start >= end) {
                        //     start--;
                        // }
                        if(end >= start){
                            end = end + 1;
                        }
                        console.log(start, end);
                        scope.callback({
                            start : start,
                            end : end
                        });
                    }
                });
        }

        var directive = {
            restrict: 'ACE',
            scope : {
                callback : '&'
            },
            link : linker,
        };
        return directive;
    }
})();