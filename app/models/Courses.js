// Get the functions in the db.js file to use
const db = require('../services/db');
class Courses{
    //Courses ID
    course_id;
    // Courses name
    course_name;

    constructor(course_id, course_name) {
        this.course_id = course_id;
        this.course_name = course_name;
    }
    
    async getCourseName() {
        if (typeof this.course_name !== 'string') {
            var sql = "SELECT * from courses where course_id = ?"
            const results = await db.query(sql, [this.course_id]);
            this.course_name = results[0].course_name;
        }
    }
}
    


module.exports = {
    Courses,
}
