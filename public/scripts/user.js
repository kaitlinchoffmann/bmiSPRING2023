import { fetchData, setCurrentUser } from "./main.js";

let getBtn = document.getElementById("getUsers")
if(getBtn) getBtn.addEventListener('click', getAllUsers);

function getAllUsers() {
  fetch('http://localhost:3000/users/')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
}


class User {
  constructor(username, password, firstName, lastName) {
    this.userName = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getUserName() {
    return this.userName;
  }

  setUserName(userName) {
    this.userName = userName;
  }
}

let loginForm = document.getElementById("login-form");
if(loginForm) loginForm.addEventListener("submit", login);

let regForm = document.getElementById("register-form");
if(regForm) regForm.addEventListener("submit", register);

function login(e) {
  e.preventDefault();

  let userName = document.getElementById("username").value;
  let password = document.getElementById("pswd").value;

  let user = new User(userName, password);

  fetchData('/users/login', user, "POST")
  .then(data => {
    setCurrentUser(data);
    window.location.href = "bmi.html"
  })
  .catch(err => {
    document.querySelector("#login-form p.error").innerHTML = err.message;
    document.getElementById("username").value = ""
    document.getElementById("pswd").value = ""
  })
}


function register(e) {
  e.preventDefault();

  let userName = document.getElementById("username").value;
  let password = document.getElementById("pswd").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;

  let user = new User(userName, password, firstName, lastName);
  fetchData("/users/register", user, "POST")
  .then(data => {
    setCurrentUser(data)
    window.location.href = "bmi.html"
  })
  .catch(err => {
    document.querySelector("#register-form p.error").innerHTML = err.message;
    document.getElementById("pswd").value = ""
  })
  
}