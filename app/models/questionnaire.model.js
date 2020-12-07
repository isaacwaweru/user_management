const mongoose = require('mongoose');
const bson = require('bson');
const uniqueValidator = require('mongoose-unique-validator');
const QuestionnaireSchema = mongoose.Schema(
    
    {
        evaluator: {type:String},
        evaluated: {type:Boolean,default:false },
        Questionnaire:   {
            type:[
            {
                question:{type:String},
                type:{type:String},
                answer:{type:bson},
                name:{type:String}
                
        }]},
        total_score:{type:Number},
        score: {type:[
            {
                category:{type:String},
                score:{type:Number},
                comment:{type:String}
                
        }]},
}, {
    timestamps: true
});
QuestionnaireSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
