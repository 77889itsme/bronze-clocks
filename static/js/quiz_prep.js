function updateView() {
    updatePagination();
    // set section title
    $('#quiz-title').text(`${info.section_name} Quiz`);

    // Get the current question based on the page number
    let randomIndex = Math.floor(Math.random() * info.length); // Random index to select a question
    let currentQuestion = info[randomIndex];  // Get the question by random index

    // Update the question text
    $('#question-text').text(currentQuestion.question);

    // Generate new options (buttons for each option)
    $('#option-a').text(currentQuestion.options[0].A).data('answer', 'A');
    $('#option-b').text(currentQuestion.options[0].B).data('answer', 'B');
    $('#option-c').text(currentQuestion.options[0].C).data('answer', 'C');

    let correctAnswer = currentQuestion.answer;

    // Handle button click to check answer and give feedback
    $('.options-card').on('click', function() {
        let selectedAnswer = $(this).data('answer');
        if (selectedAnswer === correctAnswer) {
            $('#feedback').text('Correct!').css('color', 'green');
            $('#next-page').show();
            if (currentPage === 3) {
                $('#feedback').append('<p> You have finished prep quizzes. <br> Start guessing like an expert.</p>')
            }
        } else {
            $('#feedback').text('Hmmmmm. Try Again.').css('color', '#777777');
        }
    });
}

// Update pagination based on the current page number
function updatePagination() {
    // Hide or show "Previous" and "Next" links based on the current page
    $('#next-page').hide();

    if (currentPage === 3) {
        let nextUrl = `/quiz/1?ids=${encodedIds}`;  // 动态构建 URL
        $('#next-page').attr("href", nextUrl); 
        $('#next-page').html("Go to the Main Quiz")
        } else {
        $('#next-page').attr('href', `/quiz/prep/${currentPage + 1}`);
    }
}

$(document).ready(function() {
    updateView();

    // Handle the pagination
    $('#prev-page').on('click', function() {
        if (info.page_num > 1) {
            info.page_num -= 1;
            updatePagination();
        }
    });

    $('#next-page').on('click', function() {
        if (info.page_num < 3) {
            info.page_num += 1;
            updatePagination();
        }
    });
})

