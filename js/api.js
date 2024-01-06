import get from "./dom.js";
import { date1, get2 } from "./dom.js";

let api = "http://localhost:3000/data";
let searchInp = document.querySelector(".search");
let EditModal = document.querySelector(".editModal");
let formEdit = document.querySelector(".formEdit");
let thh = document.querySelector(".thh");
let th1 = document.querySelector(".th1");
let All = document.querySelector("#all");
let True = document.querySelector("#true");
let False = document.querySelector("#false");

export async function getSlide(cnt) {
  try {
    const { data } = await axios.get(`${api}?id=${cnt}`);
    get2(data);
  } catch (error) {
    console.log(error);
  }
}

All.onclick = async () => {
  try {
    const { data } = await axios.get(api);
    get(data);
  } catch (error) {
    console.log(error);
  }
};
True.onclick = async () => {
  try {
    const { data } = await axios.get(`${api}?status=${True.value}`);
    get(data);
  } catch (error) {
    console.log(error);
  }
};

False.onclick = async () => {
  try {
    const { data } = await axios.get(`${api}?status=${False.value}`);
    get(data);
  } catch (error) {
    console.log(error);
  }
};

thh.onclick = async () => {
  try {
    const { data } = await axios.get(`${api}?_sort=title`);
    get(data);
  } catch (error) {
    console.log(error);
  }
};
th1.onclick = async () => {
  try {
    const { data } = await axios.get(`${api}?_sort=city`);
    get(data);
  } catch (error) {
    console.log(error);
  }
};

async function getData() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
    get(data);
  } catch (error) {
    console.log(error);
  }
}
getData();

searchInp.oninput = async () => {
  try {
    const response = await fetch(`${api}?q=${searchInp.value}`);
    const search = await response.json();
    get(search);
  } catch (error) {
    console.log(error);
  }
};

// selectStatus.onclick = async () => {
//   try {
//     const selectValue = selectStatus.value;
//     let status;

//     if (selectValue == "All") {
//       const response = await fetch(api);
//       status = await response.json();
//     } else {
//       const response = await fetch(`${api}?status=${selectValue}`);
//       status = await response.json();
//     }

//     get(status);
//   } catch (error) {
//     console.log(error);
//   }
// };

// selectCity.onclick = async () => {
//   try {
//     const selectValue = selectCity.value;
//     let city;
//     if (selectValue == "All") {
//       const response = await fetch(api);
//       city = await response.json();
//     } else {
//       const response = await fetch(`${api}?city=${selectValue}`);
//       city = await response.json();
//     }
//     get(city);
//   } catch (error) {
//     console.log(error);
//   }
// };

async function postUser(user) {
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    getData();
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(`${api}/${id}`, {
      method: "DELETE",
    });
    getData();
  } catch (error) {
    console.error(error);
  }
}

function editOpen(el) {
  EditModal.showModal();
  formEdit["avatar"].src = el.avatar;
  formEdit["title"].value = el.title;
  formEdit["email"].value = el.email;
  formEdit["city"].value = el.city;
  formEdit["odzv"].value = el.odzv;
  formEdit["avatar"].onchange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    formEdit.onsubmit = async (e) => {
      e.preventDefault();
      let obj = {
        date: date1,
        avatar: reader.result,
        title: formEdit["title"].value,
        email: formEdit["email"].value,
        city: formEdit["city"].value,
        odzv: formEdit["odzv"].value,
      };
      try {
        const response = await fetch(`${api}/${el.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        getData();
      } catch (error) {
        console.log(error);
      }
    };
  };
}

async function completUser(id, user) {
  try {
    const { data } = await axios.put(`${api}/${id}`, user);
    getData();
  } catch (error) {
    console.log(error);
  }
}

export default getData;
export { postUser, deleteUser, editOpen, completUser };
