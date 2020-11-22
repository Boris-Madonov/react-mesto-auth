import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeLink = (e) => {
        setLink(e.target.value);
    };

    const submitButtonText = isLoading ? 'Сохранение...' : 'Создать';

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
        setName('');
        setLink('');
    };

    return(
        <PopupWithForm 
            name="new-item"
            title="Новое место"
            submit={submitButtonText}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__form-field">
                <input
                    className="popup__entry-field popup__entry-field_item-name"
                    id="entry-field-item-name"
                    type="text"
                    name="name"
                    placeholder="Название"
                    value={name || ''}
                    onChange={handleChangeName}
                    minLength="1"
                    maxLength="30"
                    required
                />
                <span
                    className="popup__entry-field-error"
                    id="entry-field-item-name-error">
                </span>
            </label>
            <label className="popup__form-field">
                <input
                    className="popup__entry-field popup__entry-field_item-image-url"
                    id="entry-field-item-image-url"
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    value={link || ''}
                    onChange={handleChangeLink}
                    required
                />
                <span
                    className="popup__entry-field-error"
                    id="entry-field-item-image-url-error">
                </span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup