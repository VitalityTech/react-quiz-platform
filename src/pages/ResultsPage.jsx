import { useLocation, Link, Navigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const { userAnswers, totalQuestions } = location.state || {};

  if (!userAnswers) {
    return <Navigate to="/" />;
  }

  const correctCount = userAnswers.filter((ans) => ans.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="results-page container">
      <div className="score-card">
        <div className="score-card__icon">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
        </div>
        <div className="score-card__subtitle">Good effort! 💪</div>
        <h1 className="score-card__title">
          You scored {correctCount} out of {totalQuestions}
        </h1>
        <div className="score-card__percent">That's {percentage}%!</div>
      </div>

      <div className="review-section">
        <h2 className="review-title">Review Your Answers</h2>

        {userAnswers.map((answer, index) => (
          <div key={index} className="review-item">
            <div className="review-item__question">
              {answer.isCorrect ? (
                <svg
                  className="review-item__status-icon review-item__status-icon--correct"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg
                  className="review-item__status-icon review-item__status-icon--wrong"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              )}
              <span>
                Question {index + 1}: {answer.questionText}
              </span>
            </div>

            <div className="review-options">
              {answer.options.map((opt) => {
                let optionClass = "review-option--default";
                let label = "";

                if (opt.id === answer.correctOption) {
                  optionClass = "review-option--correct";
                  label = "Correct";
                } else if (
                  opt.id === answer.selectedOption &&
                  !answer.isCorrect
                ) {
                  optionClass = "review-option--wrong";
                  label = "Your answer";
                } else if (
                  opt.id === answer.selectedOption &&
                  answer.isCorrect
                ) {
                  label = "Your answer";
                }
                return (
                  <div key={opt.id} className={`review-option ${optionClass}`}>
                    <div>
                      <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                        {opt.id}
                      </span>
                      {opt.text}
                    </div>
                    {label && <span>{label}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
