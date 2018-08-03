const repository = require( "./repository" );

exports.list = async (req, res) => {
  const savedCategory = await repository.listCategory();
  res.send(savedCategory);
};

exports.add = async ( req, res ) => {
  const { category } = req;
  if ( category ) {
      console.log("Already exists");
      res.preconditionFailed( "existing_user" );
      return;
  }
  try {
      const savedCategory = await repository.saveCategory( req.body );
      console.log( savedCategory );
      res.send(JSON.stringify({msg:"success" ,savedCategory}, null, 3));
  } catch ( err ) {
    res.send(JSON.stringify({
      msg:"error",
      err
    }));
  }
};

exports.delete = async (req, res) => {
  console.log("Hello world");
  try {
      const category = await repository.findCategory( req.body.id );
      console.log(category);
      const deletedCategory = await repository.deleteCategory( category, req.body );
  } catch ( err ) {
      console.log( err );
      res.send( err );
  }
};
