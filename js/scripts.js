let user; 

$.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=picture,name,email,location',
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });

const galleryContainer = document.getElementById("gallery");
const userCard = document.createElement("div");
userCard.classList.add("card");
const imgContainer = document.createElement("img");
imgContainer.classList.add("card-img-container");
const userImg = document.createElement("img");
userImg.classList.add("card-img");
userImg.setAttribute("src", user.picture.thumbnail);
userImg.setAttribute("alt", "profile picture");
