
const questions = [
    {
        type: "kind",
        text: "الشمسُ تشرقُ في الصباحِ",
        question: "ما نوع هذه الجملة؟",
        options: ["جملة اسمية", "جملة فعلية"],
        answer: "جملة اسمية"
    },
    {
        type: "kind",
        text: "كتبَ الطالبُ الدرسَ",
        question: "ما نوع هذه الجملة؟",
        options: ["جملة اسمية", "جملة فعلية"],
        answer: "جملة فعلية"
    },
    {
        type: "kind",
        text: "الزهرتان جميلتانِ",
        question: "ما نوع هذه الجملة؟",
        options: ["جملة اسمية", "جملة فعلية"],
        answer: "جملة اسمية"
    },
    {
        type: "kind",
        text: "يذهبُ المعلمُ إلى المدرسةِ",
        question: "ما نوع هذه الجملة؟",
        options: ["جملة اسمية", "جملة فعلية"],
        answer: "جملة فعلية"
    },
    {
        type: "kind",
        text: "العلمُ نورٌ",
        question: "ما نوع هذه الجملة؟",
        options: ["جملة اسمية", "جملة فعلية"],
        answer: "جملة اسمية"
    },
    {
        type: "kind",
        text: "عادَ المهاجرُ إلى وطنهِ",
        question: "ما نوع هذه الجملة؟",
        options: ["جملة اسمية", "جملة فعلية"],
        answer: "جملة فعلية"
    },
    {
        type: "parse",
        text: "كتبَ الطالبُ الدرسَ",
        question: "ما إعراب كلمة الطالبُ؟",
        options: ["مبتدأ مرفوع", "فاعل مرفوع", "مفعول به منصوب", "خبر مرفوع"],
        answer: "فاعل مرفوع"
    },
    {
        type: "parse",
        text: "قرأَ الولدُ القصةَ",
        question: "ما إعراب كلمة القصةَ؟",
        options: ["فاعل مرفوع", "مبتدأ مرفوع", "مفعول به منصوب", "خبر مرفوع"],
        answer: "مفعول به منصوب"
    },
    {
        type: "parse",
        text: "العلمُ نورٌ",
        question: "ما إعراب كلمة العلمُ؟",
        options: ["فاعل مرفوع", "مبتدأ مرفوع", "مفعول به منصوب", "اسم مجرور"],
        answer: "مبتدأ مرفوع"
    },
    {
        type: "parse",
        text: "الجوُّ جميلٌ",
        question: "ما إعراب كلمة جميلٌ؟",
        options: ["مبتدأ مرفوع", "فاعل مرفوع", "خبر مرفوع", "مفعول به منصوب"],
        answer: "خبر مرفوع"
    },
    {
        type: "parse",
        text: "يلعبُ الطفلُ بالكرةِ",
        question: "ما إعراب كلمة الكرةِ؟",
        options: ["فاعل مرفوع", "مفعول به منصوب", "اسم مجرور", "مبتدأ مرفوع"],
        answer: "اسم مجرور"
    },
    {
        type: "parse",
        text: "يكتبُ المعلمُ الدرسَ",
        question: "ما إعراب كلمة يكتبُ؟",
        options: ["فعل ماضٍ", "فعل مضارع مرفوع", "فعل أمر", "اسم مجرور"],
        answer: "فعل مضارع مرفوع"
    },
    {
        type: "parse",
        text: "حضرَ المعلمانِ",
        question: "ما إعراب كلمة المعلمانِ؟",
        options: [
            "مفعول به منصوب",
            "مبتدأ مرفوع",
            "فاعل مرفوع وعلامة رفعه الألف لأنه مثنى",
            "اسم مجرور"
        ],
        answer: "فاعل مرفوع وعلامة رفعه الألف لأنه مثنى"
    },
    {
        type: "parse",
        text: "الطالباتُ مجتهداتٌ",
        question: "ما إعراب كلمة مجتهداتٌ؟",
        options: ["فاعل مرفوع", "خبر مرفوع", "مفعول به منصوب", "اسم مجرور"],
        answer: "خبر مرفوع"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let shuffledQuestions = [];
let audioContext = null;

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const sentenceText = document.getElementById("sentence-text");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const questionCounter = document.getElementById("question-counter");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

function shuffleArray(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function startAudio() {
    const AudioClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioClass) return;

    if (!audioContext) {
        audioContext = new AudioClass();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}

function playTone(frequency, startTime, duration, type = "sine") {
    if (!audioContext || audioContext.state !== "running") return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.12, startTime + 0.025);
    gain.gain.setValueAtTime(0.12, startTime + duration * 0.5);
    gain.gain.linearRampToValueAtTime(0.001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.03);
}

function playWinSound() {
    if (!audioContext || audioContext.state !== "running") return;

    const now = audioContext.currentTime;

    playTone(523, now, 0.18);
    playTone(659, now + 0.17, 0.18);
    playTone(784, now + 0.34, 0.3);
}

function playLoseSound() {
    if (!audioContext || audioContext.state !== "running") return;

    const now = audioContext.currentTime;

    playTone(330, now, 0.22, "triangle");
    playTone(247, now + 0.22, 0.32, "triangle");
}

startBtn.addEventListener("click", function () {
    startAudio();

    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    shuffledQuestions = shuffleArray(questions);

    loadQuestion();
});

function loadQuestion() {
    feedback.textContent = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";
    nextBtn.textContent = "السؤال التالي ←";
    answered = false;

    if (currentQuestionIndex >= shuffledQuestions.length) {
        finishGame();
        return;
    }

    const current = shuffledQuestions[currentQuestionIndex];

    questionCounter.textContent =
        "السؤال " + (currentQuestionIndex + 1) +
        " من " + shuffledQuestions.length;

    sentenceText.textContent =
        current.question + " — " + current.text;

    choices.style.display = "flex";
    choices.innerHTML = "";

    shuffleArray(current.options).forEach(function (option) {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "choice-btn";
        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(option);
        });

        choices.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    if (answered) return;

    answered = true;

    const current = shuffledQuestions[currentQuestionIndex];
    const buttons = choices.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === current.answer) {
            button.style.background = "#d94ca8";
            button.style.borderColor = "#a32378";
            button.style.boxShadow = "0 6px #92266f";
        } else {
            button.style.background = "#f8d6eb";
            button.style.color = "#8e246b";
            button.style.boxShadow = "none";
        }
    });

    if (selectedAnswer === current.answer) {
        feedback.textContent = "إجابة صحيحة! أحسنتِ 🎉";
        feedback.style.color = "#159447";

        score += 10;
        scoreDisplay.textContent = score;

        playWinSound();
    } else {
        feedback.textContent =
            "إجابة خاطئة! الإجابة الصحيحة: " + current.answer;

        feedback.style.color = "#d62865";

        playLoseSound();
    }

    if (currentQuestionIndex === shuffledQuestions.length - 1) {
        nextBtn.textContent = "عرض النتيجة 🌟";
    }

    nextBtn.style.display = "block";
    currentQuestionIndex++;
}

nextBtn.addEventListener("click", loadQuestion);

function finishGame() {
    sentenceText.textContent = "انتهت اللعبة! أحسنتِ 🌟";

    questionCounter.textContent = "اكتملت الأسئلة";
    choices.style.display = "none";
    nextBtn.style.display = "none";

    feedback.style.color = "#b52c91";
    feedback.textContent =
        "نتيجتكِ " + score + " من " +
        (shuffledQuestions.length * 10) + " نقطة";

    restartBtn.style.display = "block";
}

restartBtn.addEventListener("click", function () {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    shuffledQuestions = shuffleArray(questions);

    loadQuestion();
});
