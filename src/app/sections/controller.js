const repository = require( "./repository" );

exports.list = async (req, res) => {
  if(req.params.category !== undefined){
    try {
      const savedCategory = await repository.listSectionsByCategory(req.params.category);
      res.send(savedCategory);
    } catch ( err ) {
        res.send( err );
    }
  } else {
    const savedSection = await repository.listSection();
    res.send(savedSection);
  }
};


exports.add = async ( req, res ) => {
  console.log("Hello World");
  const { section } = req;
  if ( section ) {
      console.log("User already exists");
      res.preconditionFailed( "existing_user" );
      return;
  }
  try {
      const savedSection = await repository.saveSection( req.body );
      console.log( savedSection );
      res.success(200, {status: 200, data: 'Geht noch nicht '});
  } catch ( err ) {
      res.send( err );
  }
};

exports.delete = async (req, res) => {
  try {
      const section = await repository.findSection( req.body.id );
      console.log(section);
      const deletedSection = await repository.deleteSection( section, req.body );
  } catch ( err ) {
      console.log( err );
      res.send( err );
  }
};
