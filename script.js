const apiEP = "https://randomuser.me/api?results=2";

let userList = [];
//Slide to go to Appscreen
const slider = document.getElementById("mySlider");
slider.addEventListener("change", (e) => {
  const { value } = e.target;
  const label = document.getElementById("label");

  if (value > 70) {
    label.textContent = "Unlocked";
    dispAppScreen();
  } else {
    label.textContent = "Slide to Unlock";
  }
});

const dispAppScreen = () => {
  // //Hide home screen
  //   document.querySelector(".homeScreen").style.display = "none";
  document.querySelector(".homeScreen").remove();

  // //Show app screen
  document.querySelector(".appScreen").style.display = "block";
};
const dispContactScreen = () => {
  // //Hide App screen
  //   document.querySelector(".appScreen").style.display = "none";
  document.querySelector(".appScreen").remove();

  // //Show Contact list screen
  document.querySelector(".contactListScreen").style.display = "block";
  fetchUsers(apiEP);
};

const fetchUsers = async (url) => {
  //fetch the users

  //Promise method
  /* fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      console.log(error);
    });*/

  //Async await method

  const response = await fetch(url);
  const data = await response.json();
  userList = data.results;

  //Hide the Spinner
  document.querySelector(".showSpinner").style.display = "none";
  // Show the users
  displayContactList(userList);
};

//Display contact list
const displayContactList = (userList) => {
  document.getElementById("list").style.display = "block";
  let str = "";
  userList.map((item, i) => {
    str += `
<div class="accordion-item">
<h2 class="accordion-header">
  <button
    class="accordion-button collapsed"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#collapse${i}"
    aria-expanded="false"
    aria-controls="collapse${i}"
  >
    <img
      src="${item.picture.large}"
      alt=""
      width="50px"
      class="rounded-5"
    />
    <div class="ms-2">
      <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
      <small>${item.location.street.number} ${item.location.street.name}</small>
    </div>
  </button>
</h2>
<div
  id="collapse${i}"
  class="accordion-collapse collapse"
  data-bs-parent="#accordionExample"
>
  <div
    class="accordion-body d-flex flex-column align-items-center"
  >
    <img
      src="${item.picture.large}"
      alt=""
      width="150px"
      class="rounded-circle"
    />
    <div>
      <div class="fw-bolder">
        <i class="bi bi-person-circle"></i>
        ${item.name.title} ${item.name.first} ${item.name.last}
      </div>
      <div>
        <a href="tel: ${item.cell}">
          <i class="bi bi-phone-fill"></i>
          ${item.cell}
        </a>
      </div>
      <div>
        <a href="mailto: ${item.email}">
          <i class="bi bi-envelope-fill"></i>
          ${item.email}        </a>
      </div>
      <div>
        <a
          href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.country}"
          target="_blank"
        >
          <i class="bi bi-globe-asia-australia"></i>
          ${item.location.street.number} ${item.location.street.name} ${item.location.state}
        </a>
      </div>
    </div>
  </div>
</div>
</div>
`;
  });
  document.getElementById("userAccordion").innerHTML = str;
  document.getElementById("userCount").innerText = userList.length;
};

// Search Contact
document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;

  const filteredUsers = userList.filter((item) => {
    const name = (item.name.first + " " + item.name.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });
  displayContactList(filteredUsers);
});
