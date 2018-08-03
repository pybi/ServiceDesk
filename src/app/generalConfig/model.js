const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const generalConfigSchema = new Schema( {
    welcomeMsg: { type: String, required: true },
});

module.exports = mongoose.model( "GeneralConfig", generalConfigSchema );
