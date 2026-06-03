// ===========================
// INITIAL DATA
// ===========================
let events = [
    {
        id: 1,
        name: "Tech Conference 2024",
        date: "2024-12-15",
        description: "A comprehensive technology conference featuring industry leaders discussing latest innovations in AI, cloud computing, and cybersecurity."
    },
    {
        id: 2,
        name: "Web Development Workshop",
        date: "2024-11-20",
        description: "Interactive workshop covering HTML5, CSS3, JavaScript, and modern frameworks like React and Vue.js."
    },
    {
        id: 3,
        name: "Digital Marketing Summit",
        date: "2024-10-10",
        description: "Learn about SEO, social media marketing, content strategies, and analytics from industry experts."
    },
    {
        id: 4,
        name: "AI & Machine Learning Bootcamp",
        date: "2025-01-15",
        description: "Intensive bootcamp covering fundamentals of AI, neural networks, and practical machine learning projects."
    }
];

let nextId = 5;

// ===========================
// DOM ELEMENTS
// ===========================
const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const eventDateInput = document.getElementById('eventDate');
const eventDescriptionInput = document.getElementById('eventDescription');
const eventsList = document.getElementById('eventsList');
const warningMessage = document.getElementById('warningMessage');
const searchInput = document.getElementById('searchInput');
const currentYearSpan = document.getElementById('currentYear');

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    currentYearSpan.textContent = new Date().getFullYear();
    sortEventsByDate();
    displayEvents(events);
    attachEventListeners();
});

// ===========================
// EVENT LISTENERS
// ===========================
function attachEventListeners() {
    eventForm.addEventListener('submit', handleAddEvent);
    searchInput.addEventListener('input', handleSearch);
}

// ===========================
// ADD EVENT HANDLER
// ===========================
function handleAddEvent(e) {
    e.preventDefault();

    // Get input values
    const name = eventNameInput.value.trim();
    const date = eventDateInput.value.trim();
    const description = eventDescriptionInput.value.trim();

    // Validate form
    if (!validateForm(name, date, description)) {
        return;
    }

    // Clear warning message if it was showing
    hideWarningMessage();

    // Create new event object
    const newEvent = {
        id: nextId++,
        name: name,
        date: date,
        description: description
    };

    // Add to events array
    events.push(newEvent);

    // Sort by date
    sortEventsByDate();

    // Display events
    displayEvents(events);

    // Reset form
    eventForm.reset();
}

// ===========================
// FORM VALIDATION
// ===========================
function validateForm(name, date, description) {
    if (!name || !date || !description) {
        showWarningMessage("⚠️ Please fill in all fields before adding an event!");
        return false;
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        showWarningMessage("⚠️ Please enter a valid date!");
        return false;
    }

    // Validate that the date is valid
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        showWarningMessage("⚠️ Please enter a valid date!");
        return false;
    }

    return true;
}

// ===========================
// WARNING MESSAGE HANDLERS
// ===========================
function showWarningMessage(message) {
    warningMessage.textContent = message;
    warningMessage.classList.add('show');
}

function hideWarningMessage() {
    warningMessage.classList.remove('show');
    warningMessage.textContent = '';
}

// ===========================
// SORT EVENTS BY DATE
// ===========================
function sortEventsByDate() {
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// ===========================
// DISPLAY EVENTS
// ===========================
function displayEvents(eventsToDisplay) {
    // Clear the events list
    eventsList.innerHTML = '';

    // Check if there are any events to display
    if (eventsToDisplay.length === 0) {
        eventsList.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3>No Events Found</h3>
                <p>Add your first event to get started!</p>
            </div>
        `;
        return;
    }

    // Create event cards
    eventsToDisplay.forEach(event => {
        const eventCard = createEventCard(event);
        eventsList.appendChild(eventCard);
    });
}

// ===========================
// CREATE EVENT CARD
// ===========================
function createEventCard(event) {
    const card = document.createElement('div');
    
    // Check if event is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);
    const isPast = eventDate < today;

    // Add classes
    card.className = `event-card ${isPast ? 'past' : ''}`;

    // Badge text
    const badgeText = isPast ? 'Past' : 'Upcoming';
    const badgeClass = isPast ? 'past' : 'upcoming';

    // Create card content
    card.innerHTML = `
        <div class="event-badge ${badgeClass}">${badgeText}</div>
        <h3 class="event-name">${escapeHtml(event.name)}</h3>
        <p class="event-date">${formatDate(event.date)}</p>
        <p class="event-description">${escapeHtml(event.description)}</p>
        <button class="btn-delete" onclick="deleteEvent(${event.id})">Delete Event</button>
    `;

    return card;
}

// ===========================
// DELETE EVENT
// ===========================
function deleteEvent(id) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this event?')) {
        // Filter out the event with matching id
        events = events.filter(event => event.id !== id);

        // Redisplay events
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            displayEvents(filterEvents(searchTerm));
        } else {
            displayEvents(events);
        }
    }
}

// ===========================
// SEARCH & FILTER EVENTS
// ===========================
function handleSearch(e) {
    const searchTerm = e.target.value.trim();
    
    if (searchTerm === '') {
        displayEvents(events);
    } else {
        const filteredEvents = filterEvents(searchTerm);
        displayEvents(filteredEvents);
    }
}

function filterEvents(searchTerm) {
    const lowerCaseSearch = searchTerm.toLowerCase();

    return events.filter(event => {
        // Search by event name
        const nameMatch = event.name.toLowerCase().includes(lowerCaseSearch);

        // Search by event date (YYYY-MM-DD format or partial match)
        const dateMatch = event.date.includes(lowerCaseSearch);

        return nameMatch || dateMatch;
    });
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Format date to readable format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

// Escape HTML special characters for security
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}