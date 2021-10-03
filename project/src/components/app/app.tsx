import MainScreen from '../main-screen/main-screen';

type AppProps = {
  offersNumber: number;
}

function App({offersNumber}: AppProps): JSX.Element {
  return <MainScreen offersNumber={offersNumber}/>;
}

export default App;
