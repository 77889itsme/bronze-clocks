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
        $('#return-btn').hide();
        let quizBtn = `<a href="/quiz" class="btn btn-primary">Take the Quiz</a>`;
        let learnPageBtn = `<a href="/learn" class="btn btn-light">Choose Another Section</a>`;

        $.ajax({
            url: "/learn/check-status",
            method: "GET",
            success: function(response) {
                if (response.all_done) {
                    $('#final-page').html(`
                        <div class="mx-5">${quizBtn}</div>
                        <div class="mx-5">${learnPageBtn}</div>
                    `);
                } else {
                    $('#final-page').html(`
                        <div class="main-text">Please finish all three learning sections first: Color, Motif, and Shape.</div>
                        <div class="mx-5">${learnPageBtn}</div>
                    `);
                }
            },
            error: function(error) {
                console.error("Error checking learning status:", error);
            }
        });
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

    motifs.forEach((motif, idx) => {
        $('#motif-image')    
            .attr('src', `/${info.image_path}`)
            .attr('alt', 'Motif Image')
            .addClass('img-fluid rounded');  
        
        let $card = $('<div class="motif-card"></div>').attr('data-motif-index', idx);
        let $image = $(`<img>`).attr('src', `/${motif.motif_image_path}`).addClass("motif-content-image")
        let $header = $('<div class="d-flex align-items-center justify-content-between"></div>');
        let $title = $(`<p>${motif.title}</p>`).addClass("subtitle bold");
        let $hint = $('<p style="font-size: 0.9rem; color: #888;">Click to expand</p>');
        let $progress = $('<div class="motif-progress"></div>');
        let $content = $(`<p>${motif.content}</p>`).addClass("main-text")

        $header.append($title).append($hint);
        $card.append($image).append($header).append($progress).append($content);
        $card.on('click', function () {
            $(this).toggleClass('expanded');
            $($hint).empty()
        });
        $('#motif-content').append($card);
    
        let overlays = motif.overlay || [];

        overlays.forEach((overlay, overlayIdx) => {
            let $dot = $('<span class="progress-dot"></span>')
                .attr('data-dot-index', overlayIdx)
                .attr('data-motif-index', idx);
            $progress.append($dot);

            let $rect = $(`<div></div>`)
                .addClass("hotspot")
                .css({
                    left: overlay.position_left + "rem",
                    top: overlay.position_top + "rem",
                    width: overlay.size_w + "rem",
                    height: overlay.size_h + "rem"
                })
                .attr("data-answer", motif.title)
                .attr("data-motif-index", idx)
                .attr("data-overlay-index", overlayIdx);
            $(".motif-image-container").append($rect)
            
            $rect.on('click', function () {
                let answer = $(this).data('answer');
                $('#overlayAnswerText').text(answer);
                let rectOffset = $(this).position();
                let rectWidth = $(this).outerWidth();
                let rectHeight = $(this).outerHeight();
                $('#motifOverlay')
                    .css({
                        left: rectOffset.left + rectWidth / 2 - 50 + "px", 
                        top: rectOffset.top + rectHeight / 2 - 20 + "px", 
                        width: "100px",
                        height: "60px",
                        display: 'flex'
                    })
                    .fadeIn();
            
            let motifIndex = motifs.findIndex(m => m.title === answer);
            foundMotifs.add(motifIndex);
            $(`.progress-dot[data-motif-index='${motifIndex}']`).eq(overlayIdx).addClass('progress-dot-filled');
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