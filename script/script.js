// Находим профиль, опредлеяем кнопки редактирования и закрытия, находим попап и элементы ввода
let profileHeading = document.querySelector('.profile__heading');
let profileCaption = document.querySelector('.profile__caption');
let profileEditBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__btn-close');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('#fullname');
let jobInput = document.querySelector('#profession');

// Функция открытия и закрытия попапа
function openClosePopup() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    } else {
        popup.classList.add('popup_opened');
        nameInput.value = profileHeading.textContent;
        jobInput.value = profileCaption.textContent;
    }
}

// Функция отправки формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileHeading.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    openClosePopup();
}

// Присваеваем функции открытия, закрытия и отправки кнопкам 
profileEditBtn.addEventListener('click', openClosePopup);
popupCloseBtn.addEventListener('click', openClosePopup);
formElement.addEventListener('submit', formSubmitHandler);