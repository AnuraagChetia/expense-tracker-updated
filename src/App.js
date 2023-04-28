import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import User from "./Components/Profile/User";
import { useEffect, useState } from "react";
function App() {
  const [profileComplete, setProfileComplete] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("displayName")) {
        setDisplayName(localStorage.getItem("displayName"));
        if (localStorage.getItem("photoUrl")) {
          setPhotoUrl(localStorage.getItem("photoUrl"));
          setProfileComplete(true);
        }
      }
    }
  });

  const profileCompleteHandler = (name, photo) => {
    setProfileComplete(true);
    setDisplayName(name);
    setPhotoUrl(photo);
  };
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                profileCompleteCheck={profileCompleteHandler}
              ></LoginPage>
            }
          />
          <Route
            path="/home"
            element={<Home isComplete={profileComplete}></Home>}
          />
          <Route
            path="/user"
            element={
              <User
                isComplete={profileComplete}
                displayName={displayName}
                photoUrl={photoUrl}
              ></User>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
