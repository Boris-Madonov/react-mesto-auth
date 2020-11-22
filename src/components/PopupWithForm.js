import React from 'react';

function PopupWithForm({ name, title,isOpen, onClose, onSubmit, children, submit }) {
    return(
        <section className={`popup popup__${name} ${isOpen && 'popup_opened'}`}>
            <form 
                className="popup__container" 
                name={`${name}`} 
                action="#" 
                method="GET"
                onSubmit={onSubmit}
                noValidate
            >
                <button 
                    className="popup__close-button" 
                    type="button"
                    onClick={onClose}
                >
                </button>
                <p className="popup__container-name">{`${title}`}</p>
                <fieldset className="popup__container-form">
                    {children}
                    <button 
                        className="popup__submit-button" 
                        type="submit"
                    >{`${submit}`}
                    </button>
                </fieldset>
            </form>
        </section>
    );
}

export default PopupWithForm