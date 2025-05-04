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

    motifs.forEach((motif) => {
        $('#motif-image')    
            .attr('src', `/${info.image_path}`)
            .attr('alt', 'Motif Image')
            .addClass('img-fluid rounded');  
        
        let $card = $('<div class="motif-card"></div>');
        let $header = $('<div class="d-flex align-items-center justify-content-between"></div>');
        let $title = $(`<p>${motif.title}</p>`).addClass("subtitle bold");
        let $content = $(`<p>${motif.content}</p>`).addClass("main-text")
        let $image = $(`<img>`).attr('src', `/${motif.motif_image_path}`).addClass("motif-content-image")
        let $hint = $('<p style="font-size: 0.9rem; color: #888;">Click to expand</p>');

        $header.append($title).append($hint);
        $card.append($image).append($header).append($content);
        $card.on('click', function () {
            $(this).toggleClass('expanded');
            $($hint).empty()
        });
        $('#motif-content').append($card);
    
        let overlays = motif.overlay || [];
        overlays.forEach((overlay) => {
            let $rect = $(`<div></div>`)
                .addClass("hotspot")
                .css({
                    left: overlay.position_left + "rem",
                    top: overlay.position_top + "rem",
                    width: overlay.size_w + "rem",
                    height: overlay.size_h + "rem"
                })
                .attr("data-answer", motif.title)
            $(".motif-image-container").append($rect)
            
            $rect.on('click', function () {
                let answer = $(this).data('answer');
                $('#overlayAnswerText').text(answer);
                $('#motifOverlay')
                    .css({
                        left: overlay.position_left + overlay.size_w/3 + "rem",
                        top: overlay.position_top  + overlay.size_h/3 + "rem",
                        width: "10rem",
                        height: "3rem",
                        display: 'flex'
                    })
                    .fadeIn();
            });
            
            $('#closeOverlay').on('click', function (e) {
                e.stopPropagation(); 
                $('#motifOverlay').fadeOut();
            });
        });
    });

    $('#motifOverlay').on('click', function () {
        $(this).fadeOut();
    });
}


$(document).ready(function () {
    attachLinks(linkList, currentPage)
    enableTimelineHover();
    updateButtons();
    updateView();
});  