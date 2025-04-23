function attachLinks() {
    let linkList = [
        { selector: "#shang-group", url: "/learn/shape/1" },
        { selector: "#zhou-west-group", url: "/learn/shape/2" },
        { selector: "#zhou-east-group", url: "/learn/shape/3" },
        { selector: "#qinhan-group", url: "/learn/shape/4" }
    ];

    linkList.forEach(item => {
        $(item.selector).css("cursor", "pointer");
        $(item.selector).click(() => {
            window.location.href = item.url;
        });
    });
}


function updateView(){
    let title = info.title;
    $('#shape-title').html(title);

    let subtitle = info.subtitle;
    $('#shape-subtitle').html(subtitle);

    let content = info.content;
    $('#shape-content').html(content);

    let imgPath = info.image_path; 
    $('#shape-image').attr('src', '/' + imgPath);
    
}

$(document).ready(function () {
    attachLinks();
    updateView()
});  