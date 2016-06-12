var mongoose = require("mongoose");

module.exports = function() {
    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name : String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deleteable: Boolean,
        formatted: Boolean,
        dateCreated : {type : Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};