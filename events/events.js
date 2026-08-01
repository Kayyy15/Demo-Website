// Helper formatting date
function formatDate(dateStr) {
  if (!dateStr) return "";
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', options); 
}

// Button state manager
function setActiveBtn(clickedBtn) {
    document.querySelectorAll('.tech-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
}

// EVENTS DATA
const eventsData = {
  2026: [
    {
      title: "🚀 Code Autopsy: Gamified debugging",
      photos: ["../static/events/code autopsy.jpeg"],
      description: "An interactive coding challenge to solve real-world problems. Debug and analyze complex code to identify errors and improve problem-solving skills.",
      date: "2026-03-16"
    },
    {
      title: "Cognithon 2026: AI & ML Hackathon",
      photos: ["../static/events/Cognithon 2026.jpeg","../static/events/Cognithon(2).jpeg"],
      description: "Ready to build the future with AI? Join COGNITHON 2026, a 9-hour AI Hackathon where you’ll tackle real industry problem statements, build innovative AI solutions, and receive guidance from experienced industry mentors.",
      date: "2026-07-18"
    },
  ],
  2025:[ 
    { title: "🎨✨ Photoshop Workshop", photos: ["../static/events/Poster Designing.jpg"], description: "IEEE presents “Zero to Hero”, a Photoshop Poster Designing Workshop & Competition! 🚀", date: "2025-08-15" },
    { title: "🔐 Cyber Security Workshop", photos: ["../static/events/Ethical Hacking.jpg"], description: "Unlock the secrets of cybersecurity and ethical hacking! Learn, explore, and safeguard the digital world. 🚀💻", date: "2025-02-02" },
    { title: "Machine Minds", photos: ["../static/events/machine minds.jpeg"], description: "Dive into the world of AI and Machine Learning with IEEE's 'Machine Minds' workshop! 🤖✨", date: "2025-10-06" },
    { title: "🔒 Encrypt-O-Code", photos: ["../static/events/encryptocode.png"], description: "Decode the mystery, crack the code! Join Encrypt-O-Code, the ultimate coding challenge where every line of code brings you closer to victory. 🕵️‍♂️", date: "2025-10-07" },
    { title: "Phishnet", photos: ["../static/events/phishnet.jpeg"], description: "Dive into the world of cybersecurity with PhishNet! Learn to identify and combat phishing attacks in this interactive workshop. 🛡️💻", date: "2025-10-08" },
    { title: "No Escape Room 🔒", photos: ["../static/events/poster no escape.png"], description: "A national-level Workshop exploring Artificial Intelligence and Robotics. 🤖✨", date: "2025-10-09" }
  ],
  2024: [
    { title: "CODE CONQUEST", photos: ["../static/events/Code Conquest.jpeg"], description: "Different coding challenges will be displayed and participants have to tackle them to win the Prize.🏆", date: "2024-10-14" },
    { title: "DATA NEXUS", photos: ["../static/events/Data Nexus.23.jpg"], description: "Workshop on Data Science and Machine Learning", date: "2024-10-15" },
    { title: "TECH HUNT", photos: ["../static/events/Tech hunt.jpg"], description: "Get ready for a twist on the classic treasure hunt with Tech Hunt!", date: "2024-03-16" },
    { title: "NO ESCAPE", photos: ["../static/events/no escape.jpg"], description: "No Escape Competition! Form a team of four, enter a room packed with mystery.", date: "2024-10-16" }
  ],
  2023: [
    { title: "TECH HUNT", photos: ["../static/events/Tech hunt.jpg"], description: "Hands-on approach to understanding deep learning and building smart applications.", date: "2023-03-11" },
    { title: "CODE WAR", photos: ["../static/events/Code Conquest.jpeg"], description: "Different coding challenges will be displayed and participants have to tackle them.", date: "2023-03-12" }
  ]
};

// Section Toggler
function showSection(section) {
    const sections = {
        current: document.getElementById("current-events"),
        pastEvents: document.getElementById("past-events"),
        pastWorkshops: document.getElementById("past-workshops"),
    };
    
    Object.keys(sections).forEach(id => {
        if (sections[id]) sections[id].style.display = "none";
    });

    if (sections[section]) sections[section].style.display = "grid";
}

// RENDER GENERAL EVENTS
function renderEvents(year, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ""; 

    const events = eventsData[year];
    if (!events || events.length === 0) {
        container.innerHTML = `
          <div class="no-events">
            <div class="radar-scan"></div>
            <p class="typewriter-text">> SYSTEM_STATUS: Archival records for ${year} not found<span class="cursor"></span></p>
          </div>
        `;
        return;
    }

    events.forEach(event => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${event.photos[0]}" alt="${event.title}" />
          </div>
          <div class="card-content">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <span class="event-date">${formatDate(event.date)}</span>
          </div>
        `;
        div.onclick = () => openModal(event);
        container.appendChild(div);
    });

    // Fill empty grid space with "Encrypted" ghost cards
    const minCards = 4; // Adjust this if your desktop fits more/less cards
    if (events.length < minCards) {
        for (let i = 0; i < minCards - events.length; i++) {
            const ghost = document.createElement("div");
            ghost.className = "ghost-card";
            ghost.innerHTML = `
                <i class="fa-solid fa-lock ghost-icon"></i>
                <p class="ghost-text">ENCRYPTED_FILE</p>
                <p class="ghost-subtext">Awaiting Declassification</p>
            `;
            container.appendChild(ghost);
        }
    }
}

function loadPastEvents(year) {
    showSection("pastEvents");
    renderEvents(year, "past-events");
}

// RENDER UPCOMING EVENTS
function renderUpcomingEvents(year = 2026) {
    const container = document.getElementById("event-calendar");
    if (!container) return;
    container.innerHTML = ""; 

    const today = new Date();
    const events = eventsData[year]?.filter(ev => new Date(ev.date) >= today) || [];

    if (events.length === 0) {
        container.innerHTML = `
          <div class="no-events">
            <div class="radar-scan"></div>
            <p class="typewriter-text">> SYSTEM_STATUS: Awaiting next Event Dates<span class="cursor"></span></p>
          </div>
        `;
        return;
    }

    events.forEach(event => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${event.photos[0]}" alt="${event.title}" />
          </div>
          <div class="card-content">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <span class="event-date">${formatDate(event.date)}</span>
          </div>
        `;
        div.onclick = () => openModal(event);
        container.appendChild(div);
    });
}

