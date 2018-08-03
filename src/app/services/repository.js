const mongoose = require( "mongoose" );

const Service = mongoose.model( "Service" );

const saveService = ( data ) => {
    const service = new Service( data );
    return service.save();
};

const listService = ( data ) => Service.find()
  .populate('sections').exec();

const listServiceByCategory = ( data ) => {
  const populatedService = Service.find().populate('sections');
  return populatedService;
};

const searchService = ( content ) => Service.find(
  { $or : [
    {title : {$regex: new RegExp(content, "i") } },
    {description: {$regex: new RegExp(content, "i")}}
  ]}).populate('sections');

const findService = ( _id ) => Service.findOne( { _id } );

const deleteService = ( service ) => Service.deleteOne(service);

module.exports = {
    saveService,
    listService,
    listServiceByCategory,
    findService,
    searchService,
    deleteService,
};
