import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import './styles/App.scss';
import "./styles/pages/_home.scss";
import "./styles/pages/_quiz.scss";
import "./styles/pages/_results.scss";
import "./styles/pages/_create-quiz-page.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/results/:quizId" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;