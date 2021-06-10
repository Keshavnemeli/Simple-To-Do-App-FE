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

function App() {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    console.log("mounted");
    if (localStorage.getItem("token")) {
      authenticate(dispatch);
    }
  }, [dispatch]);

  return (
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
    </Switch>
  );
}

export default App;
