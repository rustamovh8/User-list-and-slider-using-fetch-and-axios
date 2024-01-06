import {
  postUser,
  deleteUser,
  editOpen,
  completUser,
  getSlide,
} from "./api.js";

// let btn11 = document.querySelector(".btn11");
// let btnn1 = document.querySelector(".btnn1");
// let body = document.querySelector(".body");

// btnn1.onclick = () => {
//   body.style.transition = "0.2s";
//   body.style.background = "rgba(0, 0, 0, 1)";
//   body.style.color = "white";
//   btnn1.style.color = "white";
//   btn11.style.background = "#FFD700";
// };
// btn11.onclick = () => {
//   body.style.transition = "0.2s";
//   body.style.background = "white";
//   body.style.color = "#343A40";
//   btnn1.style.color = "rgba(0, 0, 0, 0.60)";
//   btnn1.style.background = "rgba(0, 0, 0, 0.08)";
//   btn11.style.background = "#FFD700";
// };

let actions = document.querySelector(".actions");
let h55 = document.querySelector(".h55");
let h5 = document.querySelector(".h5");
let infoEdit = document.querySelector(".infoEdit");
let infoModal = document.querySelector(".infoModal");
let tbody = document.querySelector("tbody");
let AddModal = document.querySelector(".AddModal");
let btn1 = document.querySelector(".btn1");
let i1 = document.querySelector("#i1");
let form = document.querySelector(".form");
let checkbox = document.querySelector(".checkbox");

let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let stausJson = document.querySelector(".stausJson");
let nameJson = document.querySelector(".nameJson");
let avatarJson = document.querySelector(".avatarJson");
let describeJson = document.querySelector(".describeJson");
let cnt = 1;
let cntAll = 0;
prev.onclick = () => {
  if (cnt == 1) {
    cnt = cntAll;
  }
  cnt--;
  getSlide(cnt);
};
next.onclick = () => {
  if (cnt == cntAll) {
    cnt = 1;
  }
  getSlide(cnt);
  cnt++;
};

export function get2(data) {
  data.forEach((el) => {
    nameJson.innerHTML = el.title;
    avatarJson.src = el.avatar;
    avatarJson.classList.add("avatarJson");
    describeJson.innerHTML = el.odzv;
    stausJson.innerHTML = el.email;
  });
}

let date = new Date();
export let date1 = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
btn1.onclick = () => {
  AddModal.showModal();
};
let btn3 = document.querySelector(".btn3");
btn3.onclick = () => {
  AddModal.close();
};
i1.onclick = () => {
  AddModal.close();
  EditModal.close();
};
form["avatar"].onchange = (e) => {
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  form.onsubmit = (evant) => {
    evant.preventDefault();
    let user = {
      avatar: reader.result,
      title: form["title"].value,
      city: form["city"].value,
      email: form["email"].value,
      odzv:form["odzv"].value,
      date: date1,
      status: false,
    };
    postUser(user);
    form.reset();
  };
};

export default function get(data) {
  tbody.innerHTML = "";
  data.forEach((el) => {
    let tr = document.createElement("tr");
    tr.classList.add("trr");
    let div2 = document.createElement("div");
    div2.classList.add("div2");

    let divjoparto = document.createElement("div");
    divjoparto.classList.add("jo");

    let tdAvatar = document.createElement("img");
    tdAvatar.src = el.avatar;
    tdAvatar.classList.add("img");

    let div = document.createElement("div");
    div.classList.add("div");

    let tdTitle = document.createElement("h5");
    tdTitle.innerHTML = el.title;

    let tdEmail = document.createElement("h6");
    tdEmail.innerHTML = el.email;

    let tdCity = document.createElement("td");
    tdCity.innerHTML = el.city;
    tdCity.classList.add("tdc");

    let divs = document.createElement("div");
    let tdStatus = document.createElement("td");
    tdStatus.innerHTML = el.status ? "ACTIVE" : "INACTIVE";
    divs.classList.add("divs");

    let tdData = document.createElement("td");
    tdData.innerHTML = el.date;

    let tdActions = document.createElement("img");
    tdActions.src = "/Снимок экрана 2023-12-13 165051.png";
    tdActions.classList.add("tdaction");
    let divActions = document.createElement("td");
    divActions.classList.add("divActions");
    tdActions.onclick = () => {
      actions.showModal();
      h55.onclick = () => {
        deleteUser(el.id);
        actions.close();
      };
      h5.onclick = () => {
        editOpen(el);
        actions.close();
      };
      infoEdit.onclick = () => {
        infoModal.showModal();
        infoModal.innerHTML = "";
        actions.close();
        let img = document.createElement("img");
        img.src = el.avatar;
        let title = document.createElement("h1");
        title.innerHTML = el.title;
        let email = document.createElement("h2");
        email.innerHTML = el.email;
        let city = document.createElement("h3");
        city.innerHTML = el.city;
        let btnOk = document.createElement("button");
        btnOk.innerHTML = "OK";
        btnOk.onclick = () => {
          infoModal.close();
        };
        infoModal.append(img, title, email, city, btnOk);
        infoModal.appendChild(infoModal);
      };
      checkbox.checked = el.status;
      checkbox.onclick = () => {
        el.status = !el.status;
        completUser(el.id, el);
      };
    };

    divActions.append(tdActions);
    divs.append(tdStatus);
    div2.append(tdTitle, tdEmail);
    div.append(tdAvatar, div2);
    tr.append(div, divjoparto, tdCity, divs, tdData, divActions);
    tbody.appendChild(tr);
  });
}
