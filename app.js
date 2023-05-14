const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const conditionField = document.querySelector(".weather3 span");

const searchField = document.querySelector(".search");
const form = document.querySelector("form");

form.addEventListener("submit", search);

let target = "new delhi";

const fetchData = async (target) => {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=fa8bda9977844962a4b184159232704&q=${target}`
        );

        const data = await response.json();

        console.log(data);

        const {
            current: {
                temp_c,
                condition: { icon, text },
            },
            location: { name, localtime },
        } = data;

        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        alert("Location not found");
    }
};

fetchData(target);

function updateDom(temp, city, time, emoji, condition) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getFunctionDay(new Date(exactDate).getDay());

    tempField.innerHTML = temp;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
    emojiField.src = emoji;
    conditionField.innerText = condition;
}

function search(e) {
    e.preventDefault();
    target = searchField.value;

    fetchData(target);
    searchField.value = "";
}

function getFunctionDay(num) {
    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturdat";

        default:
            return "Don't Know";
    }
}
