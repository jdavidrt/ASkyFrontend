import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="toggle-container" onClick={() => setDarkMode(!darkMode)}>
            <div className={`toggle-circle ${darkMode ? "dark" : "light"}`}>
                <FontAwesomeIcon
                    icon={darkMode ? faMoon : faSun}
                    className="toggle-icon"
                />
            </div>
        </div>
    );
};

export default DarkMode;
