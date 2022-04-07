// places list
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements__list');


// popups
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupZoomImage = popupImage.querySelector('.popup__zoom-image');
const popupZoomImageCaption = popupImage.querySelector('.popup__image-caption');

// buttons
const openedEditPopup = document.querySelector('.profile__edit-button');
const openedAddPopup = document.querySelector('.profile__add-button');
const closedEditPopup = popupEdit.querySelector('.popup__close-button_type_edit');
const closedAddPopup = popupAdd.querySelector('.popup__close-button_type_add');
const closedImagePopup = popupImage.querySelector('.popup__close-button_type_image');

// profile data
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// popup form data
const forms = document.querySelectorAll('.popup__form');
const popupEditForm = popupEdit.querySelector('.popup__form_type_edit');
const popupAddForm = popupAdd.querySelector('.popup__form_type_add');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_job');
const placeInput = popupAddForm.querySelector('.popup__input_type_place');
const placeLinkInput = popupAddForm.querySelector('.popup__input_type_link');



//functions

// toggle any popup
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
};
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
};

// reset form data
const resetFormValue = function() {
  forms.forEach(function(item) {
    item.reset();
  });
};

// close any popup by clicking on empty field
// const closePopupEmptyField = popup.addEventListener('click', function(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(popup);
//   }
// });

// edit popup actions
function submitEditPopupForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupEditForm.addEventListener('submit', submitEditPopupForm);

openedEditPopup.addEventListener('click', openEditPopup);
closedEditPopup.addEventListener('click', function() {
  closePopup(popupEdit);
});

// remove card
const removeCard = function(evt) {
  evt.preventDefault();
  evt.target.closest('.element').remove();
};

// add like
const toggleLike = function(evt) {
  evt.preventDefault();
  evt.target.classList.toggle('element__like-button_active');
};

// zoom image
const zoomImage = function(cardImage) {
  cardImage.addEventListener('click', function() {
    popupZoomImage.src = cardImage.src;
    popupZoomImage.alt = cardImage.alt;
    popupZoomImageCaption.textContent = cardImage.alt;
    openPopup(popupImage);
  });
};

closedImagePopup.addEventListener('click', function() {
  closePopup(popupImage);
});

// card creation
const createCard = function(data) {
  const elementTemplate = document.querySelector('.element-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__trash-button');
  const cardImage = cardElement.querySelector('.element__image');
  const cardImageTitle = cardElement.querySelector('.element__name');

  cardImageTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  likeButton.addEventListener('click', toggleLike);
  deleteButton.addEventListener('click', removeCard);
  zoomImage(cardImage);

  return cardElement;
};

// add new card
const renderCard = function(data, cardsContainer) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
};

// add initial cards
const addInitialCards = function(initialCards) {
  initialCards.forEach(function(card) {
    renderCard({name: card.name, link: card.link}, cardsContainer);
  });
};

addInitialCards(initialCards);

// add popup actions
function submitAddPopupForm (evt) {
  evt.preventDefault();
  renderCard({name: placeInput.value, link: placeLinkInput.value}, cardsContainer);
  closePopup(popupAdd);
  resetFormValue();
}

popupAddForm.addEventListener('submit', submitAddPopupForm);

openedAddPopup.addEventListener('click', function() {
  openPopup(popupAdd);
});
closedAddPopup.addEventListener('click', function() {
  closePopup(popupAdd);
});


