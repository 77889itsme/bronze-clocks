let linkList = [
    { selector: "#shang-group", url: "/learn/motif/1" },
    { selector: "#zhou-west-group", url: "/learn/motif/2" },
    { selector: "#zhou-east-group", url: "/learn/motif/3" },
    { selector: "#qinhan-group", url: "/learn/motif/4" }
];

function updateView(info) {
    let period = info.period;
    let motifs = info.motifs || [];
    let motifCount = motifs.length;

    if (motifCount === 1) {
        $('#motif-number').text(`is ${motifCount} classic motif style`);
    } else {
        $('#motif-number').text(`are ${motifCount} classic motif styles`);
    }

    $('#motif-period').text(period);

    $('#motif-content').empty()

    $.each(motifs, function(index, motif) {
        let $section = $(`
            <div class="mb-4">
                <h4>${index + 1}. ${motif.title}</h4>
                <p>${motif.content}</p>
            </div>
        `);
        $('#motif-content').append($section);
    });


    if (info.image_path) {
        let $img = $('<img>')
        .attr('src', `/${info.image_path}`)
        .attr('alt', 'Motif Image')
        .addClass('img-fluid rounded motif-image');  
        $('#motif-image').append($img);
    }
}


$(document).ready(function () {
    attachLinks(linkList, currentPage)
    enableTimelineHover();
    updateView(info);
});  