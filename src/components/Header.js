import React from 'react';
import header__logoPath from '../images/logo/logo-white.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={header__logoPath} alt="логотип заголовка" />
        </header>
    );
}

export default Header