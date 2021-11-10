import {Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../main-screen/main-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { useSelector } from 'react-redux';
import { SpinnerDotted } from 'spinners-react';
import { CSSProperties } from 'react';
import { getLoadingFlag, getAllOffers } from '../../store/data/selectors';

function App(): JSX.Element {
  const offers = useSelector(getAllOffers);
  const isLoading = useSelector(getLoadingFlag);

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
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainScreen/>
      </Route>
      <Route exact path={AppRoute.Room}>
        <RoomScreen />
      </Route>
      <Route exact path={AppRoute.SignIn}>
        <SignInScreen/>
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.Favorites}
        render={() => <FavoritesScreen offers={offers}/>}
      >
      </PrivateRoute>
      <Route>
        <NotFoundScreen/>
      </Route>
    </Switch>
  );
}

export default App;
