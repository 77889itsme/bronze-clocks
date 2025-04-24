let linkList = [
    { selector: "#shang-group", url: "/learn/motif/1" },
    { selector: "#zhou-west-group", url: "/learn/motif/2" },
    { selector: "#zhou-east-group", url: "/learn/motif/3" },
    { selector: "#qinhan-group", url: "/learn/motif/4" }
];

function updateButtons(){
    let prevBtn = "";
    if (currentPage > 1) {
        prevBtn = `<a href="/learn/motif/${currentPage - 1}" class="btn btn-light">Previous</a>`;
    }
    
    let nextBtn = "";
    if (currentPage < 4) {
        nextBtn = `<a href="/learn/motif/${currentPage + 1}" class="btn btn-primary">Next</a>`;
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


function updateHotSpot() {  
    $('.hotspot').on('click', function () {
        const answer = $(this).data('answer');
        $('#overlayText').text(answer);
        $('#motifOverlay').fadeIn();
    });
    
    $('#motifOverlay').on('click', function () {
        $(this).fadeOut();
    });
}

function updateView() {
    let period = info.period;
    let motifs = info.motifs || [];
    let motifCount = motifs.length;

    if (motifCount === 1) {
        $('#motif-number').text(`is ${motifCount} classic motif style`);
    } else {
        $('#motif-number').text(`are ${motifCount} classic motif styles`);
    }

    $('#motif-period').text(period);

    $.each(motifs, function(index, motif) {
        let $section = $(`
            <div class="mb-4">
                <h4>${motif.title}</h4>
                <p>${motif.content}</p>
            </div>
        `);
        $('#motif-content').append($section);
    });

    $('#motif-image')    
    .attr('src', `/${info.image_path}`)
    .attr('alt', 'Motif Image')
    .addClass('img-fluid rounded');  
}


$(document).ready(function () {
    attachLinks(linkList, currentPage)
    enableTimelineHover();
    updateButtons();
    updateView();
    updateHotSpot();
});  