const {Schema, model} = require('mongoose');

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    applicantName:{
        type: String,
        required: true
    }
    ,
    answers:{
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const applicationModel = model("Application", applicationSchema);
module.exports = applicationModel
