(function(){
    $(init);

    function init()
    {
        console.log("Hello jQuery");
        changeContent();
        appendContent();

        $("#clickBtn").click(function(){alert("hello!")})

        // double click event handler
        $("#doubleClkBtn").dblclick(function()
        {
            var message = $("#doubleMessage").val();
            alert(message);
        });

        // mouse hover event handler
        $("#hoverEvent").hover(function()
        {
            var message = $("#hoverMessage").val();
            alert(message);
        });
    }

    function changeContent()
    {
        $("#plain_text")
            .html("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");

        $("#html")
            .html("<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
    }

    function appendContent() {
        $("#appendMe")
            .append("***Hello World!")
            .append("Is there anyone out there?");


        // Example: appending a new element
        // grab list
        var ulElement = $("#courseList");
        // create DOM element in local variable
        var li = $("<li>AngularJS</li>");
        // append new DOM element to list
        ulElement.append(li);

        // Example: appending to local exports
        // create DOM element in local variable
        li = $("<li>");
        // append to local variable
        li.append("MongoDB");
        // append to list
        ulElement.append(li);


        // Example: appending to beginning
        var studentNames = ["Alice", "Bob", "Charlie", "Dan"];
        var studentList = $("#studentList");
        for(var s = 0; s < studentNames.length; s++)
        {
            var studentLi = $("<li>");
            var studentName = studentNames[s];
            studentLi.append(studentName);
            studentList.prepend(studentLi);
        }
    }
})();