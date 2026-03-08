
const animations = [
  {
    title: "Neon Drift",
    duration: "00:12",
    updated: "2d ago"
  },
  {
    title: "Midnight Loop",
    duration: "00:08",
    updated: "5d ago"
  },
  {
    title: "Solar Flare",
    duration: "00:20",
    updated: "1w ago"
  }
];


const gallery = document.getElementById("animationGallery");


function renderAnimations() {
  gallery.innerHTML = "";

 
  animations.forEach(animation => {
    const card = document.createElement("div");
    card.className = "animation-card";

    card.innerHTML = `
      <div class="card-overlay">
        <div class="play-icon">▶</div>
        <div class="card-info">
          <h4>${animation.title}</h4>
          <p>${animation.duration} • Edited ${animation.updated}</p>
        </div>
      </div>
    `;

    gallery.appendChild(card);
  });


  const newCard = document.createElement("div");
  newCard.className = "animation-card empty";
  newCard.innerHTML = `
    <span>+</span>
    <p>Create New Animation</p>
  `;
  gallery.appendChild(newCard);

 
  newCard.addEventListener("click", () => {
    addNewAnimation();
  });
}


function addNewAnimation() {
  const title = prompt("Enter animation title:");
  if (!title) return;

  const duration = prompt("Enter duration (e.g., 00:12):", "00:10") || "00:10";
  const updated = "just now";

  animations.push({ title, duration, updated });

  renderAnimations(); 
}


renderAnimations();

const modal = document.getElementById("previewModal");
const modalTitle = document.getElementById("modalTitle");
const modalInfo = document.getElementById("modalInfo");
const closeBtn = document.querySelector(".modal .close");


function openModal(animation) {
  modal.style.display = "block";
  modalTitle.textContent = animation.title;
  modalInfo.textContent = `${animation.duration} • Edited ${animation.updated}`;
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function attachCardClickEvents() {
  const cards = document.querySelectorAll(".animation-card");
  cards.forEach((card, index) => {
    if (!card.classList.contains("empty")) {
      card.addEventListener("click", () => {
        openModal(animations[index]);
      });
    }
  });
}

function renderAnimations() {

  gallery.innerHTML = "";

 
  animations.forEach((animation, index) => {
    const card = document.createElement("div");
    card.className = "animation-card";

    card.innerHTML = `
      <div class="card-overlay">
        <div class="play-icon">▶</div>
        <div class="card-info">
          <h4>${animation.title}</h4>
          <p>${animation.duration} • Edited ${animation.updated}</p>
        </div>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    gallery.appendChild(card);

    card.addEventListener("click", () => {
      openModal(animation);
    });

  
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      deleteAnimation(index);
    });
  });

  
  const newCard = document.createElement("div");
  newCard.className = "animation-card empty";
  newCard.innerHTML = `
    <span>+</span>
    <p>Create New Animation</p>
  `;
  gallery.appendChild(newCard);
  newCard.addEventListener("click", addNewAnimation);
}

function deleteAnimation(index) {
  const confirmDelete = confirm(
    `Are you sure you want to delete "${animations[index].title}"?`
  );
  if (!confirmDelete) return;


  animations.splice(index, 1);

 
  renderAnimations();
}

document.addEventListener("DOMContentLoaded", () => {
  
  const avatarImg = document.getElementById("avatarImg");
  const avatarInput = document.getElementById("avatarInput");
  const changeAvatarBtn = document.querySelector(".btn-avatar");

  const editProfileBtn = document.getElementById("editProfileBtn");
  const usernameEl = document.getElementById("username");
  const userBioEl = document.getElementById("userBio");

 
  changeAvatarBtn.addEventListener("click", () => {
    avatarInput.click();
  });

  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    const reader = new FileReader();
    reader.onload = function(e) {
      avatarImg.src = e.target.result; 
    };
    reader.readAsDataURL(file);
  });

 
 
  editProfileBtn.addEventListener("click", () => {
    const newName = prompt("Enter your name:", usernameEl.textContent);
    if (newName && newName.trim() !== "") usernameEl.textContent = newName;

    const newBio = prompt("Enter your bio:", userBioEl.textContent);
    if (newBio && newBio.trim() !== "") userBioEl.textContent = newBio;
  });

  
  if (localStorage.getItem("profileAvatar")) {
    avatarImg.src = localStorage.getItem("profileAvatar");
  }
  if (localStorage.getItem("profileName")) {
    usernameEl.textContent = localStorage.getItem("profileName");
  }
  if (localStorage.getItem("profileBio")) {
    userBioEl.textContent = localStorage.getItem("profileBio");
  }

  
  avatarInput.addEventListener("change", () => {
    localStorage.setItem("profileAvatar", avatarImg.src);
  });

  editProfileBtn.addEventListener("click", () => {
    localStorage.setItem("profileName", usernameEl.textContent);
    localStorage.setItem("profileBio", userBioEl.textContent);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("togglePrivateGallery");
  const privateGallery = document.getElementById("privateGalleryContainer");
  const createPrivateBtn = document.getElementById("createPrivateAnimation");

  let privateAnimations = JSON.parse(localStorage.getItem("privateAnimations")) || [];

  function renderPrivateGallery() {
    privateGallery.innerHTML = "";
    if (privateAnimations.length === 0) {
      privateGallery.innerHTML = "<p>No private animations yet.</p>";
      return;
    }

    privateAnimations.forEach((anim, index) => {
      const card = document.createElement("div");
      card.className = "animation-card";
      card.textContent = anim.title;

     
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "×";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent card click
        if (confirm(`Delete "${anim.title}"?`)) {
          privateAnimations.splice(index, 1);
          localStorage.setItem("privateAnimations", JSON.stringify(privateAnimations));
          renderPrivateGallery();
        }
      });
      card.appendChild(deleteBtn);

   
      card.addEventListener("click", () => {
        alert(`Viewing animation: "${anim.title}"`);
      });

      privateGallery.appendChild(card);
    });
  }

  renderPrivateGallery();

  toggleBtn.addEventListener("click", () => {
    const savedPassword = localStorage.getItem("privateGalleryPassword");

    if (privateGallery.classList.contains("hidden")) {
      if (!savedPassword) {
        const newPassword = prompt("Set a password for your private gallery:");
        if (newPassword && newPassword.trim() !== "") {
          localStorage.setItem("privateGalleryPassword", newPassword);
          alert("Password saved! Gallery unlocked.");
          privateGallery.classList.remove("hidden");
          toggleBtn.textContent = "Hide Private Gallery";
        }
      } else {
        const password = prompt("Enter your private gallery password:");
        if (password === savedPassword) {
          privateGallery.classList.remove("hidden");
          toggleBtn.textContent = "Hide Private Gallery";
        } else {
          alert("Incorrect password!");
        }
      }
    } else {
      privateGallery.classList.add("hidden");
      toggleBtn.textContent = "Show Private Gallery";
    }
  });


  createPrivateBtn.addEventListener("click", () => {
    const animTitle = prompt("Enter animation title:");
    if (!animTitle || animTitle.trim() === "") return;

    privateAnimations.push({ title: animTitle });
    localStorage.setItem("privateAnimations", JSON.stringify(privateAnimations));
    renderPrivateGallery();
  });
});

