const minYear = -1600;
const maxYear = 220;

function yearToPosition(year, containerWidth) {
  const range = maxYear - minYear;
  return ((year - minYear) / range) * containerWidth;
}

$(document).ready(function () {
  $('#total-score').html(totalScore);
  let containerWidth = 1250;
  $.each(roundsData, function (index, item) {
    let year = item.correct_year;
    let leftPos = yearToPosition(year, containerWidth);
    let topOffset = 270 + (index % 2) * 350;
    let dotTop = 535;

    const $line = $(`
      <div class="timeline-line" 
           style="left: ${leftPos + 90}px; top: ${Math.min(topOffset + 190, dotTop)}px; 
                  height: 80px;">
      </div>
    `);
    const $dot = $(`
      <div class="timeline-dot" style="left: ${leftPos + 88}px; top: ${dotTop}px;"></div>
    `);

    const $img = $(`
      <img src="/${item.image_path}" 
        alt="${item.name}" 
        class="timeline-images" 
        style="left: ${leftPos}px; top: ${topOffset}px;"
        data-index="${index}">
    `);

    $("#images-container").append($img).append($line).append($dot);
  });

  // 绑定点击事件，展示 popup
  $("#images-container").on('click', '.timeline-images', function () {
    const index = $(this).data('index');
    const item = roundsData[index];

    const contentHtml = `
      <h2>${item.name}</h2>
      <img src="/${item.image_path}" alt="${item.name}" style="width: 100%; max-height: 150px; object-fit: cover; margin-bottom: 10px;">
      <p><strong>Year:</strong> ${item.start_time} – ${item.end_time}</p>
      <p><strong>Score:</strong> ${item.score}</p>
    `;
    $('#popup-content').html(contentHtml);
    $('#popup').fadeIn(200);
  });

  // 关闭按钮
  $('#popup-close').click(function () {
    $('#popup').fadeOut(200);
  });
});
