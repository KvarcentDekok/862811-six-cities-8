import { Link } from 'react-router-dom';
import Header from '../header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray">
      <Header/>

      <div className="container">
        <h1>404. Page not found</h1>
        <Link to="/" className="button">Вернуться на главную</Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
