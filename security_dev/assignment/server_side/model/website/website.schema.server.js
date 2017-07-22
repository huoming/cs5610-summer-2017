module.exports = function(mongoose){

     var Schema = mongoose.Schema;

    var websiteSchema = new Schema({
        _user : {type : Schema.Types.ObjectId, ref : 'User'},
        name : {type : String, required : true},
        description : String,
        pages : [{
            type : Schema.Types.ObjectId,
            ref : 'Page'
        }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection : 'website'});

    return websiteSchema;
};