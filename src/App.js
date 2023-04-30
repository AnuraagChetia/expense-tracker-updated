import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import User from "./Components/Profile/User";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-reducer";
function App() {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("verify")) {
        dispatch(authActions.verify());
      }
      if (localStorage.getItem("displayName")) {
        setDisplayName(localStorage.getItem("displayName"));
        if (localStorage.getItem("photoUrl")) {
          setPhotoUrl(localStorage.getItem("photoUrl"));
          dispatch(authActions.complete());
        }
      }
    }
  }, [dispatch]);

  const profileCompleteHandler = (name, photo) => {
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
          <Route path="/home" element={<Home></Home>} />
          <Route
            path="/user"
            element={
              <User displayName={displayName} photoUrl={photoUrl}></User>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
