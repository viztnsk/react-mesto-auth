import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';


function Header(props) { 
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип"/>
      <p className={'header__email ' + (props.loggedIn ? 'header__email_shown' : '')} >
        </p>
      <Link to="/sign-up" className={`header__button `+ (!props.loggedIn ? " header__button_shown" : "")}>
        <p className="header__text">{props.registered ? 'Регистрация' : 'Войти'}</p>
      </Link>
      <Link to="sign-in" className={`header__button `+ (props.loggedIn ? " header__button_shown" : "")}></Link>
    </header>
  )
}
export default Header;