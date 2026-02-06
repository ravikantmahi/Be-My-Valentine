const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const gif = document.querySelector("#gif");
const text = document.querySelector("#text");
const vid = document.getElementById("bg-video");

let count = 2;

// Preload images
const gifs = [
  "resources/cat-heart.gif",
  "resources/rusure.gif",
  "resources/3shocked-1.gif",
  "resources/4.crying.gif",
  "resources/5.crying.gif",
  "resources/idc.gif"
];
gifs.forEach(src => { const img = new Image(); img.src = src; });

// --- Visitor Counter Logic ---
function updateVisitorCount() {
    const counterElement = document.getElementById("visitor-count");
    const STORAGE_KEY = "ravikant_valentine_visits";
    
    // 1. Get current count from LocalStorage
    let visits = localStorage.getItem(STORAGE_KEY);
    
    // 2. Logic: If first visit, set to 1. Otherwise increment.
    if (!visits) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    
    // 3. Save the new count
    localStorage.setItem(STORAGE_KEY, visits);
    
    // 4. Display it
    if(counterElement) {
        counterElement.innerText = `Total Visits: ${visits}`;
    }
}

// Run the counter when page loads
updateVisitorCount();


// --- Existing Helper Function ---
function smoothUpdate(newText, newGif) {
    text.style.opacity = "0";
    gif.style.opacity = "0";
    setTimeout(() => {
        text.innerHTML = newText;
        if (newGif) gif.src = newGif;
        text.style.opacity = "1";
        gif.style.opacity = "1";
    }, 300);
}

// --- Button Logic ---
no.addEventListener("click", () => {
  if (count == 2) {
    smoothUpdate("You meant to press YES right? 🤨", "resources/rusure.gif");
    yes.style.width = "60%";
    no.style.width = "30%";
    count++;
  } else if (count == 3) {
    smoothUpdate("Your hand must have slipped... right? 🥹", "resources/3shocked-1.gif");
    yes.style.width = "70%";
    no.style.width = "20%";
    count++;
  } else if (count == 4) {
    smoothUpdate("I'm gonna cry... 😭", "resources/4.crying.gif");
    yes.style.width = "80%";
    no.style.width = "10%";
    no.style.fontSize = "1.5rem";
    count++;
  } else if (count == 5) {
    smoothUpdate("Pretty Please? 🥺😘", "resources/5.crying.gif");
    yes.style.width = "100%";
    no.style.display = "none";
  }
});

yes.addEventListener("click", () => {
  vid.style.display = "block";
  vid.play().catch(e => console.log("Video error: ", e));
  
  smoothUpdate("Knew it babe! 😘", "resources/idc.gif");
  
  yes.innerHTML = '<a href="https://www.instagram.com/ravikant.mahii/">Message me</a>';
  yes.style.width = "100%";
  no.style.display = "none";
  
  setTimeout(() => {
    vid.pause();
    vid.currentTime = 0;
    vid.style.display = "none";
  }, 9000);
});