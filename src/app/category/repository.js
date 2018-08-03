const mongoose = require( "mongoose" );

const Category = mongoose.model( "Category" );

const saveCategory = ( data ) => {
    const category = new Category( data );
    return category.save();
};

const listCategory = ( data ) => Category.find();

const findCategory = ( _id ) => Category.findOne( { _id } );

const deleteCategory = ( category ) => Category.deleteOne(category);

module.exports = {
    saveCategory,
    listCategory,
    findCategory,
    deleteCategory,
};
