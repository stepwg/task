// функции для слайдеров
const rangeMin = document.querySelector('.rangeMin');
const rangeMax = document.querySelector('.rangeMax');
const sliderMin = document.querySelector('.sliderMin');
const sliderMax = document.querySelector('.sliderMax');
const sliderTrack = document.querySelector('.slider-track');

const minLimit = 0;
const maxLimit = 150;

function updateSliderTrack() {
    let minValue = parseInt(sliderMin.value);
    let maxValue = parseInt(sliderMax.value);
    let minPercent = (minValue / maxLimit) * 100;
    let maxPercent = (maxValue / maxLimit) * 100;

    sliderTrack.style.background = `linear-gradient(to right, #D9D9D9 ${minPercent}%, #3A41FF ${minPercent}%, #3A41FF ${maxPercent}%, #D9D9D9 ${maxPercent}%)`;
}

function updateInputs() {
    rangeMin.value = sliderMin.value;
    rangeMax.value = sliderMax.value;
    updateSliderTrack();
}

function updateSliders() {
    let minValue = parseInt(rangeMin.value) || minLimit;
    let maxValue = parseInt(rangeMax.value) || maxLimit;

    minValue = Math.max(minLimit, Math.min(minValue, maxValue - 1));
    maxValue = Math.min(maxLimit, Math.max(maxValue, minValue + 1));

    rangeMin.value = minValue;
    rangeMax.value = maxValue;
    sliderMin.value = minValue;
    sliderMax.value = maxValue;

    updateSliderTrack();
}

sliderMin.addEventListener('input', updateInputs);
sliderMax.addEventListener('input', updateInputs);
rangeMin.addEventListener('input', updateSliders);
rangeMax.addEventListener('input', updateSliders);

updateSliderTrack();







// селект
const selectBox = document.querySelector(".select-box");
const selectTrigger = document.querySelector(".select-trigger");
const options = document.querySelectorAll(".option");

selectTrigger.addEventListener("click", () => {
    selectBox.classList.toggle("active");
});

options.forEach(option => {
    option.addEventListener("click", () => {
        selectTrigger.querySelector(".select-text").textContent = option.textContent;

        options.forEach(opt => opt.classList.remove("selected"));
        option.classList.add("selected");

        selectBox.classList.remove("active");
    });
});

document.addEventListener("click", (e) => {
    if (!selectBox.contains(e.target)) {
        selectBox.classList.remove("active");
    }
});







// радиоконпки
const radioLabels = document.querySelectorAll('.radio-label');

radioLabels.forEach(label => {
    label.addEventListener('click', () => {
        radioLabels.forEach(label => label.classList.remove('selected'));
        label.classList.add('selected');
    });
});







// инпут имя
const nameInput = document.querySelector(".nameInput");
const nameErrorMessage = document.querySelector(".error-message-name");

nameInput.addEventListener("input", function () {
    const namePattern = /^[A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{2,}$/;

    if (!namePattern.test(nameInput.value)) {
        nameInput.classList.add("error");
        nameErrorMessage.style.opacity = "1";
        nameErrorMessage.style.visibility = "visible";
    } else {
        nameInput.classList.remove("error");
        nameErrorMessage.style.opacity = "0";
        nameErrorMessage.style.visibility = "hidden";
    }
});







// инпут возраст
const ageInput = document.querySelector(".ageInput");
const ageErrorMessage = document.querySelector(".error-message-age");

ageInput.addEventListener("input", function () {
    if (!/^\d+$/.test(ageInput.value)) {
        ageErrorMessage.style.opacity = "1";
        ageErrorMessage.style.visibility = "visible";
        ageInput.classList.add("error");
    } else {
        ageErrorMessage.style.opacity = "0";
        ageErrorMessage.style.visibility = "hidden";
        ageInput.classList.remove("error");
    }
});







// модалка
const form = document.querySelector(".form");
const rangeValue = document.querySelector(".rangeValue");
const selectValue = document.querySelector(".selectValue");
const radioValue = document.querySelector(".radioValue");
const nameValue = document.querySelector(".nameValue");
const ageValue = document.querySelector(".ageValue");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".closeModal");

const agreeCheckbox = document.querySelector(".required-checkbox");
const submitButton = document.querySelector(".button");

function updateSubmitButtonState() {
    submitButton.disabled = !agreeCheckbox.checked;
}

agreeCheckbox.addEventListener("change", updateSubmitButtonState);

function validateForm() {
    const rangeFilled = rangeMin.value && rangeMax.value;
    const selectFilled = selectTrigger.querySelector(".select-text").textContent !== "Выберите...";
    const radioFilled = document.querySelector(".radio-label.selected") !== null;
    const nameFilled = nameInput.value.trim().length > 0;
    const ageFilled = ageInput.value.trim().length > 0;
    const checkboxChecked = agreeCheckbox.checked;

    if (rangeFilled && selectFilled && radioFilled && nameFilled && ageFilled && checkboxChecked) {
        return true;
    } else {
        alert("Заполните все боксы");
        return false;
    }
};

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        rangeValue.textContent = `Диапазон: от ${rangeMin.value} до ${rangeMax.value}`;
        selectValue.textContent = `Выбранный элемент: ${selectTrigger.querySelector(".select-text").textContent}`;
        radioValue.textContent = `Выбранная опция: ${document.querySelector(".radio-label.selected").textContent}`;
        nameValue.textContent = `ФИО: ${nameInput.value}`;
        ageValue.textContent = `Возраст: ${ageInput.value}`;

        modal.style.display = "block";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.position = "fixed";
    }
});

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});

updateSubmitButtonState();