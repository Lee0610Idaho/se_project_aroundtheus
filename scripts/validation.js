function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      console.log("input ran");
    });
  });
}

function enableValidation(options) {
  const formEls = Array.from(document.querySelectorAll(options.formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options);
    //look for all inputs in form
    //check for validity for all inputs
    //if input invalid
    //display message
    //else
    //hide message
  });
  console.log(formEls);
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
