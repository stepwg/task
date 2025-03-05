const rangeMin = document.getElementById('rangeMin');
const rangeMax = document.getElementById('rangeMax');
const sliderMin = document.getElementById('sliderMin');
const sliderMax = document.getElementById('sliderMax');
const sliderTrack = document.querySelector('.slider-track');

const minLimit = 0;
const maxLimit = 150;

// слайдер функции
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

sliderMin.addEventListener('input', function () {
    if (parseInt(sliderMin.value) >= parseInt(sliderMax.value)) {
        sliderMin.value = parseInt(sliderMax.value) - 1;
    }
    updateInputs();
});

sliderMax.addEventListener('input', function () {
    if (parseInt(sliderMax.value) <= parseInt(sliderMin.value)) {
        sliderMax.value = parseInt(sliderMin.value) + 1;
    }
    updateInputs();
});

rangeMin.addEventListener('input', updateSliders);
rangeMax.addEventListener('input', updateSliders);

updateSliderTrack();




// селект функции
const selectBox = document.querySelector(".select-box");
const selectElement = document.getElementById("numberSelect");

selectElement.addEventListener("focus", () => {
    selectBox.classList.add("active");
});
selectElement.addEventListener("blur", () => {
    selectBox.classList.remove("active");
});
selectElement.addEventListener("change", () => {
    selectElement.blur();
});




// радиокнопки
const radioButtons = document.querySelectorAll('.radio-input');
const radioLabels = document.querySelectorAll('.radio-label');

radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', (event) => {
        radioLabels.forEach(label => label.classList.remove('selected'));
        event.target.closest('label').classList.add('selected');
    });
});




// инпут имя
document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name");
    const errorMessage = document.getElementById("error-message-name");

    nameInput.addEventListener("input", function () {
        const namePattern = /^[A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{2,}$/;
        
        if (!namePattern.test(nameInput.value)) {
            nameInput.classList.add("error");
            errorMessage.style.opacity = "1";
            errorMessage.style.visibility = "visible";
        } else {
            nameInput.classList.remove("error");
            errorMessage.style.opacity = "0";
            errorMessage.style.visibility = "hidden";
        }
    });
});




// инпут возраст
document.addEventListener("DOMContentLoaded", function () {
    const ageInput = document.getElementById("age");
    const errorMessage = document.getElementById("error-message-age");

    ageInput.addEventListener("input", function () {
        const ageValue = ageInput.value;

        if (!/^\d+$/.test(ageValue)) {
            errorMessage.style.opacity = "1";
            errorMessage.style.visibility = "visible";
            ageInput.classList.add("error");
        } else {
            errorMessage.style.opacity = "0";
            errorMessage.style.visibility = "hidden";
            ageInput.classList.remove("error");
        }
    });
});












// чекбоксы
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const checkboxes = document.querySelectorAll(".checkbox-input:checked");
    const checkedCount = checkboxes.length;

    const checkboxElement = document.getElementById("checkboxValue");
    if (checkboxElement) {
        checkboxElement.textContent = `Выбрано чекбоксов: ${checkedCount}`;
    } else {
        console.error("Элемент #checkboxValue не найден! Проверьте HTML.");
    }

    document.getElementById("modal").style.display = "block";
});
    




// Подвал
document.getElementById("currentYear").textContent = new Date().getFullYear();




// модальное окно
document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("myForm");
const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const sliderMin = document.getElementById("sliderMin");
const sliderMax = document.getElementById("sliderMax");
const select = document.getElementById("numberSelect");
const radioButtons = document.querySelectorAll("input[name='option']");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const rangeValue = document.getElementById("rangeValue");
const selectValue = document.getElementById("selectValue");
const radioValue = document.getElementById("radioValue");
const nameValue = document.getElementById("nameValue");
const ageValue = document.getElementById("ageValue");
const checkboxValue = document.getElementById("checkboxValue");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", function (e) {
e.preventDefault();

const selectedRangeMin = rangeMin.value || sliderMin.value;
const selectedRangeMax = rangeMax.value || sliderMax.value;
const selectedOption = select.value || "Не выбран";
const selectedRadio = Array.from(radioButtons).find(radio => radio.checked)?.value || "Не выбрано";
const name = nameInput.value;
const age = ageInput.value;

rangeValue.textContent = `Диапазон: от ${selectedRangeMin} до ${selectedRangeMax}`;
selectValue.textContent = `Select: ${selectedOption}`;
radioValue.textContent = `Radio: ${selectedRadio}`;
nameValue.textContent = `ФИО: ${name}`;
ageValue.textContent = `Возраст: ${age}`; 


modal.style.display = "block";
});

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        modal.style.display = "none";
    }
});
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const form = document.getElementById("myForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        modal.classList.add("show");
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
});