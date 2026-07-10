const API_KEY = "sZLTEkONZdwYLnajeek3jThvb3vUd2zq";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

const eventsContainer = document.querySelector(".events");

let events = [];

async function getEvents() {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}`);
    const data = await response.json();

    events = data._embedded.events;
    renderEvents(events);
  } catch (error) {
    console.log(error);
  }
}

function renderEvents(events) {
  eventsContainer.innerHTML = "";

  const markup = events
    .map((event) => {
      return `
        <div class="event-card" data-id="${event.id}">
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

const backdrop = document.querySelector(".backdrop");
const modalContent = document.querySelector(".modal__content");
const closeBtn = document.querySelector(".modal__close");

eventsContainer.addEventListener("click", (event) => {
    const card = event.target.closest(".event-card");

if (!card) return;

const eventId = card.dataset.id;
const currentEvent = events.find((item) => item.id === eventId);

modalContent.innerHTML = `
    <div class="modal__div-logo">
    <img src="${currentEvent.images[0].url}" alt="${currentEvent.name}" class="modal__image-logo">
    </div>

    <div class="modal__div-img">
    <img src="${currentEvent.images[0].url}" alt="${currentEvent.name}" class="modal__image">
    </div>

    <div class="modal__div">
    <h2>${currentEvent.name}</h2>
    <p>${currentEvent.info || "No description"}</p>
    </div>

    <div class="modal__div">
    <p>${currentEvent.dates.start.localDate}</p>
    <p>${currentEvent._embedded.venues[0].name}</p>
    </div>
    
    class="modal__div-btn">
    <button class="modal__btn">MORE FROM THIS AUTHOR</button>
    </div>
    `;

    backdrop.classList.remove("is-hidden");
});

closeBtn.addEventListener("click", () => {
    backdrop.classList.add("is-hidden");
});
