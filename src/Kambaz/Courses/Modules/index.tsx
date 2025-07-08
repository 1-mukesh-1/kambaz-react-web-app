export default function Modules() {
    return (
        <div>
            {/* Implement Collapse All button, View Progress button, etc. */}
            <button>Collapse All</button>
            <button>View Progress</button>
            <select id="wd-module-options">
                <option value="Publish_All">Publish All</option>
                <option value="Publish_All">Publish All</option>
            </select>
            <button>+ Module</button>

            <ul id="wd-modules">
                <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                        <li className="wd-lesson">
                            <span className="wd-title">Lecture 1 - Course Introduction, Syllabus, Agenda</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">
                                    <strong>LEARNING OBJECTIVES</strong>
                                    <ul>
                                        <li className="wd-content-item">Introduction to the course</li>
                                        <li className="wd-content-item">Learn what is Web Development</li>
                                    </ul>
                                </li>
                                <li className="wd-content-item">
                                    <strong>READING</strong>
                                    <ul>
                                        <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                                        <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interfaces</li>
                                    </ul>
                                </li>
                                <li className="wd-content-item">
                                    <strong>SLIDES</strong>
                                    <ul>
                                        <li className="wd-content-item">Introduction to Web Development</li>
                                        <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                                        <li className="wd-content-item">Creating a React Application</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="wd-lesson">
                            <span className="wd-title">Lecture 2 - Formatting User Interfaces with HTML</span>
                            <ul className="wd-content">
                                <li className="wd-content-item">
                                    <strong>LEARNING OBJECTIVES</strong>
                                    <ul>
                                        <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                                        <li className="wd-content-item">Deploy the assignment to Netlify</li>
                                    </ul>
                                </li>
                                <li className="wd-content-item">
                                    <strong>SLIDES</strong>
                                    <ul>
                                        <li className="wd-content-item">Introduction to HTML and the DOM</li>
                                        <li className="wd-content-item">Formatting Web content with Headings and Paragraphs</li>
                                        <li className="wd-content-item">Formatting content with Lists and Tables</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                    <ul className="wd-lessons">
                    </ul>
                </li>
                <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                    <ul className="wd-lessons">
                    </ul>
                </li>
            </ul>
        </div>
    );
}

