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

const idCardApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-14/cards/', 
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
    cards.forEach((card) => {
        cardList.addItem({
            _id: card._id,
            link: card.link,
            name: card.name,
            likes: card.likes,
            isOwn: card.owner._id === user._id
        }, true)
    })
    userInfo.setUserInfo(user);
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
                    idCardApi.deleteItem(cardToBeDeleted._id)
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
            item.likes,
            item.isOwn);
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
        userApi.changeItem(item)
        .then(item => {
            userInfo.setUserInfo(item);
        })
        .catch((err) => {
            console.log(err);
        })
    }, 
    popupEditValidator
);

const popupWithFormAdd = new PopupWithForm(
    popupAdd,
    (formInfo) => {
        const item = {
            name: formInfo['place-name'], 
            link: formInfo['place-url']
        }
        cardsApi.createItem(item)
        .then((res) => {
            cardList.addItem({
                _id: res._id,
                name: res.name,
                link: res.link,
                likes: res.likes,
                isOwn: res.owner._id === userInfo.getUserInfo().id
            }); 
        })
        .catch((err) => {
            console.log(err);
        })
    },
    popupAddValidator
);

const popupWithFormAvatar = new PopupWithForm(
    popupAvatar,
    (formInfo) => {
        const item = {
            avatar: formInfo['user-avatar']
        }
        userAvatarApi.changeItem(item)
        .then((res) => {
            userInfo.setUserInfo(res);
        })
        .catch((err) => {
            console.log(err);
        })
    },
    popupAvatarValidator
)

profileEditButton.addEventListener('click', () => { 
    popupWithFormEdit.open(userInfo.getUserInfo(), 'user');
});

profileAddButton.addEventListener('click', () => {
    popupWithFormAdd.open();
});

profileAvatarButton.addEventListener('click', () => {
    popupWithFormAvatar.open();
});