import { Link } from "react-router-dom";

export default function Assignments () {
    return (
        <div>
            <input placeholder="Search for Assignments"></input>
            <button>+ Group</button>
            <button>+ Assignment</button>
            <h3>Assignments 40% of Total</h3> <button>+</button>
            <ul>
                <li>
                    <Link to="/Kambaz/Courses/1234/Assignments/123">A1 - ENV + HTML</Link>
                    <br />
                    Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am | <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Assignments/123">A2 - CSS + BOOTSTRAP</Link>
                    <br />
                    Multiple Modules | <strong>Not available until</strong> May 13 at 12:00am | <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Assignments/123">A3 - JAVASCRIPT + REACT</Link>
                    <br />
                    Multiple Modules | <strong>Not available until</strong> May 20 at 12:00am | <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </li>
            </ul>
        </div>
        );
}