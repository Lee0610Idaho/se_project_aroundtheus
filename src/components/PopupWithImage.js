import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imagePhoto = this._popupElement.querySelector(".modal__image");
    this._imageName = this._popupElement.querySelector(".modal__image-name");
    super.setEventListeners();
  }

  open(imageData) {
    this._imagePhoto.src = imageData.link;
    this._imagePhoto.alt = imageData.name;
    this._imageName.textContent = imageData.name;
    super.open();
  }
}
