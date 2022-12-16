import headerLogo from '../images/logo.svg';
import { Route, Link, Switch } from 'react-router-dom';


function Header(props) { 
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип"/>
      <Switch>
        <Route path="/sign-in">
          <Link to="/sign-up" className='header__button'>
            <p className="header__text">Регистрация</p>
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="sign-in" className='header__button'>
            <p className="header__text">Войти</p>
          </Link>
        </Route>
        <Route path="/">
          <div className="header__container">
            <p className="header__text">{props.email}</p>
            <Link to="sign-in" className='header__button' onClick={props.onSignOut}>
              <p className="header__text">Выйти</p>
            </Link>
          </div>
        </Route>
        </Switch>
    </header>
  )
}
export default Header;