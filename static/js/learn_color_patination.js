let copperStage = 0; 
let tinStage = 0;
let leadStage = 0;

function changeColor(metal) {
    if (metal === 'copper') {
        copperStage++;
        if (copperStage === 1) {
            document.getElementById('copper').style.backgroundColor = '#B87333'; // Copper color
            document.getElementById('copper-text').textContent = 'Cu';
            document.getElementById('copper-text-detail').textContent = 'Copper (Initial Stage)';
        } else if (copperStage === 2) {
            document.getElementById('copper').style.backgroundColor = '#7E3A1D'; // Cu₂O (Copper(I) oxide)
            document.getElementById('copper-text').textContent = 'Cu₂O';
            document.getElementById('copper-text-detail').textContent = 'Copper(I) Oxide';
        } else if (copperStage === 3) {
            document.getElementById('copper').style.backgroundColor = '#6A4E23'; // CuO (Copper(II) oxide)
            document.getElementById('copper-text').textContent = 'CuO';
            document.getElementById('copper-text-detail').textContent = 'Copper(II) Oxide';

        } else if (copperStage === 4) {
            document.getElementById('copper').style.backgroundColor = '#006400'; // Cu₂(OH)₂CO₃ (Copper carbonate)
            document.getElementById('copper-text').textContent = 'Cu₂(OH)₂CO₃';
            document.getElementById('copper-text-detail').textContent = 'Copper Patina';
            copperStage = 0; // Reset copper stage
        }
    } else if (metal === 'tin') {
        if (tinStage===1) {
            document.getElementById('tin').style.backgroundColor = '#fcfcf5';
            document.getElementById('tin-text').textContent = 'SnO₂';
            document.getElementById('tin-text-detail').textContent = 'Tin Oxide';

            tinStage = 0
        } else if (tinStage === 0) {
            document.getElementById('tin').style.backgroundColor = '#C0C0C0'; 
            document.getElementById('tin-text').textContent = 'Sn';
            document.getElementById('tin-text-detail').textContent = 'Tin (Initial Stage)';
            tinStage = 1
        }
    } else if (metal === 'lead') {
        leadStage++;
        if (leadStage === 1) {
            document.getElementById('lead').style.backgroundColor = '#A9A9A9'; // Pb (Lead color)
            document.getElementById('lead-text').textContent = 'Pb';
            document.getElementById('lead-text-detail').textContent = 'Lead (Initial Stage)';

        } else if (leadStage === 2) {
            document.getElementById('lead').style.backgroundColor = '#ffffe6'; // PbO (Lead oxide)
            document.getElementById('lead-text').textContent = 'PbO';
            document.getElementById('lead-text-detail').textContent = 'Lead Oxide';

        } else if (leadStage === 3) {
            document.getElementById('lead').style.backgroundColor = '#fdfdfd'; // PbCO₃ (Lead carbonate)
            document.getElementById('lead-text').textContent = 'PbCO₃';
            document.getElementById('lead-text-detail').textContent = 'Lead Carbonate';

            leadStage = 0; // Reset lead stage
        }
    }
}

$document.ready(function(){
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
                        <div class="text-muted">Please finish all three learning sections first: Color, Motif, and Shape.</div>
                        <div class="mx-5">${learnPageBtn}</div>
                    `);
                }
            },
            error: function(error) {
                console.error("Error checking learning status:", error);
            }
        });
})
