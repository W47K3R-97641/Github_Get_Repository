// Get Element For JS With [DOM]
let input_Name = document.getElementById("input_Name");
let place_Show = document.getElementById("place_Show");
let btn_Run = document.getElementById("btn");
let get_Loaded = document.getElementById("loaded");

btn_Run.addEventListener("click", () => {
  if (place_Show.hasChildNodes()) {
    removeChildren();
  }
  if (input_Name.value === "") {
    showError("Enter Your Name Github Please");
    return;
  }
  fetchApi(input_Name.value);
});

function fetchApi() {
  loaded(true);
  fetch(`https://api.github.com/users/${input_Name.value}/repos`)
    .then((resolve) => {
      return resolve.json();
    })
    .then((dataObject) => {
      loaded(false);
      getRepos(dataObject);
    })
    .catch((reject) => {
      showError("Your Account Github Not Found Error 404");
    });
}

function getRepos(dataObject) {
  place_Show.style.display = "grid";
  for (let element of dataObject) {
    let li = document.createElement("li");
    let icon_Star = document.createElement("i");
    let icon_right = document.createElement("i");
    let link_Repos = document.createElement("a");
    li.setAttribute("id", "repos");
    if (element.stargazers_count != 0) {
      icon_Star.setAttribute("class", "fa-solid fa-star");
      icon_Star.setAttribute("id", "star");
    } else {
      icon_Star.setAttribute("class", "fa-regular fa-star");
    }
    link_Repos.setAttribute("href", element.html_url);
    icon_right.setAttribute("class", "fa-solid fa-angles-right");
    li.appendChild(document.createTextNode(`${element.name}`));
    icon_Star.appendChild(
      document.createTextNode(" " + element.stargazers_count)
    );
    li.appendChild(icon_Star);
    link_Repos.appendChild(document.createTextNode("Link Repos "));
    link_Repos.appendChild(icon_right);
    li.appendChild(link_Repos);
    place_Show.appendChild(li);
  }
}

function removeChildren() {
  Array.from(place_Show.children).forEach((element) => {
    place_Show.removeChild(element);
  });
}

function loaded(on_of) {
  if (on_of === true) {
    get_Loaded.style.display = "block";
  } else {
    get_Loaded.style.display = "none";
  }
}

function showError(text_Error) {
  loaded(true);
  place_Show.style.display = "flex";
  let h3 = document.createElement("h3");
  h3.setAttribute("id", "error");
  h3.appendChild(document.createTextNode(text_Error));
  loaded(false);
  place_Show.appendChild(h3);
}
