const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardCloseButton = addCardModal.querySelector(".modal__close");
//Forms
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector("#add-card-form");
//Form Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector(".modal__field_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__field_type_url");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* Function Code to close modal popup */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

//Function to open Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

/* Function to handle the submit button*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}
/* Function to handle the add card save button*/
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
}

/*Create a Card based off template and data */
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const cardImage = cardElement.querySelector(".cards__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

/* Open Profile Modal Form*/
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

/*Close Edit Profile Modal Form*/
profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

/*Open Add Card Modal Form */
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

/*Close Add Card Modal Form */
addNewCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

/*Submit Edit Profile Modal Form */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/*Edit Add Card Save Button */
addCardForm.addEventListener("submit", handleAddCardSubmit);

// initialCards.forEach((cardData) => {
//   //const cardElement = getCardElement(cardData);
//   // cardListEl.prepend(cardElement);
//   renderCard(cardData, cardListEl);
// });

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
