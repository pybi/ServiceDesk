const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const sectionsSchema = new Schema({
    title: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    labels: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model( "Section", sectionsSchema );
