import { Link } from "react-router-dom";

export default function Assignments() {
    return (
        <div>
            <input placeholder="Search for Assignments"></input>
            <button>+ Group</button>
            <button>+ Assignment</button>
            <h3>Assignments 40% of Total</h3> <button>+</button>
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <Link to="/Kambaz/Courses/1234/Assignments/123">A1 - ENV + HTML</Link>
                    <br />
                    Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </li>
                <li className="wd-assignment-list-item">
                    <Link to="/Kambaz/Courses/1234/Assignments/123">A2 - CSS + BOOTSTRAP</Link>
                    <br />
                    Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </li>
                <li className="wd-assignment-list-item">
                    <Link to="/Kambaz/Courses/1234/Assignments/123">A3 - JAVASCRIPT + REACT</Link>
                    <br />
                    Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </li>
            </ul>

            <h3>Quizes 10% of Total</h3>
            <ul id="wd-quizzes-list">
                <li className="wd-assignment-list-item">
                    <a href="#">Q1 - HTML</a>
                </li>
            </ul>

            <h3>Exams 20% of Total</h3>
            <ul id="wd-exams-list">
                <li className="wd-assignment-list-item">
                    <a href="#">Midterm</a>
                </li>
            </ul>

            <h3>Project 30% of Total</h3>
            <ul id="wd-project-list">
                <li className="wd-assignment-list-item">
                    <a href="#">Project</a>
                </li>
            </ul>
        </div>
    );
}