import headerLogo from '../images/logo.svg';
import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({
      //email: '',
      //password: ''
    });
  }

  return (
    <Register>
      <>
      <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип"/>
        <Link to="/sign-in" className="header__button" ><p className="header__text">Регистрация</p></Link>
      </header>
      <div className='auth'>
        <section className='auth__form'>
          <h1 className="auth__title">Войти</h1>
          <form onSubmit={handleSubmit} className="auth__form">
            <fieldset className="auth__info">
              <input value={email} onChange={handleEmailChange} id="email-input" className="auth__input auth__input_type_email"  type="text" placeholder="Email" name='email' required />
              <input value={password} onChange={handlePasswordChange} id="password-input" className="auth__input auth__input_type_password" type="text" placeholder="Пароль" name="password" required/>
            </fieldset>
            <button className="auth__submit-button auth__submit-button_type_submit" type="submit">Зарегистрироваться</button>
          </form>
          <h2 className="auth__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="auth__subtitle">Войти</Link></h2>
        </section>
      </div>
      </>
    </Register>
  )
}

export default withRouter(Register);