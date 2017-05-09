/**
 * Created by Piyu on 4/13/2017.
 */

var companySchema = new mongoose.Schema({
    company_name: String,
    department: String,
    ctc: Number,
    type: String,
    estabYear: Date,
    country: String,
    natureOfBusiness: String,
    cgpaCutOff: Number,
    contact: Number,

});
module.exports = restful.model('tblcompany',companySchema);