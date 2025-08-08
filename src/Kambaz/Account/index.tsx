import AccountNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import Signin from "./Signin";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route
                path="/"
                element={
                  currentUser ? (
                    <Navigate to="/Kambaz/Account/Profile" />
                  ) : (
                    <Navigate to="/Kambaz/Account/Signin" />
                  )
                }
              />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
