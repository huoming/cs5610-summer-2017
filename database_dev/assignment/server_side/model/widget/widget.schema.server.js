module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var widgetSchema = new Schema({
        _page : {type : Schema.Types.ObjectId, ref : 'Page'},
        widgetType : {
            type : String,
            uppercase : true,
            enum : ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']
        },
        name : String,
        text : String,
        placeholder : String,
        description : String,
        url : String,
        width : {
            type : Number,
            default : 100,
            max : 100,
            min : 0
        },
        height : Number,
        rows : Number,
        size : {
            type : Number,
            default : 1
        },
        class : String,
        icon : String,
        deletable : {type : Boolean, default : true},
        formatted : Boolean,
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection : 'widget'});

    return widgetSchema;
};