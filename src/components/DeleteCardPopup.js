import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ card, isOpen, onClose, onCardDelete, isLoading }) {

    const submitButtonText = isLoading ? 'Удаление...' : 'Да';

    const handleSubmit = (e) => {
        e.preventDefault();
        onCardDelete(card);
    };

    return(
        <PopupWithForm 
            name="delete-item"
            title="Вы уверены?"
            submit={submitButtonText}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default DeleteCardPopup