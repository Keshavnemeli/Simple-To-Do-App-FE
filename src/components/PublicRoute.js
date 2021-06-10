import { Route, Redirect } from "react-router-dom";
function PublicRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ path: "/" }} />;
        }
      }}
    />
  );
}

export default PublicRoute;
