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

function updateGraphic(startTime, endTime) {
    const minTime = -1600;  // The minimum time value (left side of the scale)
    const maxTime = 220;    // The maximum time value (right side of the scale)

    // Scale the time to fit within the SVG width
    const svgWidth = 1000;  // Width of the SVG container
    const scale = svgWidth / (maxTime - minTime);  // Scale factor to convert time units to pixels

    // Calculate the starting X position of the rectangle based on startTime
    let xStart = (startTime - minTime) * scale;
    // Calculate the ending X position of the rectangle based on endTime
    let xEnd = (endTime - minTime) * scale;

    // Calculate the width of the rectangle
    let width = xEnd - xStart;

    // Remove any previous rectangles
    $('#answer-rect').remove();

    // Create the new rectangle
    let $rect = $(document.createElementNS("http://www.w3.org/2000/svg", "rect"))
        .attr({
            id: "answer-rect",
            x: xStart,
            y: 0,  // Vertical position (set to 0 since it's 20px high)
            width: width,
            height: 25,
            rx: 10, // Rounded corners (radius)
            fill: "rgba(255, 165, 0)", // Color with transparency
        });

    // Append the rectangle to the SVG
    $('#answer-box').append($rect);
}

function calculateScore(selectedYear, correctYear) {
    let diff = Math.abs(selectedYear - correctYear);
    if (diff <= 200) return 100;
    else if (diff <= 400) return 80;
    else if (diff <= 600) return 60;
    else return 40;
}

function updateFeedback(startTime, endTime){
    let selectedYear = parseInt($('#timelineSlider').val());
    correctYear = (startTime + endTime) / 2
    let score = calculateScore(selectedYear, correctYear);
    postScore(currentPage, score, correctYear);

    $('#sliderResult').html(selectedYear);
    $('#scoreResult').html(score);
    $('#correctTime').html(`${startTime} – ${endTime}`);

    if (currentPage < 5) {
        const nextUrl = `/quiz/${currentPage + 1}?ids=${encodedIds}`;
        $('#nextPageButton').html(`<a href="${nextUrl}" class="btn btn-success mt-3">Next Question</a>`);
    } else {
        let nextUrl = "/quiz/finish"
        $('#nextPageButton').html(`<a href="${nextUrl}" class="btn btn-success mt-3">See your Scores</a>`)
        $('#nextPageButton').append(`<p class="mt-3">You’ve reached the last question.</p>`);
    }
}

function postScore(currentPage, score, correctYear) {    
    data_to_submit = JSON.stringify({
        "score": score,
        "ids": ids,
        "correct_year": correctYear
    })
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: '/quiz/score/' + currentPage,
        credentials: 'include',
        data: data_to_submit,
        success: function(response) {
            console.log("Score posted successfully.")
            console.log(response)
        },
        error: function(error) {
            console.error('Error:', error);
        }
    })
}


function updateAnswer(){
    $(".main-feedback").show()
    let startTime = info.start_time;
    let endTime = info.end_time;

    $('#timelineSlider').hide(); 
    updateGraphic(startTime, endTime);
    updateFeedback(startTime, endTime);

    let url = info.url;
    $('#detailURL').html(`<a href="${url}" target="_blank">Learn More</a>`);
}

$(document).ready(function () {
    disableTimelineHover();

    updateExihibit();
    updateMarkerPosition(-1600);
  
    $('#timelineSlider').on('input', function () {
      updateMarkerPosition(parseInt(this.value));
    });
  
    $('#confirmYear').click(function () {
        $("#confirmYear").hide()
        updateAnswer();
    });
});  