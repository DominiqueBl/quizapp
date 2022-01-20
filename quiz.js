let currentQuestion = 0; //Globale Variable, um das erste JSON aus Array anzeigen zu können. 0, weil wir im Array mit 0 für die erste Stelle/erstes Array beginnen
let audioSuccess = new Audio('./audio/true.mp3');
let audioFail = new Audio('./audio/false.mp3');

let questions = [
    {
        "question": "Basilikum kennt jeder. Was aber ist ein/eine Basilisk?",
        "answer_1": "Ein Basilikum- Bauer",
        "answer_2": "Ein Geistlicher/ Prediger",
        "answer_3": "Ein Fabelwesen",
        "right_answer": 3
    },
    {
        "question": "Wovor hat ein Mensch Angst, wenn er an Eisoptrophobie leidet?",
        "answer_1": "Vor Unterführungen",
        "answer_2": "Vor Spiegeln",
        "answer_3": "Vor zu kaltem Wetter",
        "right_answer": 2
    },
    {
        "question": "Was denkt ein Mensch, der unter Geliophobie leidet?",
        "answer_1": "Dass tödliche Giftstoffe in allen Arten der Kosmetik und Reinigungsmittel enthalten sind.",
        "answer_2": "Dass Verschwörungsfantasmen (im Kino usw.) die einzig wahren Wissensquellen sind.",
        "answer_3": "Dass lachen eine Sünde ist.",
        "right_answer": 3
    },
    {
        "question": "Was genau steckt hinter dem ominösen Wort Prellsprung?",
        "answer_1": "Eine bestimmte Technik im Box- Kampfsport",
        "answer_2": "Der bis zu 3 Meter hohe Luftsprung mancher Antilopenarten.",
        "answer_3": "Der Annäherungsversuch der indischen Wasserkröte vor der Paarung.",
        "right_answer": 2
    },
    {
        "question": "In der ehemaligen DDR wurden sie Mondos genannt. Was verbirgt sich dahinter?",
        "answer_1": "Einheitskondome",
        "answer_2": "Mitglieder einer bestimmten Jugendorganisation.",
        "answer_3": "Zellstofftaschentücher",
        "right_answer": 1
    },
];


function init() {
    document.getElementById('allQuestions').innerHTML = questions.length;

    showQuestion();
}

let rightAnswer = 0; //variable für anzeige der richtig beantworteten Fragen auf dem endscreen.

function showQuestion() {
    if  (gameIsOver()) { //wenn currentquestion länger/größer oder gleich als/wie Array(5) ist
        showEndScreen();
    } else {              //show question
        updateProgressBar();
        updateNextQuestion();
    };
}

function gameIsOver(){
return currentQuestion >= questions.length;
}

function showEndScreen() {

    document.getElementById('endBody').style = ''; //display-none wird von style in html entfernt, endscreen wird nun angezeigt
    document.getElementById('startBody').style = 'display: none'; //active screen bekommt display none

    document.getElementById('sumOfRightAnswers').innerHTML = rightAnswer; //variable für Anzahl der richtig beantworteten Fragen auf dem endscreen
}

function updateProgressBar() {

    let percent = currentQuestion / questions.length; //aktuelle Frage soll durch die Gesamtlänge (akso 5) des Arrays geteilt werden, um Prozentangabe anzuzeigen
    percent = percent * 100; //Ergebnis wird in vollen Zahlen und % angegeben durch multiplizieren mit 100
    document.getElementById('progressBar').innerHTML = `${percent}%`; //Prozent-Wert wird eingegeben durch Variable percent und Berechnung
    document.getElementById('progressBar').style.width = `${percent}%`; //width-Wert aus html wird geändert mit style

    console.log('Fortschritt', percent);
}

function updateNextQuestion() {

    let question = questions[currentQuestion]; //Variable, die aus Array "questions" das erste JSON durch die globale Variable "currentQuestion" an der Stelle 0/also erstes Array rauslesen soll

    document.getElementById('questionNumber').innerHTML = currentQuestion + 1; //die Nr der Frage/Karte wird unten angezeigt, ist variabel, beginnt mit 1 zu zählen an durch +1, weil Js immer mit 0 beginnt zu zählen
    document.getElementById('currQuestion').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];

    document.getElementById('switchImg').src = './img/cardimg.png';
}


function answer(currAnswer) { //Variable wird in die Klammer gegeben,da es 3 Antwort-Varianten gibt
    let question = questions[currentQuestion];
    console.log('selected answer is', currAnswer); //mit console log wird die ausgeführte function mit dem string in der Klammer angezeigt
    let selectedQuestionNumber = currAnswer.slice(-1); //Nummer der Antwort wird rausgelesen
    console.log('selectedQuestionNumber is', selectedQuestionNumber);
    console.log('current question is', question['right_answer']); //Nr hinter right_answer wird rausgelesen

    let idOfRightAnswer = `answer_${question['right_answer']}`; //Variable wird für Zeile 74 benötigt, um richtige Antwort grün zu färben, falls die falsche gewählt wird
                                                            //hinter $-Zeichen: answer_(die jeweilige Nummer(Zeile 64), die die rihtige Antwort im Array anzeigt)
    if (rightAnswerSelected(selectedQuestionNumber, question)) { //wenn die selectedNr der Nr in right_answer übereinstimmt, ist die Antwort richtig
        document.getElementById('switchImg').src = './img/cardimg.png';

        console.log('Richtige Antwort!');
        document.getElementById(currAnswer).classList.add('bg-success'); //der button färbt sich grün durch css class
        rightAnswer++;
        audioSuccess.play();

    } else {
        document.getElementById('switchImg').src = './img/false.png';

        console.log('Falsche Antwort!'); //wenn die Nummern nicht übereinstimmen, ist es die falsche Antwort
        document.getElementById(currAnswer).classList.add('bg-danger'); //Dann färbt sich button rot
        document.getElementById(idOfRightAnswer).classList.add('bg-success');  //wenn die Antwort falsch ist, färbe mir die richtige Antwort rot

        audioFail.play();
    }

    document.getElementById('nextQuestion').disabled = false;  //button soll mit disabled statisch werden, solange keine Antwort geklickt wird
}

function rightAnswerSelected(selectedQuestionNumber, question){
    return selectedQuestionNumber == question['right_answer'];
}


//shows next JSON by click on button
function showNextQuestion() {
    currentQuestion++; //diese globale Variable braucht ++, um den Wert den sie ursprünglich hatte (0) immer um 1 zu erhöhen
    document.getElementById('nextQuestion').disabled = true; //button function wird ausgesetzt
    editButtons(); //in jeder Antwort werden die classlists entfernt
    showQuestion();
}

function editButtons() {
    document.getElementById('answer_1').classList.remove('bg-danger');
    document.getElementById('answer_1').classList.remove('bg-success');
    document.getElementById('answer_2').classList.remove('bg-danger');
    document.getElementById('answer_2').classList.remove('bg-success');
    document.getElementById('answer_3').classList.remove('bg-danger');
    document.getElementById('answer_3').classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('switchImg').src = './img/cardimg.png';
    document.getElementById('endBody').style = 'display: none';
    document.getElementById('startBody').style = '';

    rightAnswer = 0;
    currentQuestion = 0;

    init();
}

