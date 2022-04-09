import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import StudentLogin from "./pages/login/StudentLogin/StudentLogin";
import { StudentForm } from "./pages/StudentForm";
import { Portals } from "./pages/Portals";
import ProtectedRoute from "./ProtectedRoutes";
import NoteState from "./RootContext/NoteState";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <NoteState>
      <div className={darkMode ? "app dark" : "app"}>
        {/* <BrowserRouter>
      
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
     
      </BrowserRouter> */}
        <Router>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/studentlogin">
              <StudentLogin />
            </Route>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
            <ProtectedRoute exact path="/staff">
              <List />
            </ProtectedRoute>
            <ProtectedRoute exact path="/studentform">
              <StudentForm />
            </ProtectedRoute>
            <ProtectedRoute exact path="/insitutes">
              <Portals />
            </ProtectedRoute>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </NoteState>
  );
}

export default App;
