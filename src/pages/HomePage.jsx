import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const defaultQuizzes = [
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

const normalizeStored = (parsed) =>
  parsed.map((q) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    questions: Array.isArray(q.questions)
      ? q.questions.length
      : q.questions || 0,
    time: q.timeLimit ? `${q.timeLimit}s` : q.time || "",
  }));

const HomePage = () => {
  const [quizzes, setQuizzes] = useState(() => {
    let deleted = new Set();
    try {
      const deletedRaw = localStorage.getItem("deletedQuizIds");
      deleted = deletedRaw
        ? new Set(JSON.parse(deletedRaw).map(String))
        : new Set();

      const stored = localStorage.getItem("quizzes");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const normalized = normalizeStored(parsed).filter(
            (q) => !deleted.has(String(q.id))
          );
          // Merge stored quizzes before defaults, avoiding duplicates by id and deleted ids
          const storedIds = new Set(normalized.map((q) => String(q.id)));
          const merged = [
            ...normalized,
            ...defaultQuizzes.filter(
              (d) => !storedIds.has(String(d.id)) && !deleted.has(String(d.id))
            ),
          ];
          return merged;
        }
      }
    } catch (err) {
      console.error("Failed to read quizzes from localStorage:", err);
    }
    return defaultQuizzes.filter((d) => !deleted.has(String(d.id)));
  });

  useEffect(() => {
    const reloadFromStorage = () => {
      try {
        const deletedRaw = localStorage.getItem("deletedQuizIds");
        const deleted = deletedRaw
          ? new Set(JSON.parse(deletedRaw).map(String))
          : new Set();

        const stored = localStorage.getItem("quizzes");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const normalized = normalizeStored(parsed).filter(
              (q) => !deleted.has(String(q.id))
            );
            const storedIds = new Set(normalized.map((q) => String(q.id)));
            const merged = [
              ...normalized,
              ...defaultQuizzes.filter(
                (d) =>
                  !storedIds.has(String(d.id)) && !deleted.has(String(d.id))
              ),
            ];
            setQuizzes(merged);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to update quizzes from storage event:", err);
      }
      // fallback: defaults excluding deleted ids
      try {
        const deletedRaw = localStorage.getItem("deletedQuizIds");
        const deleted = deletedRaw
          ? new Set(JSON.parse(deletedRaw).map(String))
          : new Set();
        setQuizzes(defaultQuizzes.filter((d) => !deleted.has(String(d.id))));
      } catch {
        setQuizzes(defaultQuizzes);
      }
    };

    const handleStorage = (e) => {
      if (!e.key || (e.key !== "quizzes" && e.key !== "deletedQuizIds")) return;
      reloadFromStorage();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleDelete = (id) => {
    try {
      // remove from stored quizzes list
      const storedRaw = localStorage.getItem("quizzes");
      const list = storedRaw ? JSON.parse(storedRaw) : [];
      const filtered = list.filter((q) => String(q.id) !== String(id));
      localStorage.setItem("quizzes", JSON.stringify(filtered));

      // persist deleted id so it won't reappear (even if defaults/drafts exist)
      const deletedRaw = localStorage.getItem("deletedQuizIds");
      const deletedArr = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deletedArr.map(String).includes(String(id))) {
        deletedArr.push(id);
        localStorage.setItem("deletedQuizIds", JSON.stringify(deletedArr));
      }

      // update UI state
      setQuizzes((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  return (
    <div className="home-page container">
      <section className="hero">
        <h1 className="hero__title">Welcome to PickMe Quizzes!</h1>
        <p className="hero__subtitle">
          Challenge yourself with our exciting quizzes or create your own to
          share with friends!
        </p>
      </section>

      <section className="quiz-grid">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <h2 className="quiz-card__title">{quiz.title}</h2>
            <p className="quiz-card__description">{quiz.description}</p>

            <div className="quiz-card__info">
              <div className="quiz-card__meta">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                <svg
                  width="16"
                  height="16"
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
                <span>{quiz.time}</span>
              </div>
            </div>

            <div className="quiz-card__actions">
              <Link to={`/quiz/${quiz.id}`} className="quiz-card__button">
                Start Quiz
              </Link>
              <button
                className="quiz-card__delete"
                onClick={() => handleDelete(quiz.id)}
                aria-label={`Delete ${quiz.title}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* <div className="info">
        <section className="info__text">
          <h3 className="info__title">PickMe Quizzes: Your Online Quiz Platform. By PickMe Interactive.</h3>
        </section>
      </div> */}
    </div>
  );
};

export default HomePage;
