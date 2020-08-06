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


// Находим профиль
const profileHeading = document.querySelector('.profile__heading');
const profileCaption = document.querySelector('.profile__caption');
const profileEditBtn = document.querySelector('.profile__edit-button');

// Находим попап профиля, и форму
const popupProfile = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('#profile-form');
const nameInput = document.querySelector('#fullname');
const jobInput = document.querySelector('#profession');
const profileCloseBtn = document.querySelector('#close-profile');

// Находим попап создания карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('#new-card-form');
const cardTitleInput = document.querySelector('#card-title');
const cardLinkInput = document.querySelector('#card-link');
const newCardSubmitBtn = popupNewCard.querySelector('.popup__button')
const newCardCloseBtn = document.querySelector('#close-new-card');

// Находим кнопку создания карточки
const newCardBtn = document.querySelector('.profile__add-button');

// Находим попап полноэкранного просмотра фото карточек
const popupFullscreen = document.querySelector('.popup_fullscreen');
const fullscreenHeading = document.querySelector('.fullscreen__heading');
const fullscreenPic = document.getElementById('fullscreen-pic');
const fullscreenCloseBtn = document.querySelector('#close-fullscreen');

// Находим контейнер для карточек темплейт
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

// Находим выход
const ESC_KEY = 'Escape';


// Создаем функцию открытия попапа
const openModalWindow = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscUp);
};

// Создаем функцию закрытия попапа
const closeModalWindow = (modal) => {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscUp);
};

// Создаем функцию закрытия по кнопке Esc
const handleEscUp = (evt) => {
    if (evt.key === ESC_KEY) {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
}


// Профиль
// Создаем функцию отправки данных из формы в профиль
function formSubmitProfileHandler (evt) {
    evt.preventDefault();
    profileHeading.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    closeModalWindow(popupProfile);
}


// Новая карточка
// Создаем функцию отправки данных из формы в новую карточку
function formSubmitNewCardHandler (evt) {
    evt.preventDefault();
    renderCardPrepend(cardTitleInput.value, cardLinkInput.value);
    closeModalWindow(popupNewCard);
    cardTitleInput.value = '';
    cardLinkInput.value = '';
    newCardSubmitBtn.classList.add('popup__button_disabled');
    newCardSubmitBtn.disabled = true;
}


// Карточки
// Задаем исходное состояние карточек при загрузке страницы
initialCards.forEach(item => renderCardAppend(item.name, item.link));

// Обозначем сбор конкретных данных
const handleOpenImgPopup = (titleValue, imgValue) => {
    fullscreenHeading.textContent = titleValue;
    fullscreenPic.src = imgValue;
    openModalWindow(popupFullscreen);
};

// Создаем функции переключателей для кнопок лайка и удаления карточки
function handleCardLike(evt) {
    evt.target.classList.toggle('element__btn-like_active');
}

function handleCardDelete(evt) {
    evt.target.closest('.element').remove();
}

// Создаем функцию создания карточки
function addCard(titleValue, imgValue) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardIconLike = cardElement.querySelector('.element__btn-like');
    const cardPic = cardElement.getElementById('card-pic');
    const cardDelete = cardElement.querySelector('.element__btn-delete');

    cardElement.querySelector('.element__heading').textContent = titleValue;
    cardPic.src = imgValue;
    cardPic.alt = titleValue;
    cardPic.addEventListener('click', () => handleOpenImgPopup(titleValue, imgValue));

    fullscreenCloseBtn.addEventListener('click', () => closeModalWindow(popupFullscreen));
    popupFullscreen.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
            closeModalWindow(popupFullscreen);
        }
    });
    
    cardIconLike.addEventListener('click', handleCardLike);
    
    cardDelete.addEventListener('click', handleCardDelete);

    return cardElement;
}

// Создаем функцию рендера карточек
function renderCardAppend(titleValue, imgValue) {
    cardsContainer.append(addCard(titleValue, imgValue));
};

function renderCardPrepend(titleValue, imgValue) {
    cardsContainer.prepend(addCard(titleValue, imgValue));
};


// Добавляем слушатель отправки данных из формы в профиль
profileForm.addEventListener('submit', formSubmitProfileHandler);

// Добавляем слушатель кнопки редактирования профиля
profileEditBtn.addEventListener('click', () => {
    nameInput.value = profileHeading.textContent;
    jobInput.value = profileCaption.textContent;
    openModalWindow(popupProfile);
});

// Добавляем слушатель кнопке закрытия профиля
profileCloseBtn.addEventListener('click', () => closeModalWindow(popupProfile));

// Добавляем слушатель попапу для закрытия профиля
popupProfile.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
        closeModalWindow(popupProfile);
    }
});

// Добавляем слушатель отправкм данных из формы в новую карточку
newCardForm.addEventListener('submit', formSubmitNewCardHandler);

// Добавляем слушатель кнопке создания новой карточки
newCardBtn.addEventListener('click', () => openModalWindow(popupNewCard));

// Добавляем слушатель кнопке закрытия новой карточки
newCardCloseBtn.addEventListener('click', () => closeModalWindow(popupNewCard));

// Добавляем слушатель попапу для закрытия новой карточки
popupNewCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
        closeModalWindow(popupNewCard);
    }
});