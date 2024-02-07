const ques = [{ question: "In which year was C. N. Annadurai (Anna) born?", answers: [{ text: '1. 1905', correct: false }, { text: '2. 1907', correct: false }, { text: '3. 1909', correct: true }, { text: '4. 1911', correct: false }] },
{ question: " Which Dravidian party's member became Chief Minister for the first time with C. N. Annadurai?", answers: [{ text: '1. AIADMK', correct: false }, { text: '2. DMK', correct: true }, { text: '3. PMK', correct: false }, { text: '4. TMC', correct: false }] },
{ question: "In addition to politics, what other talent was Anna known for?", answers: [{ text: '1. Writing In Tamil And Oratory', correct: true }, { text: '2. Singing', correct: false }, { text: '3. Dancing', correct: false }, { text: '4. Painting', correct: false }] },
{ question: "What was Anna's profession before he entered politics?", answers: [{ text: '1. Engineer', correct: false }, { text: '2. Doctor', correct: false }, { text: '3. Lawyer', correct: false }, { text: '4. School Teacher', correct: true }] },
{ question: "C. N. Annadurai served as the Chief Minister of which state?", answers: [{ text: '1. West Bengal', correct: false }, { text: '2. Madras State/Tamil Nadu', correct: true }, { text: '3. Andhra Pradesh', correct: false }, { text: '4. Kerala', correct: false }] },
{ question: "Who was Anna's political mentor? ", answers: [{ text: '1. Nehru', correct: false }, { text: '2. Periyar E. V. Ramasamy', correct: true }, { text: '3. M G Ramahandran', correct: false }, { text: '4. Gandhi', correct: false }] },
{ question: "Anna was the first from Dravidian parties to use what for political propaganda?", answers: [{ text: '1. Newspapers', correct: false }, { text: '2. Radio Broadcast', correct: false }, { text: '3. Tamil Cinema', correct: true }, { text: '4. Rallies', correct: false }] },
{ question: "What kind of job did Anna hold before politics?", answers: [{ text: '1. Banker', correct: false }, { text: '2. Journalist', correct: true }, { text: '3. Farmer', correct: false }, { text: '4. None Of The Above', correct: false }] },
{ question: "Where was Anna born?", answers: [{ text: '1. Kanchipuram', correct: true }, { text: '2. Coimbatore', correct: false }, { text: '3. Pudukkottai', correct: false }, { text: '4. Chennai', correct: false }] },
{ question: "How significant was the attendance at Anna's funeral?", answers: [{ text: '1. None of the below', correct: false }, { text: '2. Low', correct: false }, { text: '3. The Highest Till That Date', correct: true }, { text: '4. Average', correct: false }] }
];
const startbtn = document.querySelector('.Start');
const quiz = document.querySelector('.quiz');
const questionlist = document.getElementById('question_list');
const answer_list = document.getElementById('answer_list');
const nxt = document.getElementById('next');
const showquesno = document.getElementById('CuQuesno');
const scorecount = document.getElementById('scorecount');
const feedback = document.getElementById('feedback');
// console.log(answer_list.innerText);
let Questionindex = 0;
let score = 0;

// starting stage of the the quiz
function startQuiz() {
    Questionindex = 0;
    score = 0;
    showQuiz();  // Call new function to show quiz section
    nxt.innerHTML = "Next";
    displayQues();
}


// Toggle visibility of main and quiz sections
function showQuiz() {
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.quiz').style.display = 'flex';
}
// This function is used to display the questions and answer
function displayQues() {
    resetState();
    feedback.innerHTML = '';
    let currQues = ques[Questionindex];
    let quesno = Questionindex + 1;
    showquesno.innerHTML = `Questions ${quesno} of 10`;
    questionlist.innerHTML = currQues.question;

    if (score == 0) {     //when start or restart the quiz ,to check initial scorecout to be zero.
        scorecount.innerText = `Score ${score} of 10`;
    }

    // This function is used to get the each question ,where we stored as an array 
    currQues.answers.forEach(answer => {
        const label = document.createElement('label');
        label.innerHTML = answer.text;
        label.classList.add("btn");
        answer_list.appendChild(label);
        if (answer.correct) {
            label.dataset.correct = answer.correct;
        }
        label.addEventListener("click", selectAnswer);
    })
}
function resetState() {
    nxt.style.display = "none";
    while (answer_list.firstChild) {
        answer_list.removeChild(answer_list.firstChild)
    }
}

function selectAnswer(e) {
    const selectedLabel = e.target;
    const isCorrect = selectedLabel.dataset.correct === 'true';

    // Disable all other labels
    Array.from(answer_list.children).forEach(label => {
        if (label !== selectedLabel) {
            label.classList.add("disabled"); // Add a class to visually indicate disabled state
            label.removeEventListener("click", selectAnswer); // Remove the click event listener
        }
    });

    // Highlight the selected label based on correctness
    if (isCorrect) {
        selectedLabel.classList.add("correct");
        score++;

    } else {
        selectedLabel.classList.add("incorrect");

        // Highlight the correct answer
        Array.from(answer_list.children).forEach(label => {
            if (label.dataset.correct === "true") {
                label.classList.add("correct");
            }
        });
    }
    scorecount.innerText = `Score ${score} of 10`;
    nxt.style.display = "block";

}

// To show the final score at end of the quiz 
function showScore() {
    resetState();
    questionlist.innerHTML = `Your Score is ${score} out of ${ques.length}`;
    if (score >= 8) {
        feedback.innerHTML = `Great Job! You really know your stuff..`;
    } else if (score < 8 && score > 5) {
        feedback.innerHTML = `Need practise to get Huge score..`;
    }
    else {
        feedback.innerHTML = `Give more time to study about "Anna"...`;
    }
    nxt.innerHTML = "Restart";
    nxt.style.display = 'block';
}
function handleNextbtn() {
    Questionindex++;
    if (Questionindex < ques.length) {
        displayQues();
    }
    else {
        nxt.innerHTML = "Submit"
        showScore();
    }
}
nxt.addEventListener("click", () => {
    if (Questionindex < ques.length) {
        handleNextbtn();
    }
    else {
        startQuiz();
    }
});
// Only after click the Start_id button then only the quiz will begin..
startbtn.onclick = () => {
    quiz.classList.add('active');
    startQuiz();
}