import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._confirmButton = this._popupElement.querySelector(".modal__button");
  }

  // Set action when the user clicks on the confirm delete button
  setAction(action) {
    this._handleDeleteAction = action;
  }

  _handleDeleteEvent = () => {
    this._handleDeleteAction();
  };

  // Set event listener on the form element
  setEventListeners() {
    this._confirmButton.addEventListener("click", this._handleDeleteEvent);
    super.setEventListeners();
  }
}
