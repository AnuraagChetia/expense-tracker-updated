import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import User from "./Components/Profile/User";
function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/user" element={<User></User>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
