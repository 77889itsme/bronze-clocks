let linkList = [
    { selector: "#shang-group", url: "/learn/shape/1" },
    { selector: "#zhou-west-group", url: "/learn/shape/2" },
    { selector: "#zhou-east-group", url: "/learn/shape/3" },
    { selector: "#qinhan-group", url: "/learn/shape/4" }
];

$(document).ready(function () {
    attachLinks(linkList)
    enableTimelineHover();
});  