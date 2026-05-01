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
  4: {
    title: "World History",
    timeLimit: 80,
    questions: [
      {
        id: 1,
        question: "In which year did World War II end?",
        options: [
          { id: "A", text: "1943" },
          { id: "B", text: "1945" },
          { id: "C", text: "1947" },
          { id: "D", text: "1950" },
        ],
        correctAnswer: "B",
      },
      {
        id: 2,
        question: "Who was the first President of the United States?",
        options: [
          { id: "A", text: "Thomas Jefferson" },
          { id: "B", text: "John Adams" },
          { id: "C", text: "George Washington" },
          { id: "D", text: "Abraham Lincoln" },
        ],
        correctAnswer: "C",
      },
      {
        id: 3,
        question: "The Great Wall is located in which country?",
        options: [
          { id: "A", text: "Mongolia" },
          { id: "B", text: "India" },
          { id: "C", text: "Japan" },
          { id: "D", text: "China" },
        ],
        correctAnswer: "D",
      },
      {
        id: 4,
        question: "Which civilization built Machu Picchu?",
        options: [
          { id: "A", text: "Maya" },
          { id: "B", text: "Inca" },
          { id: "C", text: "Aztec" },
          { id: "D", text: "Roman" },
        ],
        correctAnswer: "B",
      },
      {
        id: 5,
        question: "Which city was once called Constantinople?",
        options: [
          { id: "A", text: "Athens" },
          { id: "B", text: "Istanbul" },
          { id: "C", text: "Rome" },
          { id: "D", text: "Cairo" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  5: {
    title: "Technology",
    timeLimit: 75,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          { id: "A", text: "HyperText Markup Language" },
          { id: "B", text: "HighText Machine Language" },
          { id: "C", text: "Hyperlink and Text Management Language" },
          { id: "D", text: "Home Tool Markup Language" },
        ],
        correctAnswer: "A",
      },
      {
        id: 2,
        question: "Which company develops the React library?",
        options: [
          { id: "A", text: "Google" },
          { id: "B", text: "Meta" },
          { id: "C", text: "Microsoft" },
          { id: "D", text: "Amazon" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question: "What is the primary purpose of Git?",
        options: [
          { id: "A", text: "Image editing" },
          { id: "B", text: "Version control" },
          { id: "C", text: "Database hosting" },
          { id: "D", text: "Video rendering" },
        ],
        correctAnswer: "B",
      },
      {
        id: 4,
        question: "Which one is a JavaScript runtime?",
        options: [
          { id: "A", text: "Node.js" },
          { id: "B", text: "Django" },
          { id: "C", text: "Laravel" },
          { id: "D", text: "Rails" },
        ],
        correctAnswer: "A",
      },
      {
        id: 5,
        question: "What does CSS mainly control in a web page?",
        options: [
          { id: "A", text: "Server logic" },
          { id: "B", text: "Data storage" },
          { id: "C", text: "Visual styling" },
          { id: "D", text: "Browser installation" },
        ],
        correctAnswer: "C",
      },
    ],
  },
  6: {
    title: "Geography Challenge",
    timeLimit: 70,
    questions: [
      {
        id: 1,
        question: "What is the largest country by area?",
        options: [
          { id: "A", text: "Canada" },
          { id: "B", text: "China" },
          { id: "C", text: "Russia" },
          { id: "D", text: "USA" },
        ],
        correctAnswer: "C",
      },
      {
        id: 2,
        question: "Which river is the longest in the world?",
        options: [
          { id: "A", text: "Amazon" },
          { id: "B", text: "Nile" },
          { id: "C", text: "Yangtze" },
          { id: "D", text: "Mississippi" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question: "What is the capital city of Australia?",
        options: [
          { id: "A", text: "Sydney" },
          { id: "B", text: "Melbourne" },
          { id: "C", text: "Perth" },
          { id: "D", text: "Canberra" },
        ],
        correctAnswer: "D",
      },
      {
        id: 4,
        question: "Which desert is the largest hot desert on Earth?",
        options: [
          { id: "A", text: "Sahara" },
          { id: "B", text: "Gobi" },
          { id: "C", text: "Kalahari" },
          { id: "D", text: "Atacama" },
        ],
        correctAnswer: "A",
      },
    ],
  },
  7: {
    title: "React Fundamentals",
    timeLimit: 80,
    questions: [
      {
        id: 1,
        question: "What is JSX?",
        options: [
          { id: "A", text: "A database query language" },
          { id: "B", text: "A syntax extension for JavaScript" },
          { id: "C", text: "A CSS preprocessor" },
          { id: "D", text: "A Node.js server" },
        ],
        correctAnswer: "B",
      },
      {
        id: 2,
        question: "Props in React are primarily used to:",
        options: [
          { id: "A", text: "Store local mutable state" },
          { id: "B", text: "Pass data from parent to child" },
          { id: "C", text: "Handle API routes" },
          { id: "D", text: "Compile components" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question:
          "Which method is used to render a React app in the DOM in React 19 style?",
        options: [
          { id: "A", text: "ReactDOM.mount" },
          { id: "B", text: "createRoot(...).render(...)" },
          { id: "C", text: "React.renderApp" },
          { id: "D", text: "ReactDOM.attach" },
        ],
        correctAnswer: "B",
      },
      {
        id: 4,
        question: "Keys in lists help React to:",
        options: [
          { id: "A", text: "Encrypt list items" },
          { id: "B", text: "Track item identity between renders" },
          { id: "C", text: "Sort arrays automatically" },
          { id: "D", text: "Prevent event bubbling" },
        ],
        correctAnswer: "B",
      },
      {
        id: 5,
        question: "State updates in React should be treated as:",
        options: [
          { id: "A", text: "Directly mutable" },
          { id: "B", text: "Immutable updates" },
          { id: "C", text: "Synchronous only" },
          { id: "D", text: "Global by default" },
        ],
        correctAnswer: "B",
      },
    ],
  },
  8: {
    title: "React Hooks",
    timeLimit: 95,
    questions: [
      {
        id: 1,
        question: "Which hook is used for local component state?",
        options: [
          { id: "A", text: "useState" },
          { id: "B", text: "useEffect" },
          { id: "C", text: "useRef" },
          { id: "D", text: "useMemo" },
        ],
        correctAnswer: "A",
      },
      {
        id: 2,
        question: "useEffect runs after:",
        options: [
          { id: "A", text: "Server restart" },
          { id: "B", text: "Rendering commits to the screen" },
          { id: "C", text: "Babel transpilation" },
          { id: "D", text: "Component import" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question: "What is useMemo mainly for?",
        options: [
          { id: "A", text: "Caching expensive computed values" },
          { id: "B", text: "Styling components" },
          { id: "C", text: "Routing pages" },
          { id: "D", text: "Fetching CSS files" },
        ],
        correctAnswer: "A",
      },
      {
        id: 4,
        question: "useRef can be used to:",
        options: [
          { id: "A", text: "Trigger rerenders on each update" },
          { id: "B", text: "Store mutable values without rerender" },
          { id: "C", text: "Replace state management completely" },
          { id: "D", text: "Declare routes" },
        ],
        correctAnswer: "B",
      },
      {
        id: 5,
        question: "useCallback helps when:",
        options: [
          { id: "A", text: "You need to memoize function references" },
          { id: "B", text: "You need to mutate props" },
          { id: "C", text: "You need CSS modules" },
          { id: "D", text: "You need class components" },
        ],
        correctAnswer: "A",
      },
    ],
  },
  9: {
    title: "JavaScript Essentials",
    timeLimit: 85,
    questions: [
      {
        id: 1,
        question: "A closure is:",
        options: [
          { id: "A", text: "A CSS selector" },
          { id: "B", text: "A function with access to outer scope" },
          { id: "C", text: "A promise chain" },
          { id: "D", text: "A JSON parser" },
        ],
        correctAnswer: "B",
      },
      {
        id: 2,
        question: "Which keyword declares a block-scoped variable?",
        options: [
          { id: "A", text: "var" },
          { id: "B", text: "let" },
          { id: "C", text: "global" },
          { id: "D", text: "scope" },
        ],
        correctAnswer: "B",
      },
      {
        id: 3,
        question: "What does async/await improve compared to raw promises?",
        options: [
          { id: "A", text: "Rendering speed" },
          { id: "B", text: "Readability of asynchronous code" },
          { id: "C", text: "CSS performance" },
          { id: "D", text: "Memory encryption" },
        ],
        correctAnswer: "B",
      },
      {
        id: 4,
        question: "Which method creates a new array with transformed elements?",
        options: [
          { id: "A", text: "map" },
          { id: "B", text: "forEach" },
          { id: "C", text: "push" },
          { id: "D", text: "shift" },
        ],
        correctAnswer: "A",
      },
      {
        id: 5,
        question: "Which value is strictly equal to 0?",
        options: [
          { id: "A", text: "false" },
          { id: "B", text: '"0"' },
          { id: "C", text: "0" },
          { id: "D", text: "null" },
        ],
        correctAnswer: "C",
      },
    ],
  },
  10: {
    title: "Algorithms & Data Structures",
    timeLimit: 100,
    questions: [
      {
        id: 1,
        question: "What is the average time complexity of binary search?",
        options: [
          { id: "A", text: "O(n)" },
          { id: "B", text: "O(log n)" },
          { id: "C", text: "O(n log n)" },
          { id: "D", text: "O(1)" },
        ],
        correctAnswer: "B",
      },
      {
        id: 2,
        question: "Which data structure uses LIFO order?",
        options: [
          { id: "A", text: "Queue" },
          { id: "B", text: "Heap" },
          { id: "C", text: "Stack" },
          { id: "D", text: "Graph" },
        ],
        correctAnswer: "C",
      },
      {
        id: 3,
        question:
          "Which sorting algorithm is typically O(n log n) average-case?",
        options: [
          { id: "A", text: "Bubble sort" },
          { id: "B", text: "Merge sort" },
          { id: "C", text: "Selection sort" },
          { id: "D", text: "Insertion sort" },
        ],
        correctAnswer: "B",
      },
      {
        id: 4,
        question:
          "A queue usually supports insertion at rear and removal from:",
        options: [
          { id: "A", text: "Rear" },
          { id: "B", text: "Front" },
          { id: "C", text: "Middle" },
          { id: "D", text: "Random index" },
        ],
        correctAnswer: "B",
      },
      {
        id: 5,
        question: "Big O notation describes:",
        options: [
          { id: "A", text: "Exact runtime in milliseconds" },
          { id: "B", text: "Compiler version" },
          { id: "C", text: "Asymptotic growth of resource usage" },
          { id: "D", text: "Network throughput" },
        ],
        correctAnswer: "C",
      },
    ],
  },
  11: {
    title: "Backend & APIs",
    timeLimit: 90,
    questions: [
      {
        id: 1,
        question: "Which HTTP method is typically used to create a resource?",
        options: [
          { id: "A", text: "GET" },
          { id: "B", text: "POST" },
          { id: "C", text: "DELETE" },
          { id: "D", text: "HEAD" },
        ],
        correctAnswer: "B",
      },
      {
        id: 2,
        question: "Status code 404 means:",
        options: [
          { id: "A", text: "Unauthorized" },
          { id: "B", text: "Created" },
          { id: "C", text: "Not Found" },
          { id: "D", text: "Server Time Out" },
        ],
        correctAnswer: "C",
      },
      {
        id: 3,
        question: "JWT stands for:",
        options: [
          { id: "A", text: "Java Web Token" },
          { id: "B", text: "JSON Web Token" },
          { id: "C", text: "Joint Web Thread" },
          { id: "D", text: "JavaScript Worker Token" },
        ],
        correctAnswer: "B",
      },
      {
        id: 4,
        question:
          "Which layer commonly handles cross-cutting request logic in Express?",
        options: [
          { id: "A", text: "Middleware" },
          { id: "B", text: "Reducer" },
          { id: "C", text: "Hook" },
          { id: "D", text: "Compiler" },
        ],
        correctAnswer: "A",
      },
      {
        id: 5,
        question: "Caching often improves:",
        options: [
          { id: "A", text: "Latency and server load" },
          { id: "B", text: "Type checking" },
          { id: "C", text: "Source maps" },
          { id: "D", text: "Encryption key size" },
        ],
        correctAnswer: "A",
      },
    ],
  },
  12: {
    title: "Databases & SQL",
    timeLimit: 90,
    questions: [
      {
        id: 1,
        question: "Which SQL clause is used to filter rows?",
        options: [
          { id: "A", text: "ORDER BY" },
          { id: "B", text: "WHERE" },
          { id: "C", text: "GROUP BY" },
          { id: "D", text: "JOIN" },
        ],
        correctAnswer: "B",
      },
      {
        id: 2,
        question: "An index is mainly used to:",
        options: [
          { id: "A", text: "Speed up queries" },
          { id: "B", text: "Encrypt table rows" },
          { id: "C", text: "Rename columns" },
          { id: "D", text: "Create APIs" },
        ],
        correctAnswer: "A",
      },
      {
        id: 3,
        question: "Which JOIN returns only matching rows from both tables?",
        options: [
          { id: "A", text: "LEFT JOIN" },
          { id: "B", text: "RIGHT JOIN" },
          { id: "C", text: "INNER JOIN" },
          { id: "D", text: "FULL OUTER JOIN" },
        ],
        correctAnswer: "C",
      },
      {
        id: 4,
        question: "ACID properties are related to:",
        options: [
          { id: "A", text: "Transactions" },
          { id: "B", text: "Routing" },
          { id: "C", text: "Image optimization" },
          { id: "D", text: "Compiler output" },
        ],
        correctAnswer: "A",
      },
      {
        id: 5,
        question: "Normalization primarily helps to:",
        options: [
          { id: "A", text: "Increase image quality" },
          { id: "B", text: "Reduce data redundancy" },
          { id: "C", text: "Render UI faster" },
          { id: "D", text: "Change HTTP status codes" },
        ],
        correctAnswer: "B",
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
