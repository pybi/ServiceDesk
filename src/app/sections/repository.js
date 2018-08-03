const mongoose = require( "mongoose" );

const Section = mongoose.model( "Section" );

const saveSection = ( data ) => {
    const section = new Section( data );
    return section.save();
};

const listSection = ( data ) => Section.find({})
  .populate('category').exec();

const listSectionsByCategory = ( category ) => Section.find({ category: category });

const findSection = ( _id ) => Section.findOne( { _id } );

const deleteSection = ( section ) => Section.deleteOne( section );

// const editUser = ( user, data ) => {
//     const { name, sex, age } = data;
//     const currentUser = user;
//
//     currentUser.name = name;
//     currentUser.sex = sex;
//     currentUser.age = age;
//     return user.save( );
// };

module.exports = {
    saveSection,
    listSection,
    listSectionsByCategory,
    findSection,
    deleteSection,
};
