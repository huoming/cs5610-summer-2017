function printHtml() {

    /*hello world*/
    //alert("Hello World");
    var msg = document.getElementById("message");
    msg.innerHTML = "Hello world - Javascript Introduction";
}

function add()
{
    alert("onclick happened!");
    var a=document.getElementById("a").value;
    var b=document.getElementById("b").value;
    var c = parseInt(a) + parseInt(b);
    document.getElementById("total").value = c;
    //return c;
}