// DISPLAY 12 users on page load
// required variables
let galleryContainer = document.getElementById("gallery");
let userCard = "";
let userCardHTML = "";
let userData = [];
// AJAX call
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  // check to see that there are no errors
  if (xhr.readyState === 4 && xhr.status === 200) {
    // grab the JSON response from xhr object and parse it into a JS Object and access the object property that store everything in the object
    const data = JSON.parse(xhr.responseText).results;
    // run a loop over each user to grab the info from the JSON file
    data.forEach((user) => {
      // store the information in an empty array
      userData.push(user);
      // insert it into the HTML structure with template literals
      userCardHTML = `
          <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
          </div>
          `;
      // add it to userCard
      userCard += userCardHTML;
    });
    // insert it into the container
    galleryContainer.insertAdjacentHTML("beforeend", userCard);
    // END DISPLAY

    // MODAL FUNCTIONALITY
    // create modal div and all contents that won't be dynamic in a variable
    let modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    modalContainer.innerHTML = `
      <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container"></div>
    `;
    // insert it into the DOM
    galleryContainer.insertAdjacentElement("afterend", modalContainer);
    // select the card wrappers and store it in a variable
    let cardWrappers = document.querySelectorAll(".card");

    cardWrappers.forEach(function(cardWrapper, index) {
      cardWrapper.addEventListener("click", function() {
        displayModal(userData[index]);
      });
    });

    function displayModal(user) {

      let modalContainerContent = modalContainer.querySelector(".modal-info-container");

      const birthdayDate = new Date(user.dob.date);
      const formattedDOB = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      modalContainerContent.innerHTML = `
        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>
        <p class="modal-text">${user.email}</p>
        <p class="modal-text cap">${user.location.city}</p>
        <hr>
        <p class="modal-text">${user.cell}</p>
        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
        <p class="modal-text">Birthday: ${birthdayDate.toLocaleDateString("en-US", formattedDOB)}</p>     
      `;

      modalContainer.style.display = "block";
    }

    let btnClose = document.getElementById("modal-close-btn");
    btnClose.onclick = function () {
      modalContainer.style.display = "none";
    };
  // END MODAL FUNCTIONALITY
    // handle other errors
  } else if (xhr.status === 404) {
    console.log("ERROR file not found");
  } else if (xhr.status === 500) {
    console.log("ERROR server error");
  }
};
// get the information from the API
xhr.open(
  "GET",
  "https://randomuser.me/api/?results=12&inc=picture,name,email,location,cell,dob",
  true
);
xhr.send();