// PAST WORKSHOPS (Hardcoded Data from original file)
function loadPastWorkshops() {
    showSection("pastWorkshops"); 
    const pastWorkshops = [
        { title: "GD Workshop", img: "../static/events/Poster Designing.jpg" },
        { title: "Crafting Circuits", img: "../static/events/Tech hunt.jpg" }
    ];

    const container = document.getElementById("past-workshops");
    container.innerHTML = ""; 

    pastWorkshops.forEach(workshop => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${workshop.img}" alt="${workshop.title}" />
          </div>
          <div class="card-content" style="flex-grow: 0;">
            <h3 style="margin: 0; text-align: center;">${workshop.title}</h3>
          </div>
        `;
        // Create a fake event object to make the modal work with workshops
        card.onclick = () => openModal({ photos: [workshop.img] });
        container.appendChild(card);
    });
}

// MODAL SLIDESHOW LOGIC
let currentSlideIndex = 1;

function openModal(event) {
  const modal = document.getElementById("eventModal");
  const slidesContainer = document.getElementById("slides-container");
  const dotsContainer = document.getElementById("dots-container");

  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  event.photos.forEach((photo, index) => {
    const img = document.createElement("img");
    img.src = photo;
    img.className = "mySlides";
    slidesContainer.appendChild(img);

    const dot = document.createElement("span");
    dot.className = "dot";
    dot.onclick = () => currentSlide(index + 1);
    dotsContainer.appendChild(dot);
  });

  currentSlideIndex = 1;
  showSlides(currentSlideIndex);
  
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add('show-modal'), 10);
}

function closeModal() {
  const modal = document.getElementById("eventModal");
  modal.classList.remove('show-modal');
  setTimeout(() => modal.style.display = "none", 300);
}

function plusSlides(n) {
  showSlides(currentSlideIndex += n);
}

function currentSlide(n) {
  showSlides(currentSlideIndex = n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return;

  if (n > slides.length) currentSlideIndex = 1;
  if (n < 1) currentSlideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[currentSlideIndex - 1].style.display = "block";
  if(dots.length > 0) dots[currentSlideIndex - 1].className += " active";
}

// Close modal if clicked outside
window.onclick = function(event) {
  const modal = document.getElementById("eventModal");
  if (event.target == modal) {
    closeModal();
  }
}

// INITIALIZE PAGE
document.addEventListener("DOMContentLoaded", () => {
  renderUpcomingEvents(); 
  renderEvents(2026, "current-events");
  showSection("current"); 
});

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Menu ---
    const openMenu = document.getElementById('open-menu');
    const closeMenu = document.getElementById('close-menu');
    const navLinks = document.getElementById('nav-links');

    if (openMenu && closeMenu && navLinks) {
        // Open menu
        openMenu.addEventListener('click', () => {
            navLinks.classList.add('active');
        });

        // Close menu
        closeMenu.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });

        // Auto-close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ... (keep the rest of your intersection observer, modal, and canvas code exactly as it is)
});