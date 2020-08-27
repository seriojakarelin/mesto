import './index.css';
import {popupEdit, popupAdd, profileName, profileJob, popupView, profileAddButton, profileEditButton, cardsContainer, popupFormsEdit, popupFormsAdd, 
formSelectors, popupFormsAvatar, popupAvatar, profileAvatarButton, profileAvatar, popupDelete} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {Api} from '../components/Api.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit';

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);

const userApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me', 
    headers: {
        authorization: '3264da94-6a0d-46bd-9eaf-c8758f7396fd',
        'Content-Type': 'application/json'
    }
});

const userAvatarApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-14/users/me/avatar', 
    headers: {
        authorization: '3264da94-6a0d-46bd-9eaf-c8758f7396fd',
        'Content-Type': 'application/json'
    }
});

const cardsApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-14/cards', 
    headers: {
        authorization: '3264da94-6a0d-46bd-9eaf-c8758f7396fd',
        'Content-Type': 'application/json'
    }
});

const deleteCardApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/', 
    headers: {
        authorization: '3264da94-6a0d-46bd-9eaf-c8758f7396fd',
        'Content-Type': 'application/json'
    }
});

const likeApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/likes/', 
    headers: {
        authorization: '3264da94-6a0d-46bd-9eaf-c8758f7396fd',
        'Content-Type': 'application/json'
    }
});

Promise.all([
    userApi.getItems(),
    cardsApi.getItems()
])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        cards.forEach((card) => {
            cardList.addItem({
                _id: card._id,
                link: card.link,
                name: card.name,
                likes: card.likes,
                isOwn: card.owner._id === user._id,
                hasBeenLiked: card.likes.some((user) => {
                    return user._id == userInfo.getUserInfo().id 
                })
            }, true)
        })
    })
    .catch((err) => {
        console.log(err);
    })

const popupEditValidator = new FormValidator(popupFormsEdit, popupEdit, formSelectors);
const popupAddValidator = new FormValidator(popupFormsAdd, popupAdd, formSelectors);
const popupAvatarValidator = new FormValidator(popupFormsAvatar, popupAvatar, formSelectors);

const popupWithSubmitDelete = new PopupWithSubmit(popupDelete)

const cardList = new Section({
    items: [],
    renderer: (item) => {
        const card = new Card(
            item._id,
            item.link, 
            item.name, 
            '.card-template', 
            () => {
                const popupWithImage = new PopupWithImage(popupView);
                popupWithImage.open(item.name, item.link);
            },
            (cardToBeDeleted) => {
                popupWithSubmitDelete.setSubmitAction(() => {
                    popupWithSubmitDelete.setLoading();
                    deleteCardApi.deleteItem(cardToBeDeleted._id)
                        .then(res => {
                            cardToBeDeleted.trashSubmit();
                            popupWithSubmitDelete.setDefaultButton();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
                popupWithSubmitDelete.open();
            },
            (cardToBeLiked) => {
                if (cardToBeLiked._likes.some((user) => { return user._id == userInfo.getUserInfo().id })) {
                    likeApi.deleteItem(cardToBeLiked._id)
                        .then((res) => {
                            cardToBeLiked.setLikes(res.likes);
                            cardToBeLiked.handleLikeButton();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    likeApi.putItem(cardToBeLiked) 
                        .then((res) => {
                            cardToBeLiked.setLikes(res.likes);
                            cardToBeLiked.handleLikeButton();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            },
            item.likes,
            item.isOwn, 
            item.hasBeenLiked);
        const cardElement = card.generateTemplate();

        return cardElement;
    }
}, cardsContainer);

const popupWithFormEdit = new PopupWithForm(
    popupEdit,
    (formInfo) => {
        const item = {
            name: formInfo['user-name'], 
            about: formInfo['user-job'] 
        }
        return userApi.changeItem(item)
    },
    (res) => {
        userInfo.setUserInfo(res);
    }, 
    popupEditValidator, 
    'Сохранить'
);

const popupWithFormAdd = new PopupWithForm(
    popupAdd,
    (formInfo) => {
        const item = {
            name: formInfo['place-name'], 
            link: formInfo['place-url']
        }
        return cardsApi.createItem(item)
    },
    (res) => {
        cardList.addItem({
            _id: res._id,
            name: res.name,
            link: res.link,
            likes: res.likes,
            isOwn: res.owner._id === userInfo.getUserInfo().id,
            hasBeenLiked: res.likes.some((user) => { 
                return user._id == userInfo.getUserInfo().id 
            })
        })
    },
    popupAddValidator, 
    'Создать'
);

const popupWithFormAvatar = new PopupWithForm(
    popupAvatar,
    (formInfo) => {
        const item = {
            avatar: formInfo['user-avatar']
        }
        return userAvatarApi.changeItem(item)
    },
    (res) => {
        userInfo.setUserInfo(res);
    },
    popupAvatarValidator,
    'Сохранить'
);

profileEditButton.addEventListener('click', () => { 
    popupWithFormEdit.open(userInfo.getUserInfo(), 'user');
});

profileAddButton.addEventListener('click', () => {
    popupWithFormAdd.open();
});

profileAvatarButton.addEventListener('click', () => {
    popupWithFormAvatar.open();
});