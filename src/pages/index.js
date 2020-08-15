import './index.css';
import {initialCards, popupEdit, popupAdd, profileName, profileJob, popupView, profileAddButton, profileEditButton, cardsContainer, popupFormsEdit, popupFormsAdd, formSelectors} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';

const userInfo = new UserInfo(profileName, profileJob);

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(
            item.link, 
            item.name, 
            '.card-template', 
            () => {
                const popupWithImage = new PopupWithImage(popupView);
                popupWithImage.open(item.name, item.link);
            });
        const cardElement = card.generateTemplate();

        return cardElement;
    }
}, cardsContainer);

cardList.renderItems();

const popupEditValidator = new FormValidator(popupFormsEdit, popupEdit, formSelectors);
const popupAddValidator = new FormValidator(popupFormsAdd, popupAdd, formSelectors);

const popupWithFormEdit = new PopupWithForm(
    popupEdit,
    (formInfo) => {
        const item = {
            name: formInfo['user-name'], 
            job: formInfo['user-job']
        }

        userInfo.setUserInfo(item);
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
    
        cardList.addItem(item);
    },
    popupAddValidator
);

profileEditButton.addEventListener('click', () => { 
    popupWithFormEdit.open(userInfo.getUserInfo(), 'user');
});

profileAddButton.addEventListener('click', () => {
    popupWithFormAdd.open();
});