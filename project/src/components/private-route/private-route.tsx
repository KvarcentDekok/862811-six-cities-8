import { useSelector } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute} from '../../const';
import { getLoggedInFlag } from '../../store/user/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element
}

function PrivateRoute({exact, path, render}: PrivateRouteProps): JSX.Element {
  const isLoggedIn = useSelector(getLoggedInFlag);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        isLoggedIn
          ? render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />
  );
}

export default PrivateRoute;
