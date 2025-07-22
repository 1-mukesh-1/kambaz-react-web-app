import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function TOC() {
  const { pathname } = useLocation();
  return (
    <Nav variant="pills" id="wd-toc">
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab1" id="wd-a1" active={pathname.includes("Lab1")}> Lab 1 </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab2" id="wd-a2" active={pathname.includes("Lab2")}> Lab 2 </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab3" id="wd-a3" active={pathname.includes("Lab3")}> Lab 3 </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz" id="wd-a3"> Kambaz </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link id="wd-github" href="https://github.com/1-mukesh-1/kambaz-react-web-app/tree/a2">My GitHub</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

// import Nav from "react-bootstrap/Nav";
// import { Link } from "react-router-dom";

// export default function TOC() {
//   return (
//     <Nav variant="pills">
//       <Nav.Item>
//         <Nav.Link to="/Labs" as={Link}>Labs</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link to="/Labs/Lab1" as={Link}>Lab 1</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link to="/Labs/Lab2" as={Link} active>Lab 2</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link to="/Labs/Lab3" as={Link}>Lab 3</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link to="/Kambaz" as={Link}>Kambaz</Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link id="wd-github" href="https://github.com/1-mukesh-1/kambaz-react-web-app/tree/a2">My GitHub</Nav.Link>
//       </Nav.Item>
//     </Nav>
//   );
// }
