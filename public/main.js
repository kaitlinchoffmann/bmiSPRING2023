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
  /*
    {
      userName: "cathy123",
      password: "icecream"
    }
  */
  fetchData('/users/login', user, "POST")
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err.message);
  })
}

function register(e) {
  e.preventDefault();

  let userName = document.getElementById("username").value;
  let password = document.getElementById("pswd").value;
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;

  let user = new User(userName, password, firstName, lastName);
  console.log(user);

  document.getElementById("username").value = "";
}

let postForm = document.getElementById("post-form");
if(postForm) postForm.addEventListener("submit", createPost)

function createPost(e) {
  e.preventDefault();

  let createdPost = document.getElementById("post").value;

  let newPost = {
    post: createdPost
  }

  console.log(newPost)
}


// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
} 
