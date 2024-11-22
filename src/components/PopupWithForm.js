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

  _handleSubmit = () => {
    this._handleFormSubmit(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  close() {
    this._form.reset();
    super.close();
    this._form.removeEventListener("submit", this._handleSubmit); //Prevent form from submitting twice
  }
}
