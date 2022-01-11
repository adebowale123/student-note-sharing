// Get the functions in the db.js file to use
const db = require('../services/db');
const bcrypt = require("bcryptjs");

class User {

    // Id of the user
    u_id;

    // Email of the user
    u_email;

    constructor(u_email) {
        this.u_email = u_email;
    }
    
    // Get an existing user id from an email address, or return false if not found
  // Checks to see if the submitted email address exists in the Users table
async getIdFromEmail() {
    var sql = "SELECT u_id FROM users WHERE u_email = ?";
    const result = await db.query(sql, [this.u_email]);
    // TODO LOTS OF ERROR CHECKS HERE..
    if (JSON.stringify(result) != '[]') {
        this.u_id = result[0].u_id;
        return this.u_id;
    }
    else {
        return false;
    }
}


    // Add a password to an existing user
async setUserPassword(u_password) {
        const pw = await bcrypt.hash(u_password, 10);
        var sql = "UPDATE users SET u_password = ? WHERE u_id = ?"
        const result = await db.query(sql, [pw, this.u_id]);
        return true;
    }

    
    // Add a new record to the users table    
    // Add a new record to the users table
    async addUser(u_password) {
        const pw = await bcrypt.hash(u_password, 10);
        var sql = "INSERT INTO users (u_email, u_password) VALUES (? , ?)";
        const result = await db.query(sql, [this.u_email, pw]);
        console.log(result.insertId);
        this.u_id = result.insertId;
        return true;
    }

    // Test a submitted password against a stored password
    // Test a submitted password against a stored password
async authenticate(submitted) {
    // Get the stored, hashed password for the user
    var sql = "SELECT u_password FROM users WHERE u_id = ?";
    const result = await db.query(sql, [this.u_id]);
    const match = await bcrypt.compare(submitted, result[0].u_password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
}



}

module.exports  = {
    User
}