let profileEditBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__btn-close');
let popup = document.querySelector('.popup');

function openPopup() {
    popup.classList.add('popup_opened');
    console.log('Открыть форму');
}

function closePopup() {
    popup.classList.remove('popup_opened');
    console.log('Закрыть форму');
}

profileEditBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);