function updateNames() {
    let nameCN = info.name_chinese
    $("#name-cn").html(nameCN);

    let namePinYin = info.name_pinyin
    $("#name-pinyin").html(namePinYin);

    let nameEN = info.name_en;
    $("#name-en").html(nameEN);
}

function updateDetail(){
    let findspot = info.findspot;
    $("#findspot").html(findspot);
    let museum = info.museum;
    $("#museum").html(museum);
}

function updateImage() {
    let imgPath = info.image_path; 
    $('#quiz-image').attr('src', '/' + imgPath);
}

function updateExihibit(){
    updateImage()
    updateNames();
    updateDetail();
}

function updateMarkerPosition(val) {
    const $slider = $('#timelineSlider');
    const sliderWidth = $slider.width();
    const percent = (val - (-1600)) / (220 - (-1600));
    const left = percent * sliderWidth;
    $('#sliderMarker').css('left', left + 'px');
}

function updateAnswerBox(startTime, endTime) {
    let xStart = 60 + (startTime + 1600) * 0.65934;
    let xEnd = 60 + (endTime + 1600) * 0.65934;
    let width = xEnd - xStart;

    $('#answer-rect').remove();

    let $rect = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"))
        .attr({
            id: "answer-rect",
            x: xStart,
            y: -120,
            width: width,
            height: 20,
            rx: 10,
            fill: "rgba(255, 165, 0, 0.4)",
        });

    $('#answer-box').append($rect);
}

function calculateScore(selectedYear, correctYear = -500) {
    let diff = Math.abs(selectedYear - correctYear);
    if (diff <= 100) return 100;
    else if (diff <= 200) return 80;
    else if (diff <= 300) return 60;
    else return 40;
}

function updateFeedback(startTime, endTime){
    let selectedYear = parseInt($('#timelineSlider').val());
    correctYear = (startTime + endTime) / 2
    let score = calculateScore(selectedYear, correctYear);
    $('#sliderResult').html("Your Guess: " + selectedYear);
    $('#scoreResult').html(`<p>Your score: <strong>${score}</strong></p>`);
    $('#correctTime').html(`<p>Correct Time: ${startTime} – ${endTime}</p>`);

    if (currentPage < 5) {
        const nextUrl = `/quiz/${currentPage + 1}?ids=${encodedIds}`;
        $('#nextPageButton').html(`<a href="${nextUrl}" class="btn btn-success mt-3">Next Question</a>`);
    } else {
        $('#nextPageButton').html(`<p class="mt-3">You’ve reached the last question.</p>`);
    }
}


function updateAnswer(){
    let startTime = info.start_time;
    let endTime = info.end_time;

    $('#slider').hide(); 
    updateAnswerBox(startTime, endTime);
    updateFeedback(startTime, endTime);

    let url = info.url;
    $('#detailURL').html(`<a href="${url}" target="_blank">Learn More</a>`);
}

$(document).ready(function () {
    updateExihibit();
    updateMarkerPosition(-1600);
  
    $('#timelineSlider').on('input', function () {
      updateMarkerPosition(parseInt(this.value));
    });
  
    $('#confirmYear').click(function () {
      updateAnswer();
    });
});  