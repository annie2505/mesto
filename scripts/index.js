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

// popups
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

// popups open buttons
const openedEditPopup = document.querySelector('.profile__edit-button');
const openedAddPopup = document.querySelector('.profile__add-button');

// popups close buttons
const closedEditPopup = popupEdit.querySelector('.popup__close-button_edit');
const closedAddPopup = popupAdd.querySelector('.popup__close-button_add');
const closedImagePopup = popupImage.querySelector('.popup__close-button_image');

// profile data
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// popup form data
const forms = document.querySelectorAll('.popup__form');
const popupEditForm = popupEdit.querySelector('.popup__form_edit');
const popupAddForm = popupAdd.querySelector('.popup__form_add');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput = popupEditForm.querySelector('.popup__input_type_job');
const placeInput = popupAddForm.querySelector('.popup__input_type_place');
const placeLinkInput = popupAddForm.querySelector('.popup__input_type_link');



// add cards from list
const initialCardsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('.element-template').content;


function renderInitialCards(item) {
  const initialCardsElement = elementTemplate.cloneNode(true);

  initialCardsElement.querySelector('.element__name').textContent = item.name;
  initialCardsElement.querySelector('.element__image').style.backgroundImage = 'url(' + item.link + ')';

  initialCardsList.prepend(initialCardsElement);
}


// toggle any popup
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
};
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
};

// edit popup actions
function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

openedEditPopup.addEventListener('click', openEditPopup);
closedEditPopup.addEventListener('click', function() {
  closePopup(popupEdit);
});

function submitEditPopupForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

popupEditForm.addEventListener('submit', submitEditPopupForm);

// close any popup by clicking on empty field
// popup.addEventListener('click', function(event) {
//  if (event.target === event.currentTarget) {
//    togglePopup();
//  }
//});


// add popup actions
openedAddPopup.addEventListener('click', function() {
  openPopup(popupAdd);
});
closedAddPopup.addEventListener('click', function() {
  closePopup(popupAdd);
});

const resetFormValue = function() {
  forms.forEach(function(item) {
    item.reset();
  });
};


// add card
function addNewCard (evt) {
    evt.preventDefault();
    elementTemplate.querySelector('.element__name').textContent = placeInput.value;
    elementTemplate.querySelector('.element__image').style.backgroundImage = 'url(' + placeLinkInput.value + ')';
    renderInitialCards({
      name: placeInput.value,
      link: placeLinkInput.value
    });

    closePopup(popupAdd);
    resetFormValue();
}


popupAddForm.addEventListener('submit', addNewCard);

initialCards.map(renderInitialCards);
