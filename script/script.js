// Находим попап
const popup = document.querySelector('.popup');

// Находим профиль кнопки и попап профиля
const profileHeading = document.querySelector('.profile__heading');
const profileCaption = document.querySelector('.profile__caption');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');
const profileCloseBtn = document.querySelector('#close-profile');

// Находим содержание формы профиля
const profileForm = document.querySelector('#profile-container');

// Находим поля профиля для ввода
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#profession')

// новая карточка
const newCardBtn = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardCloseBtn = document.querySelector('#close-new-card');

// Находим поля новой карточки для ввода
const cardTitleInput = document.querySelector('#card-title');
const cardLinkInput = document.querySelector('#card-link');

// Полноэкранный просмотр фото
const popupFullscreen = document.querySelector('.popup_fullscreen');
const fullscreenHeading = document.querySelector('.fullscreen__heading');
const fullscreenPic = document.getElementById('fullscreen-pic');
const fullscreenCloseBtn = document.querySelector('#close-fullscreen');


// Функция открытия и закрытия профиля
function openCloseProfile() {
    if (popupProfile.classList.contains('popup_opened')) {
        popupProfile.classList.remove('popup_opened');
    } else {
        popupProfile.classList.add('popup_opened');
        nameInput.value = profileHeading.textContent;
        jobInput.value = profileCaption.textContent;
    }
}

// Функция открытия и закрытия создания новой карточки
function openCloseNewCard() {
    if (popupNewCard.classList.contains('popup_opened')) {
        popupNewCard.classList.remove('popup_opened');
    } else {
        popupNewCard.classList.add('popup_opened');
    }
}

// Функция открытия и закрытия полноэкранного режима
function openCloseFullscreen() {
    if (popupFullscreen.classList.contains('popup_opened')) {
        popupFullscreen.classList.remove('popup_opened');
    } else {
        popupFullscreen.classList.add('popup_opened');
    }
}


// Функция отправки формы
function formSubmitProfileHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileHeading.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    openCloseProfile();
}

// Присваиваем кнопкам профиля открытие и закрытие
profileEditBtn.addEventListener('click', openCloseProfile);
profileCloseBtn.addEventListener('click', openCloseProfile);

// Присваиваем кнопкам создания карточки открытие и закрытие
newCardBtn.addEventListener('click', openCloseNewCard);
newCardCloseBtn.addEventListener('click', openCloseNewCard);

// Присваиваем кнопку закрытия полноэкранного
fullscreenCloseBtn.addEventListener('click', openCloseFullscreen);

// Кнопка отпраки формы
profileForm.addEventListener('submit', formSubmitProfileHandler);




// Создаем массив для карточек
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

// Находим содержание формы профиля
const newCardForm = document.querySelector('#new-card-container');

// Находим контейнер для карточек
const cardsContainer = document.querySelector('.elements');

// Задаем исходное состояние карточек при загрузке страницы
initialCards.map(item => addCard(item.name, item.link));

// Функция добавления карточки
function addCard(titleValue, imgValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__heading').textContent = titleValue;
  cardElement.getElementById('card-pic').src = imgValue;

  cardElement.getElementById('card-pic').addEventListener('click', openCloseFullscreen);

  cardElement.querySelector('.element__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__btn-like_active');
  });
  cardElement.querySelector('.element__btn-delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();

  });
  cardsContainer.prepend(cardElement);
}


// Функция отправки карточки
function formSubmitNewCardHandler (evt) {
  evt.preventDefault();
  addCard(cardTitleInput.value, cardLinkInput.value);
  openCloseNewCard();
  cardTitleInput.value = '';
  cardLinkInput.value = '';
}

// Кнопка отпраки формы
newCardForm.addEventListener('submit', formSubmitNewCardHandler);