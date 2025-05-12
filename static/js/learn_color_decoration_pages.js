let linkList = [
    { selector: "#shang-group", url: "/learn/color/decoration/1" },
    { selector: "#zhou-west-group", url: "/learn/color/decoration/2" },
    { selector: "#zhou-east-group", url: "/learn/color/decoration/3" },
    { selector: "#qinhan-group", url: "/learn/color/decoration/4" }
];

function updateButtons(){
    let prevBtn = "";
    if (currentPage > 1) {
        prevBtn = `<a href="/learn/color/decoration/${currentPage - 1}" class="btn btn-light">Previous</a>`;
    }
    
    let nextBtn = "";
    if (currentPage < 4) {
        nextBtn = `<a href="/learn/color/decoration/${currentPage + 1}" class="btn btn-primary">Next</a>`;
    }
    
    $('#navButtonPrevious').html(`
        <div>${prevBtn}</div>
    `);

    $('#navButtonNext').html(`
        <div>${nextBtn}</div>
    `);

    if (currentPage === 4) {
        buryBtn = `<a href="/learn/color/patination" class="btn btn-primary">Bury</a>`;

        $('#final-page').html(`
            <div>${buryBtn}</div>
        `)
    }
}


function updateView(){
    updateButtons();

    let title = info.title;
    $('#shape-title').html(title);

    let subtitle = info.subtitle;
    $('#shape-subtitle').html(subtitle);

    let content = info.content;
    $('#shape-content').html(content).addClass("main-text");

    let imgPath = info.image_path; 
    $('#shape-image').attr('src', '/' + imgPath);
}

$(document).ready(function () {
    attachLinks(linkList, currentPage)
    enableTimelineHover();
    updateView()
});  