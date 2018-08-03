const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const categorySchema = new Schema( {
    title: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: false },
});

module.exports = mongoose.model( "Category", categorySchema );
