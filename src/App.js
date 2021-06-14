import { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthContext from "./store/auth-context";
import "./App.css";
import { authenticate } from "./store/auth-actions";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import TaskPage from "./pages/TaskPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authenticate(dispatch);
    }
  }, [dispatch]);

  return (
    <>
      {" "}
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <PublicRoute
          isAuthenticated={state.token}
          component={LoginPage}
          path="/login"
          exact
        />
        <PublicRoute
          isAuthenticated={state.token}
          component={SignupPage}
          path="/signup"
          exact
        />
        <ProtectedRoute
          isAuthenticated={state.token}
          component={TaskPage}
          path="/tasks"
          exact
        />
        <ProtectedRoute
          isAuthenticated={state.token}
          component={ProfilePage}
          path="/profile"
          exact
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
