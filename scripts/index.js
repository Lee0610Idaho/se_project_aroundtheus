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

//Profile Edit Modal
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
//Profile Title and Description Data
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Add Card Modal
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardCloseButton = addCardModal.querySelector(".modal__close");

//Preview Picture Modal
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageCloseButton = cardImageModal.querySelector(".modal__close");
const cardImagePhoto = cardImageModal.querySelector(".modal__image");
const cardImageName = cardImageModal.querySelector(".modal__image-name");

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

//Card List Element and Card Template
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Function Code to close an inputted modal
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

//Function to open Modal
function openModal(modal) {
  modal.classList.add("modal_opened");
}

// Function to handle the submit button of Edit Profile
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
// Function to take inputted card data to generate new card
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  closePopup(addCardModal);
}

//Helper function to generate a Card based off template and data
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => renderCardImageModal(data));

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  return cardElement;
}

//Function to render the Image and title of the place
function renderCardImageModal(data) {
  cardImagePhoto.src = data.link;
  cardImagePhoto.alt = data.name;
  cardImageName.textContent = data.name;
  openModal(cardImageModal);
}

// Function to display cards on screen
function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

//Event Listeners
// Open Profile Modal Form
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

//Close Edit Profile Modal Form
profileCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

//Open Add Card Modal Form
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

//Close Add Card Modal Form
addNewCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

//Submit Edit Profile Modal Form
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Edit Add Card Save Button
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//Close Card Image Modal
cardImageCloseButton.addEventListener("click", () =>
  closePopup(cardImageModal)
);
