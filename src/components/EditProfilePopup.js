import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const user = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about);
    }, [user]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const submitButtonText = isLoading ? 'Сохранение...' : 'Сохранить';

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    };

    return (
        <PopupWithForm 
            name="edit-profile" 
            title="Редактировать профиль"
            submit={submitButtonText}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__form-field">
                <input
                    className="popup__entry-field popup__entry-field_account-name"
                    id="entry-field-account-name"
                    type="text"
                    name="name"
                    placeholder="Введите имя"
                    value={name || ''}
                    onChange={handleChangeName}
                    minLength="2"
                    maxLength="40"
                    required
                />
                <span
                    className="popup__entry-field-error"
                    id="entry-field-account-name-error">
                </span>
            </label>
            <label className="popup__form-field">
                <input
                    className="popup__entry-field popup__entry-field_account-description"
                    id="entry-field-account-description"
                    type="text"
                    name="about"
                    placeholder="Введите описание"
                    value={description || ''}
                    onChange={handleChangeDescription}
                    minLength="2"
                    maxLength="200"
                    required
                />
                <span
                    className="popup__entry-field-error"
                    id="entry-field-account-description-error">
                </span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup
