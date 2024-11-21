import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = this._popupElement.querySelectorAll("input");
    this._form = this._popupElement.querySelector(".modal__form");
  }

  _getInputValues() {
    const inputsObject = {};

    this._formInputs.forEach((input) => {
      inputsObject[input.name] = input.value;
    });

    return inputsObject;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
