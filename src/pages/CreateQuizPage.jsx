import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.scss";
import "../styles/pages/_create-quiz-page.scss";

const defaultOption = (label) => ({ id: Date.now() + Math.random(), label });

const emptyQuestion = (index = 1) => ({
  id: Date.now() + Math.random(),
  title: `Question ${index}`,
  text: "",
  options: [
    defaultOption("Option A"),
    defaultOption("Option B"),
    defaultOption("Option C"),
    defaultOption("Option D"),
  ],
  correctIndex: 0,
});

const CreateQuizPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);
  const [questions, setQuestions] = useState([emptyQuestion(1)]);
  const navigate = useNavigate();

  function updateQuestion(id, changes) {
    setQuestions((qs) =>
      qs.map((q) => (q.id === id ? { ...q, ...changes } : q))
    );
  }

  function updateOption(questionId, optionId, value) {
    setQuestions((qs) =>
      qs.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          options: q.options.map((o) =>
            o.id === optionId ? { ...o, label: value } : o
          ),
        };
      })
    );
  }

  function addQuestion() {
    setQuestions((qs) => [...qs, emptyQuestion(qs.length + 1)]);
  }

  function removeQuestion(id) {
    setQuestions((qs) => qs.filter((q) => q.id !== id));
  }

  function addOption(questionId) {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                defaultOption(
                  `Option ${String.fromCharCode(65 + q.options.length)}`
                ),
              ],
            }
          : q
      )
    );
  }

  function removeOption(questionId, optionId) {
    setQuestions((qs) =>
      qs.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
          : q
      )
    );
  }

  function setCorrect(questionId, optionIndex) {
    updateQuestion(questionId, { correctIndex: optionIndex });
  }

  function handleSave(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a quiz title");
    if (questions.length === 0) return alert("Add at least one question");

    const payload = {
      title,
      description,
      timeLimit: Number(timeLimit),
      questions,
    };
    // Persist the quiz into `localStorage` under key `quizzes` so the HomePage can render it
    try {
      const stored = localStorage.getItem("quizzes");
      const list = stored ? JSON.parse(stored) : [];
      const newQuiz = {
        id: Date.now(),
        title: payload.title,
        description: payload.description,
        questions: payload.questions,
        timeLimit: payload.timeLimit,
        createdAt: new Date().toISOString(),
      };
      list.unshift(newQuiz);
      localStorage.setItem("quizzes", JSON.stringify(list));
      // also keep last draft (optional)
      localStorage.setItem("lastQuizDraft", JSON.stringify(payload));
      // navigate back to home so user can see the new quiz
      navigate("/");
    } catch (err) {
      console.error("Failed to save quiz to localStorage:", err);
      alert("Failed to save quiz");
    }
  }

  return (
    <main className="create-quiz-page container">
      <h1 className="page-title">Create Your Own Quiz</h1>

      <form onSubmit={handleSave}>
        <section className="card quiz-details">
          <h2>Quiz Details</h2>

          <label className="field">
            <div className="field-label">Quiz Title</div>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title"
            />
          </label>

          <label className="field">
            <div className="field-label">Description</div>
            <textarea
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter quiz description"
            />
          </label>

          <label className="field small">
            <div className="field-label">Time Limit (seconds, optional)</div>
            <input
              className="input"
              type="number"
              min={0}
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </label>
        </section>

        <div className="questions-header">
          <h2>Questions</h2>
          <button
            type="button"
            className="btn add-question"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>

        {questions.map((q, qi) => (
          <section key={q.id} className="card question-card">
            <div className="question-header">
              <h3>{`Question ${qi + 1}`}</h3>
              <div className="question-actions">
                <button
                  type="button"
                  className="btn small"
                  onClick={() => addOption(q.id)}
                >
                  + Option
                </button>
                {questions.length > 1 && (
                  <button
                    type="button"
                    className="btn small ghost"
                    onClick={() => removeQuestion(q.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <label className="field">
              <div className="field-label">Question Text</div>
              <input
                className="input"
                value={q.text}
                onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                placeholder="Enter your question"
              />
            </label>

            <div className="field">
              <div className="field-label">Answer Options</div>
              <div className="options">
                {q.options.map((opt, oi) => (
                  <div key={opt.id} className="option-row">
                    <label className="radio-wrap">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctIndex === oi}
                        onChange={() => setCorrect(q.id, oi)}
                      />
                      <span className="radio-fake" />
                    </label>
                    <input
                      className="input option-input"
                      value={opt.label}
                      onChange={(e) =>
                        updateOption(q.id, opt.id, e.target.value)
                      }
                    />
                    {q.options.length > 2 && (
                      <button
                        type="button"
                        className="btn icon small ghost"
                        onClick={() => removeOption(q.id, opt.id)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="muted">
                Select the radio button next to the correct answer
              </div>
            </div>
          </section>
        ))}

        <div className="form-actions">
          <button type="submit" className="save-btn">
            💾 Save Quiz
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateQuizPage;
