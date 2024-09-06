export default class FormValidator {
  constructor(options, formEl) {
    this._options = options;
    this._formEl = formEl;
    this._inputEls = [
      ...this._formEl.querySelectorAll(this._options.inputSelector),
    ];
    this._submitButtonEl = this._formEl.querySelector(
      this._options.submitButtonSelector
    );
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(
          this._inputEls,
          this._submitButtonEl,
          this._options
        );
      });
    });
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._options.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._options.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._options.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._options.errorClass);
  }

  _toggleButtonState() {
    let hasInvalidInput = false;

    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        hasInvalidInput = true;
      }
    });

    //Disable Button
    if (hasInvalidInput) {
      this._submitButtonEl.classList.add(this._options.inactiveButtonClass);
      return (this._submitButtonEl.disabled = true);
    }

    //Enable Button
    this._submitButtonEl.classList.remove(this._options.inactiveButtonClass);
    this._submitButtonEl.disabled = false;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  //Called upon submission of a form
  resetValidation() {
    this._toggleButtonState();

    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }
}
