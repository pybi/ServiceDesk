const repository = require( "./repository" );

exports.list = async (req, res) => {
  if(req.params.category !== undefined){
    if(req.params.section !== undefined){
      const ServicesByCategory = await repository.listServiceByCategory(req.params.category);
      const filteredServices = [];
      for(var i=0; i < ServicesByCategory.length; i++){
        for(var y=0; y < ServicesByCategory[i].sections.length; y++){
          if(ServicesByCategory[i].sections[y]._id == req.params.section){
            filteredServices.push(ServicesByCategory[i]);
            break;
          }
        }
      }
      res.send(filteredServices);
    } else {
      const ServicesByCategory = await repository.listServiceByCategory(req.params.category);
      const filteredServices = [];
      for(var i=0; i < ServicesByCategory.length; i++){
        for(var y=0; y < ServicesByCategory[i].sections.length; y++){
          if(ServicesByCategory[i].sections[y].category == req.params.category){
            filteredServices.push(ServicesByCategory[i]);
            break;
          }
        }
      }
      res.send(filteredServices);
    }
  } else {
    const allSavedServices = await repository.listService();
    res.send(allSavedServices);
  }
};

exports.search = async (req, res) => {
  const allSavedServices = await repository.searchService(req.params.content);
  res.send(allSavedServices);
};

exports.add = async ( req, res ) => {
  const { service } = req;
  if ( service ) {
      console.log("User already exists");
      res.preconditionFailed( "existing_user" );
      return;
  }
  try {
      const savedService = await repository.saveService( req.body );
      console.log( savedService );
      res.success(200, {status: 200, data: 'Geht noch nicht '});
  } catch ( err ) {
      res.send( err );
  }
};

exports.delete = async (req, res) => {
  try {
      const service = await repository.findService( req.body.id );
      console.log(service);
      const deletedService = await repository.deleteService( service, req.body );
  } catch ( err ) {
      console.log( err );
      res.send( err );
  }
};
