export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    // Enable Escape to close modal
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    // No need to listen for Escape to close modal
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    //add click event listener to close icon of the popup
    const closeButton = this._popupElement.querySelector(".modal__close");

    closeButton.addEventListener("click", () => {
      this.close();
    });

    // close on overlay click
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}
