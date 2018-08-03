const mongoose = require( "mongoose" );

const Config = mongoose.model( "GeneralConfig" );

const saveConfig = ( data ) => {
    const config = new Config( data );
    return config.save();
};

const listConfig = ( data ) => Config.find();

const findConfig = ( _id ) => Config.findOne( { _id } );

module.exports = {
    saveConfig,
    listConfig,
    findConfig,
};
