import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const quizzesData = {
  1: {
    title: "General Knowledge",
    timeLimit: 60,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: [
          { id: "A", text: "London" },
          { id: "B", text: "Berlin" },
          { id: "C", text: "Paris" },
          { id: "D", text: "Madrid" },
        ],
        correctAnswer: "C",
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: [
          { id: "A", text: "Venus" },
          { id: "B", text: "Mars" },
          { id: "C", text: "Jupiter" },
          { id: "D", text: "Saturn" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question: "Who painted the Mona Lisa?",
        options: [
          { id: "A", text: "Vincent van Gogh" },
          { id: "B", text: "Pablo Picasso" },
          { id: "C", text: "Leonardo da Vinci" },
          { id: "D", text: "Michelangelo" },
        ],
        correctAnswer: "C",
      },
      {
        id: 4,
        question: "What is the largest ocean on Earth?",
        options: [
          { id: "A", text: "Atlantic Ocean" },
          { id: "B", text: "Indian Ocean" },
          { id: "C", text: "Arctic Ocean" },
          { id: "D", text: "Pacific Ocean" },
        ],
        correctAnswer: "D",
      },
      {
        id: 5,
        question: "How many continents are there?",
        options: [
          { id: "A", text: "5" },
          { id: "B", text: "6" },
          { id: "C", text: "7" },
          { id: "D", text: "8" },
        ],
        correctAnswer: "C",
      },
    ],
  },
  2: {
    title: "Science & Nature",
    timeLimit: 90,
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: [
          { id: "A", text: "Go" },
          { id: "B", text: "Gd" },
          { id: "C", text: "Au" },
          { id: "D", text: "Ag" },
        ],
        correctAnswer: "C",
      },
      {
        id: 2,
        question: "How many bones are in the human body?",
        options: [
          { id: "A", text: "186" },
          { id: "B", text: "206" },
          { id: "C", text: "226" },
          { id: "D", text: "246" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question: "What is the fastest land animal?",
        options: [
          { id: "A", text: "Lion" },
          { id: "B", text: "Cheetah" },
          { id: "C", text: "Leopard" },
          { id: "D", text: "Tiger" },
        ],
        correctAnswer: "B",
      },
      {
        id: 4,
        question: "What gas do plants absorb from the atmosphere?",
        options: [
          { id: "A", text: "Oxygen" },
          { id: "B", text: "Nitrogen" },
          { id: "C", text: "Carbon Dioxide" },
          { id: "D", text: "Hydrogen" },
        ],
        correctAnswer: "C",
      },
    ],
  },
  3: {
    title: "Pop Culture",
    timeLimit: 45,
    questions: [
      {
        id: 1,
        question: "Which movie won the Oscar for Best Picture in 2020?",
        options: [
          { id: "A", text: "1917" },
          { id: "B", text: "Joker" },
          { id: "C", text: "Parasite" },
          { id: "D", text: "Once Upon a Time in Hollywood" },
        ],
        correctAnswer: "C",
      },
      {
        id: 2,
        question: "Who is known as the 'King of Pop'?",
        options: [
          { id: "A", text: "Elvis Presley" },
          { id: "B", text: "Michael Jackson" },
          { id: "C", text: "Prince" },
          { id: "D", text: "Madonna" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question: "What year did the first iPhone release?",
        options: [
          { id: "A", text: "2005" },
          { id: "B", text: "2006" },
          { id: "C", text: "2007" },
          { id: "D", text: "2008" },
        ],
        correctAnswer: "C",
      },
    ],
  },
};

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const loadStoredQuiz = () => {
    try {
      const raw = localStorage.getItem("quizzes");
      if (!raw) return null;
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return null;
      const found = arr.find((q) => String(q.id) === String(quizId));
      if (!found) return null;

      const normalizedQuestions = (found.questions || []).map((qq) => {
        const questionText = qq.text || qq.question || qq.title || "";
        const opts = (qq.options || []).map((opt, i) => ({
          id: String.fromCharCode(65 + i),
          text: opt.label || opt.text || String(opt.id),
        }));
        const correct = (() => {
          if (typeof qq.correctIndex === "number")
            return String.fromCharCode(65 + qq.correctIndex);
          if (qq.correctAnswer) return qq.correctAnswer;
          return opts[0] ? opts[0].id : null;
        })();
        return {
          id: qq.id,
          question: questionText,
          options: opts,
          correctAnswer: correct,
        };
      });

      return {
        title: found.title,
        timeLimit: found.timeLimit || found.time || 60,
        questions: normalizedQuestions,
      };
    } catch (err) {
      console.error("Failed to load stored quizzes:", err);
      return null;
    }
  };

  const quizData = loadStoredQuiz() || quizzesData[quizId] || null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData ? quizData.timeLimit : 60);
  const [userAnswers, setUserAnswers] = useState([]);

  const totalQuestions = quizData ? quizData.questions.length : 0;
  const question = quizData ? quizData.questions[currentQuestionIndex] : null;

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!quizData) return;

      let startIndex = currentQuestionIndex;
      if (isAnswered) {
        startIndex = currentQuestionIndex + 1;
      }

      const remainingQuestions = quizData.questions.slice(startIndex);

      const missedAnswers = remainingQuestions.map((q) => ({
        questionId: q.id,
        questionText: q.question,
        selectedOption: null,
        correctOption: q.correctAnswer,
        isCorrect: false,
        options: q.options,
      }));

      const finalAnswers = [...userAnswers, ...missedAnswers];

      navigate(`/results/${quizId}`, {
        state: { userAnswers: finalAnswers, totalQuestions },
      });

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    timeLeft,
    quizData,
    currentQuestionIndex,
    isAnswered,
    userAnswers,
    navigate,
    totalQuestions,
    quizId,
  ]);

  const handleOptionClick = (optionId) => {
    if (isAnswered) return;

    setSelectedOption(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === question.correctAnswer;
    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        questionText: question.question,
        selectedOption: optionId,
        correctOption: question.correctAnswer,
        isCorrect: isCorrect,
        options: question.options,
      },
    ]);
  };

  const handleNextButton = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      navigate(`/results/${quizId}`, {
        state: { userAnswers, totalQuestions },
      });
    }
  };

  const formatTime = (seconds) => {
    if (seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const getOptionClass = (optionId) => {
    if (!isAnswered) return "";
    if (optionId === question.correctAnswer) return "correct";
    if (
      optionId === selectedOption &&
      selectedOption !== question.correctAnswer
    )
      return "wrong";
    return "";
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h2 className="quiz-header__title">{quizData.title}</h2>
        <div className="quiz-header__timer">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="progress-text">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
      </div>

      <div className="question-card">
        <h3 className="question-card__text">{question.question}</h3>
        <div className="options-list">
          {question.options.map((option) => (
            <button
              key={option.id}
              className={`option-item ${getOptionClass(option.id)}`}
              onClick={() => handleOptionClick(option.id)}
              disabled={isAnswered}
            >
              <div className="option-item__label">{option.id}</div>
              <span className="option-item__text">{option.text}</span>
              {isAnswered && option.id === question.correctAnswer && (
                <div className="option-item__icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#15803d"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
              {isAnswered &&
                option.id === selectedOption &&
                selectedOption !== question.correctAnswer && (
                  <div className="option-item__icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#b91c1c"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                )}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button className="exit-button" onClick={() => navigate("/")}>
          Exit Quiz
        </button>
        {isAnswered && (
          <button className="next-button" onClick={handleNextButton}>
            {currentQuestionIndex === totalQuestions - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
