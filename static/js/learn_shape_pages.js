let linkList = [
    { selector: "#shang-group", url: "/learn/shape/1" },
    { selector: "#zhou-west-group", url: "/learn/shape/2" },
    { selector: "#zhou-east-group", url: "/learn/shape/3" },
    { selector: "#qinhan-group", url: "/learn/shape/4" }
];

function updateButtons(){
    let prevBtn = "";
    if (currentPage > 1) {
        prevBtn = `<a href="/learn/shape/${currentPage - 1}" class="btn btn-light">Previous</a>`;
    }
    
    let nextBtn = "";
    if (currentPage < 4) {
        nextBtn = `<a href="/learn/shape/${currentPage + 1}" class="btn btn-primary">Next</a>`;
    }
    
    $('#navButtonPrevious').html(`
        <div>${prevBtn}</div>
    `);

    $('#navButtonNext').html(`
        <div>${nextBtn}</div>
    `);

    if (currentPage === 4) {
        quizBtn = `<a href="/quiz" class="btn btn-primary">Take the Quiz</a>`;
        learnPageBtn = `<a href="/learn" class="btn btn-light">Choose Another Section</a>`;

        $('#final-page').html(`
            <div>${quizBtn}</div>
            <div>${learnPageBtn}</div>
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
    $('#shape-content').html(content);

    let imgPath = info.image_path; 
    $('#shape-image').attr('src', '/' + imgPath);
}

$(document).ready(function () {
    attachLinks(linkList, currentPage)
    enableTimelineHover();
    updateView()
});  