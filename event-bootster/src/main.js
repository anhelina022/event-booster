const API_KEY = "sZLTEkONZdwYLnajeek3jThvb3vUd2zq";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

const eventsContainer = document.querySelector(".events");

async function getEvents() {
    try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}`);
    const data = await response.json();

    console.log(data);

    const events = data._embedded.events;
    renderEvents(events);
    } catch (error) {
    console.log(error);
    }
}

function renderEvents(events) {
    eventsContainer.innerHTML = "";

const markup = events
    .map(event => {
        return `
        <div class="event-card">
            <img class="event-card__img" src="${event.images[0].url}" alt="${event.name}">
            <h3 class="event-card__title">${event.name}</h3>
            <p class="event-card__date">${event.dates.start.localDate}</p>
            <p class="event-card__place">📍 ${event._embedded.venues[0].name}</p>
        </div>
    `;
    })
    .join("");

    eventsContainer.innerHTML = markup;
}

getEvents();