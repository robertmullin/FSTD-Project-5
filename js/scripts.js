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
    // console log to double check the data is in the correct format
    console.log(data);
    // run a loop over each user to grab the info from the JSON file
    data.forEach((user) => {

      userData.push(user);
      // insert it into the HTML structure with template literals
      userCardHTML = `
          <div class="card" id="card-wrapper">
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
    // attach a click event to the card
    const cardWrapper = document.getElementById("card-wrapper").addEventListener("click", displayModal);

    function displayModal() {
      modalContainer.classList.add("open");
    }

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

// MODAL

function displayModal(user) {
  let modalContainer = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${userData.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${userData.name.title} ${userData.name.first} ${userData.name.last}</h3>
          <p class="modal-text">${userData.email}</p>
          <p class="modal-text cap">${userData.location.city}</p>
          <hr>
          <p class="modal-text">${userData.cell}</p>
          <p class="modal-text">${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state} ${userData.location.postcode}</p>
          <p class="modal-text">Birthday: ${userData.dob}</p>
      </div>
  </div>
  `;

  galleryContainer.insertAdjacentHTML("afterend", modalContainer);
}





/*
let modalContainer = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${userData.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${userData.name.title} ${userData.name.first} ${userData.name.last}</h3>
          <p class="modal-text">${userData.email}</p>
          <p class="modal-text cap">${userData.location.city}</p>
          <hr>
          <p class="modal-text">${userData.cell}</p>
          <p class="modal-text">${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state} ${userData.location.postcode}</p>
          <p class="modal-text">Birthday: ${userData.dob}</p>
      </div>
  </div>
`;


let modalContainer = `
    <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${userData.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${userData.name.title} ${userData.name.first} ${userData.name.last}</h3>
            <p class="modal-text">${userData.email}</p>
            <p class="modal-text cap">${userData.location.city}</p>
            <hr>
            <p class="modal-text">${userData.cell}</p>
            <p class="modal-text">${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state} ${userData.location.postcode}</p>
            <p class="modal-text">Birthday: ${userData.dob}</p>
        </div>
    </div>
  `;


let modalContainer = '<div style="height: 100px; width: 100px; background-color: blue;"></div>';

/*

$.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=picture,name,email,location',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });
*/

/*
let user; 
const imgContainer = `<div class="card-img-container">`;
const userImg = `<img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">`;
const infoContainer = `<div class="card-info-container">`;
const infoContainerName = `<h3 id="name" class="card-name cap">first last</h3>`;
const infoContainerEmail = `<p class="card-text">email</p>`;
const infoContainerCity = `<p class="card-text cap">city, state</p>`;
*/
