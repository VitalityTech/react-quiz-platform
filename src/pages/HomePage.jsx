import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const defaultQuizzes = [
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your knowledge on various topics!",
    questions: 5,
    time: "60s",
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Science & Nature",
    description: "Explore the wonders of science and nature!",
    questions: 4,
    time: "90s",
    difficulty: "Hard",
  },
  {
    id: 3,
    title: "Pop Culture",
    description: "How well do you know movies, music, and more?",
    questions: 3,
    time: "45s",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "World History",
    description: "From ancient empires to modern events - test your timeline!",
    questions: 5,
    time: "80s",
    difficulty: "Medium",
  },
  {
    id: 5,
    title: "Technology",
    description: "Programming, gadgets, and internet culture questions.",
    questions: 5,
    time: "75s",
    difficulty: "Medium",
  },
  {
    id: 6,
    title: "Geography Challenge",
    description: "Capitals, landmarks, and maps from around the world.",
    questions: 4,
    time: "70s",
    difficulty: "Easy",
  },
  {
    id: 7,
    title: "React Fundamentals",
    description: "JSX, components, props, state, and rendering basics.",
    questions: 5,
    time: "80s",
    difficulty: "Medium",
  },
  {
    id: 8,
    title: "React Hooks",
    description: "useState, useEffect, useMemo, useCallback, and refs.",
    questions: 5,
    time: "95s",
    difficulty: "Hard",
  },
  {
    id: 9,
    title: "JavaScript Essentials",
    description: "Closures, scope, promises, async/await, and array methods.",
    questions: 5,
    time: "85s",
    difficulty: "Medium",
  },
  {
    id: 10,
    title: "Algorithms & Data Structures",
    description: "Big O, sorting, searching, stacks, queues, and trees.",
    questions: 5,
    time: "100s",
    difficulty: "Hard",
  },
  {
    id: 11,
    title: "Backend & APIs",
    description: "REST, HTTP status codes, JWT, caching, and middleware.",
    questions: 5,
    time: "90s",
    difficulty: "Medium",
  },
  {
    id: 12,
    title: "Databases & SQL",
    description: "Indexes, joins, normalization, transactions, and ACID.",
    questions: 5,
    time: "90s",
    difficulty: "Hard",
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
    difficulty: q.difficulty || "Medium",
  }));

const cleanDeletedRaw = () => {
  try {
    const raw = localStorage.getItem("deletedQuizIds");
    if (!raw) return new Set();
    const arr = JSON.parse(raw) || [];
    const defaultIds = new Set(defaultQuizzes.map((d) => String(d.id)));
    const filtered = arr.filter((id) => !defaultIds.has(String(id)));
    if (filtered.length !== arr.length) {
      try {
        localStorage.setItem("deletedQuizIds", JSON.stringify(filtered));
      } catch {
        // ignore write errors
      }
    }
    return new Set(filtered.map(String));
  } catch {
    return new Set();
  }
};

const HomePage = () => {
  const [quizzes, setQuizzes] = useState(() => {
    let deleted = new Set();
    try {
      deleted = cleanDeletedRaw();

      const stored = localStorage.getItem("quizzes");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const normalized = normalizeStored(parsed).filter(
            (q) => !deleted.has(String(q.id)),
          );
          const storedIds = new Set(normalized.map((q) => String(q.id)));
          const merged = [
            ...normalized,
            ...defaultQuizzes.filter(
              (d) => !storedIds.has(String(d.id)) && !deleted.has(String(d.id)),
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
        const deleted = cleanDeletedRaw();

        const stored = localStorage.getItem("quizzes");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const normalized = normalizeStored(parsed).filter(
              (q) => !deleted.has(String(q.id)),
            );
            const storedIds = new Set(normalized.map((q) => String(q.id)));
            const merged = [
              ...normalized,
              ...defaultQuizzes.filter(
                (d) =>
                  !storedIds.has(String(d.id)) && !deleted.has(String(d.id)),
              ),
            ];
            setQuizzes(merged);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to update quizzes from storage event:", err);
      }
      const deleted = cleanDeletedRaw();
      setQuizzes(defaultQuizzes.filter((d) => !deleted.has(String(d.id))));
    };

    const handleStorage = (e) => {
      if (!e.key || (e.key !== "quizzes" && e.key !== "deletedQuizIds")) return;
      reloadFromStorage();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const [favorites, setFavorites] = useState(() => {
    try {
      const fav = localStorage.getItem("favoriteQuizzes");
      return new Set(fav ? JSON.parse(fav) : []);
    } catch {
      return new Set();
    }
  });

  const handleDelete = (id) => {
    try {
      const isDefault = defaultQuizzes.some((d) => String(d.id) === String(id));
      if (isDefault) {
        setQuizzes((prev) => prev.filter((p) => String(p.id) !== String(id)));
        return;
      }

      const storedRaw = localStorage.getItem("quizzes");
      const list = storedRaw ? JSON.parse(storedRaw) : [];
      const filtered = list.filter((q) => String(q.id) !== String(id));
      localStorage.setItem("quizzes", JSON.stringify(filtered));

      const deletedRaw = localStorage.getItem("deletedQuizIds");
      const deletedArr = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deletedArr.map(String).includes(String(id))) {
        deletedArr.push(id);
        localStorage.setItem("deletedQuizIds", JSON.stringify(deletedArr));
      }

      setQuizzes((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(String(id))) {
      newFavorites.delete(String(id));
    } else {
      newFavorites.add(String(id));
    }
    setFavorites(newFavorites);
    localStorage.setItem(
      "favoriteQuizzes",
      JSON.stringify(Array.from(newFavorites)),
    );
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero__title">Welcome to PickMe Quizzes!</h1>
        <p className="hero__subtitle">
          Challenge yourself with our exciting quizzes or create your own to
          share with friends!
        </p>
      </section>

      <section className="quiz-grid">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className={
              "quiz-card" +
              (quiz.description && quiz.description.length > 100
                ? " quiz-card--long"
                : "")
            }
          >
            <div className="quiz-card__header">
              <h2 className="quiz-card__title">{quiz.title}</h2>
              <button
                className="quiz-card__favorite"
                onClick={() => toggleFavorite(quiz.id)}
                aria-label="Add to favorites"
              >
                {favorites.has(String(quiz.id)) ? "★" : "☆"}
              </button>
            </div>

            <div className="quiz-card__difficulty">
              <span
                className={`difficulty-badge difficulty-badge--${
                  quiz.difficulty?.toLowerCase() || "medium"
                }`}
              >
                {quiz.difficulty || "Medium"}
              </span>
            </div>

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
    </div>
  );
};

export default HomePage;
