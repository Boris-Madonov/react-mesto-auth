import React from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Footer from './Footer';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
    const [cardDelete, setCardDelete] = React.useState('')
    const [currentUser, setCurrentUser] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    };

    const handleDeleteCardClick = (card) => {
        setDeleteCardPopupOpen(true);
        setCardDelete(card)
    };

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(false);
        setDeleteCardPopupOpen(false);
        setLoading(false);
    };

    const handleUpdateUser = (newUserInfo) => {
        setLoading(true);
        api.sendUserInfo(newUserInfo)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateAvatar = (newAvatarLink) => {
        setLoading(true);
        api.sendUserAvatar(newAvatarLink)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        const handleLikeCards = (newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        }

        const changeLike = () => {
            if(!isLiked) {
                api.likeCard(card._id)
                    .then((newCard) => {
                        handleLikeCards(newCard);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                api.deleteLikeCard(card._id)
                    .then((newCard) => {
                        handleLikeCards(newCard);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

        changeLike();
    };

    const handleCardDelete = (card) => {
        setLoading(true);
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddPlaceSubmit = (newCard) => {
        setLoading(true);
        api.sendCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return(
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <>
                    <Header />

                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={setSelectedCard}
                        onCardLike={handleCardLike}
                        onDeleteCardClick={handleDeleteCardClick}
                        cards={cards}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}
                    />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={isLoading}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={isLoading}
                    />

                    <DeleteCardPopup
                        card={cardDelete}
                        isOpen={isDeleteCardPopupOpen}
                        onClose={closeAllPopups}
                        onCardDelete={handleCardDelete}
                        isLoading={isLoading}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />

                    <Footer />
                </>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
