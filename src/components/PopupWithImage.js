import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector, title, image) {
        super(popupSelector);
        this._title = title; 
        this._image = image;
    }

    open() {
        this._popupSelector.querySelector('.popup__photo').src = this._image; 
        this._popupSelector.querySelector('.popup__photo-caption').textContent = this._title;
        
        super.open();
    }
}

export {PopupWithImage};