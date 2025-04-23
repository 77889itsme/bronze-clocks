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

$(document).ready(function () {
    updateExihibit();
    updateMarkerPosition(-1600);
  
    $('#timelineSlider').on('input', function () {
      updateMarkerPosition(parseInt(this.value));
    });
  
    $('#confirmYear').click(function () {
      const selectedYear = parseInt($('#timelineSlider').val());
      $('#sliderResult').text("Selected: " + selectedYear);
      console.log("玩家选择的年份为:", selectedYear);
  
      // 你可以在这里把 selectedYear 存入 localStorage/sessionStorage/发 AJAX 等
      // localStorage.setItem('guessYear', selectedYear);
    });
});  