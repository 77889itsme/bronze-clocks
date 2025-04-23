function attachLinks() {
    let linkList = [
        { selector: "#shang-group", url: "/learn/motif/1" },
        { selector: "#zhou-west-group", url: "/learn/motif/2" },
        { selector: "#zhou-east-group", url: "/learn/motif/3" },
        { selector: "#qinhan-group", url: "/learn/motif/4" }
    ];

    linkList.forEach(item => {
        $(item.selector).css("cursor", "pointer");
        $(item.selector).click(() => {
            window.location.href = item.url;
        });
    });
}

$(document).ready(function () {
    attachLinks()
});  