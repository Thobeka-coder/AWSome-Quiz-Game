const questions = [
    {
        question: "What is Amazon Q?",
        answers: [
            "A database service",
            "A generative AI-powered assistant for work",
            "A queuing service",
            "A quantum computing service"
        ],
        correct: 1
    },
    {
        question: "Which AWS service is used for serverless computing?",
        answers: [
            "Amazon EC2",
            "Amazon RDS",
            "AWS Lambda",
            "Amazon S3"
        ],
        correct: 2
    },
    {
        question: "What is the primary purpose of Amazon S3?",
        answers: [
            "Object storage",
            "Database management",
            "Container orchestration",
            "Load balancing"
        ],
        correct: 0
    },
    {
        question: "Which AWS service is used for relational databases?",
        answers: [
            "DynamoDB",
            "Amazon RDS",
            "ElastiCache",
            "Neptune"
        ],
        correct: 1
    },
    {
        question: "What is Amazon ECS used for?",
        answers: [
            "Email service",
            "Container orchestration",
            "Edge computing",
            "Database backup"
        ],
        correct: 1
    },
    {
        question: "Which AWS service provides managed Kubernetes clusters?",
        answers: [
            "Amazon ECS",
            "Amazon ECR",
            "Amazon EKS",
            "Amazon EC2"
        ],
        correct: 2
    },
    {
        question: "What is the purpose of AWS CloudFormation?",
        answers: [
            "Performance monitoring",
            "Infrastructure as Code",
            "Content delivery",
            "Data encryption"
        ],
        correct: 1
    },
    {
        question: "Which AWS service is used for content delivery?",
        answers: [
            "CloudFront",
            "CloudWatch",
            "CloudTrail",
            "CloudFormation"
        ],
        correct: 0
    },
    {
        question: "What type of database is Amazon DynamoDB?",
        answers: [
            "Relational",
            "NoSQL",
            "Graph",
            "Time series"
        ],
        correct: 1
    },
    {
        question: "Which AWS service is used for real-time data streaming?",
        answers: [
            "Amazon SQS",
            "Amazon SNS",
            "Amazon Kinesis",
            "Amazon MQ"
        ],
        correct: 2
    },
    {
        question: "What is the main purpose of AWS IAM?",
        answers: [
            "Image processing",
            "Access management",
            "Invoice tracking",
            "Internet monitoring"
        ],
        correct: 1
    },
    {
        question: "Which AWS service provides virtual servers in the cloud?",
        answers: [
            "Amazon EC2",
            "Amazon EBS",
            "Amazon EFS",
            "Amazon EMR"
        ],
        correct: 0
    }
];

// Constants and state management
const elements = {
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    score: document.getElementById('score'),
    popup: document.getElementById('popup'),
    results: document.getElementById('results'),
    background: document.getElementById('background')
};

const state = {
    currentQuestionIndex: 0,
    score: 0
};

// Question handling
function loadQuestion() {
    const currentQuestion = questions[state.currentQuestionIndex];
    elements.question.textContent = currentQuestion.question;
    elements.answers.innerHTML = '';

    const fragment = document.createDocumentFragment();
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'btn';
        button.onclick = () => selectAnswer(index);
        fragment.appendChild(button);
    });
    elements.answers.appendChild(fragment);
}

function showPopup(message, isCorrect) {
    const { popup } = elements;
    popup.textContent = message;
    popup.style.backgroundColor = isCorrect ? 'rgba(0, 128, 0, 0.8)' : 'rgba(128, 0, 0, 0.8)';
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
        nextQuestion();
    }, 2000);
}

function selectAnswer(index) {
    const currentQuestion = questions[state.currentQuestionIndex];
    const isCorrect = index === currentQuestion.correct;

    if (isCorrect) {
        state.score++;
        showPopup('Correct!', true);
    } else {
        showPopup(`Incorrect! The correct answer is: ${currentQuestion.answers[currentQuestion.correct]}`, false);
    }
    elements.score.textContent = `Score: ${state.score}`;
}

function nextQuestion() {
    state.currentQuestionIndex++;
    state.currentQuestionIndex < questions.length ? loadQuestion() : showResults();
}


function showResults() {
    elements.question.textContent = 'Quiz Over!';
    elements.answers.innerHTML = '';

    const resultsHTML = `
        <h3 style="color: #4CAF50; transition: color 0.3s ease">Correct Answers:</h3>
        <ul style="list-style-type: none; padding-left: 0;">
            ${questions.map(q => `<li>${q.question} - <strong style="color: #4CAF50; transition: color 0.3s ease">${q.answers[q.correct]}</strong></li>`).join('')}
        </ul>
    `;
    elements.results.innerHTML = resultsHTML;
}


// Background animation
function createBackgroundAnimation() {
    const canvas = elements.background;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.5
    }));

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ffcc';

        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            star.y = (star.y + star.speed) % canvas.height;
        });
        requestAnimationFrame(animateStars);
    }

    animateStars();
}

// Initialize
createBackgroundAnimation();
loadQuestion();
