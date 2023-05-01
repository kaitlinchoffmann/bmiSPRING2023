const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL UNIQUE,
    userWeight NUMERIC,
    userHeight NUMERIC,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userID)
  );`

  await con.query(sql);  
}

createTable();

// functions to complete CRUD operations
async function getAllUsers() {
  let sql = `SELECT * FROM users;`
  return await con.query(sql);
}

async function userExists(userName) {
  let sql = `
    SELECT * FROM users
    WHERE userName = "${userName}"
  `
  return await con.query(sql);
}

async function login(user) {
  let cUser = await userExists(user.userName);
  if(!cUser[0]) throw Error("Username does not exist!");
  if(cUser[0].password != user.password) throw Error("Password is incorrect!");

  return cUser[0];
}

async function register(user) {
  // check to see if username is already in use
  let cUser = await userExists(user.userName);
  if(cUser.length>0) throw Error("Username already exists");

  // create new user
  let sql = `
    INSERT INTO users(userName, password)
    VALUES ("${user.userName}", "${user.password}");
  `
  await con.query(sql)

  // get user to send over
  cUser = await getUser(user)
  console.log(cUser)
  return cUser[0];
}

async function getUser(user) {
  let sql;
  if(user.userID) {
    sql = `
      SELECT * FROM users
      WHERE userID = ${user.userID};
    `
  } else {
    sql = `
      SELECT * FROM users
      WHERE userName = "${user.userName}";
    `
  }

  return con.query(sql);
}

module.exports = { getAllUsers, login, register }



// const users = [
//   {
//    userId: 134,
//    userName: "cathy123",
//    password: "icecream"  
//   },
//   {
//     userId: 534,
//     userName: "bill123",
//     password: "badpassword"  
//    },
//    {
//     userId: 654,
//     userName: "jess",
//     password: "password"  
//    }
// ]