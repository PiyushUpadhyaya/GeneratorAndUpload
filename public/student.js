/**
 * Created by Piyu on 4/13/2017.
 */
var studentSchema = new mongoose.Schema({
    student_name: String,
    student_department: String,
    rollno: Number,
    cgpa: Number
});
module.exports = restful.model('tblstudent',studentSchema);