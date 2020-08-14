import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(title, image) {
        this._popupSelector.querySelector('.popup__photo').src = image; 
        this._popupSelector.querySelector('.popup__photo-caption').textContent = title;
        
        super.open();
    }
}

export {PopupWithImage};