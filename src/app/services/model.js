const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const serviceSchema = new Schema( {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sections: [{
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true }],
}, {
    timestamps: true,
} );

serviceSchema.index({title: 'text', description: 'text'});

module.exports = mongoose.model( "Service", serviceSchema );
