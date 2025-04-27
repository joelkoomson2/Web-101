// === Dark Mode Toggle ===
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// === Petition Form Handling ===
const signNowButton = document.getElementById("sign-now-button");
const nameInput = document.getElementById("name");
const hometownInput = document.getElementById("hometown");
const emailInput = document.getElementById("email");
const signaturesContainer = document.getElementById("signatures");
const petitionForm = document.getElementById("petition-form");

let count = 3;

const addSignature = (person) => {
  const newSignature = document.createElement("p");
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} has signed this petition.`;
  signaturesContainer.appendChild(newSignature);

  const oldCounter = document.getElementById("counter");
  if (oldCounter) oldCounter.remove();

  count++;
  const newCounter = document.createElement("p");
  newCounter.id = "counter";
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
  signaturesContainer.appendChild(newCounter);
};

const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  const inputs = petitionForm.elements;

  const person = {
    name: inputs["name"].value.trim(),
    hometown: inputs["hometown"].value.trim(),
    email: inputs["email"].value.trim(),
  };

  if (person.name.length < 2) {
    nameInput.classList.add("error");
    containsErrors = true;
  } else {
    nameInput.classList.remove("error");
  }

  if (person.hometown.length < 2) {
    hometownInput.classList.add("error");
    containsErrors = true;
  } else {
    hometownInput.classList.remove("error");
  }

  if (!person.email.includes(".com")) {
    emailInput.classList.add("error");
    containsErrors = true;
  } else {
    emailInput.classList.remove("error");
  }

  if (!containsErrors) {
    addSignature(person);
    toggleModal(person);
    petitionForm.reset();
  }
};

signNowButton.addEventListener("click", validateForm);

// === Reveal on Scroll Animation ===
const animation = {
  revealDistance: 150,
};

const revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let el of revealableContainers) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - animation.revealDistance) {
      el.classList.add("revealed");
    } else {
      el.classList.remove("revealed");
    }
  }
};

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// === Reduce Motion Handling ===
const reduceMotionButton = document.getElementById("reduce-motion-button");

function reduceMotion() {
  animation.revealDistance = 50;

  for (let el of revealableContainers) {
    el.style.transition = "none";
    el.style.opacity = 1;
    el.classList.add("revealed");
  }

  window.removeEventListener("scroll", reveal);
}

reduceMotionButton.addEventListener("click", reduceMotion);

// === Modal + Image Scaling ===
const modal = document.getElementById("thanks-modal");
const modalContent = document.getElementById("thanks-modal-content");
const modalImage = document.querySelector("#thanks-modal img");
const closeModalButton = document.getElementById("modal-button");

let scaleFactor = 1;

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
};

let intervalId;

const toggleModal = (person) => {
  modalContent.textContent = `Thank you, ${person.name}, for supporting the cause from ${person.hometown}!`;
  modal.style.display = "flex";

  intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
};

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
  clearInterval(intervalId);
});
