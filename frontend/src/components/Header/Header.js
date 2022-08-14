import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
function Header(props) {

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  // const for hamburger-button
  const burgerMenuButtonClassName = `header__burger-button ${isBurgerMenuOpen ? 'header__burger-button_close' : 'header__burger-button'}`;

  //const for hamburger-menu
  const burgerMenuClassName = `header__burger-menu ${isBurgerMenuOpen && "header__burger-menu_active"}`

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <header className="header">
      {props.loggedIn ? (
        <>
          <div className="header__header">
            <div className="logo__wrapper">
              <p className="logo">Around</p>
              <p className="logo__text">the World</p>
            </div>
            {/* <img src={logo} alt="logo" className="logo" /> */}
            <button className={burgerMenuButtonClassName} onClick={toggleBurgerMenu}></button>
          </div>
          <nav className={burgerMenuClassName}>
            <p className="header__email">{props.email}</p>
            <Link onClick={props.onSignOut} to="/sign-in" className="header__link">Log out</Link>
          </nav>
        </>
      ) : (
        <>
          <div className="header__header">
            <img src={logo} alt="logo" className="logo" />
            {/* <img src={logo} alt="logo" className="logo" /> */}
            {props.children}
          </div>
        </>
      )}
    </header>
  );
}

export default Header;