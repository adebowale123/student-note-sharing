// Get the functions in the db.js file to use
const db = require('../services/db');
class Notes{
    //Note ID
    n_id;
    // Note 
    note;
    
 
    constructor(n_id, note) {
        this.n_id = n_id;
        this.note = note;
    }
    
    // Add a new note to the notes table    
    
    async addNote(note) {
        //const note = await bcrypt.hash(note, 10000);
        var sql = "INSERT INTO notes (n_id, note) VALUES (? , ?)";
        const result = await db.query(sql, [this.n_id, note]);
        console.log(result.insertId);
        this.n_id = result.insertId;
        return true;
    }

    // update existing note
    async addExistingNote(note) {
        var sql = "UPDATE notes SET note = ? WHERE u_id = ?"
        const result = await db.query(sql, [note, this.u_id]);
        // Ensure the note property in the model is up to date
        this.note = note;
        return result;
    }
    // view existing notes 
    async getNoteName() {
        if (typeof this.note !== 'string') {
            var sql = "SELECT * from note where n_id = ?"
            const results = await db.query(sql, [this.n_id]);
            this.note = results[0].note;
        }
    }
}