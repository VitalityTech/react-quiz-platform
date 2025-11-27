import { Link } from "react-router-dom";

// ... ваш массив quizzes ...
const quizzes = [
  // ... (ваш код без изменений)
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your knowledge on various topics!",
    questions: 5,
    time: "60s",
  },
  {
    id: 2,
    title: "Science & Nature",
    description: "Explore the wonders of science and nature!",
    questions: 4,
    time: "90s",
  },
  {
    id: 3,
    title: "Pop Culture",
    description: "How well do you know movies, music, and more?",
    questions: 3,
    time: "45s",
  },
];

const HomePage = () => {
  return (
    <div className="home-page container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero__title">Welcome to PickMe Quizzes!</h1>
        <p className="hero__subtitle">
          Challenge yourself with our exciting quizzes or create your own to share with friends!
        </p>
      </section>

      {/* Сітка з картками */}
      <section className="quiz-grid">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <h2 className="quiz-card__title">{quiz.title}</h2>
            <p className="quiz-card__description">{quiz.description}</p>
            
            <div className="quiz-card__info">
              <div className="quiz-card__meta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <span>{quiz.questions} questions</span>
              </div>
              <div className="quiz-card__meta">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{quiz.time}</span>
              </div>
            </div>

            <Link to={`/quiz/${quiz.id}`} className="quiz-card__button">
              Start Quiz
            </Link>
          </div>
        ))}
      </section>

      {/* Footer Info */}
      <div className="info">
        <section className="info__text">
          <h3 className="info__title">PickMe Quizzes: Your Online Quiz Platform. By PickMe Interactive.</h3>
        </section>
      </div>
    </div>
  );
};

export default HomePage;