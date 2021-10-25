import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { Review } from '../../types/review';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
import { CSSProperties } from 'react';

type AppProps = {
  reviews: Review[]
}

const mapStateToProps = ({offers, isLoading}: State) => ({
  offers,
  isLoading,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppProps;

function App({offers, reviews, isLoading}: ConnectedComponentProps): JSX.Element {
  if (isLoading) {
    const spinnerStyles: CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    return (
      <SpinnerDotted color='#4481c3' style={spinnerStyles} size={100}/>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <MainScreen/>
        </Route>
        <Route exact path={AppRoute.Room}>
          <RoomScreen offers={offers} reviews={reviews}/>
        </Route>
        <Route exact path={AppRoute.SignIn}>
          <SignInScreen/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <FavoritesScreen offers={offers}/>}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route>
          <NotFoundScreen/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
