import { Route, Redirect } from "react-router-dom";
function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to={{ path: "/" }} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
