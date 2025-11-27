import { NavLink } from "react-router-dom";
const Header = () => {
  const playSound = () => {
    const audio = new Audio("/homebuttonsound.mp3"); 
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Error playing sound:", e));  
  };
  return (
    <header className="header">
      <div className="header_container">
        <div className="logo_container">
          <button className="logo_button" aria-label="Home" onClick={playSound}>
            
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo_icon"
            >
              <path
                d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                fill="currentColor"
              />
            </svg>
            <h1 className="logo_title">pickme quizzes</h1>
          </button>
        </div>
        <nav className="header_nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header__nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `header__nav-link header__nav-link--button ${
                isActive ? "active" : ""
              }`
            }
          >
            Create Quiz
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
