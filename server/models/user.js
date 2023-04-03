const users = [
  {
   userId: 134,
   userName: "cathy123",
   password: "icecream"  
  },
  {
    userId: 534,
    userName: "bill123",
    password: "badpassword"  
   },
   {
    userId: 654,
    userName: "jess",
    password: "password"  
   }
]

// functions to complete CRUD operations
function getAllUsers() {
  return users;
}

function randomFunction() {
  return "Hello World!";
}

module.exports = { getAllUsers, randomFunction }