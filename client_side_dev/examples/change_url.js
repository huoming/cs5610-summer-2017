var toggle = false;
function changeAnchor() {
    alert("change link!");

    var href1 = "http://google.com";
    var href2 = "http://portal-cs5610online.rhcloud.com/";

    var msg1 = "Google";
    var msg2 = "CS5610";

    var toggled_href = "";
    var toggle_href = toggle? href1 : href2;
    var toggle_msg = toggle? msg1 : msg2;

    document.getElementById("myAnchor").innerHTML = toggle_msg;
    document.getElementById("myAnchor").href = toggle_href;
    document.getElementById("myAnchor").target = "_blank";

    toggle = !toggle;
}