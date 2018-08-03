const repository = require( "./repository" );

exports.list = async (req, res) => {
  const config = await repository.listGeneralConfig();
  res.send(config);
};

exports.add = async ( req, res ) => {
  const { config } = req;
  if ( config ) {
      console.log("User already exists");
      res.preconditionFailed( "existing_user" );
      return;
  }
  try {
      const savedConfig = await repository.saveGeneralConfig( req.body );
      console.log( savedConfig );
      res.success(200, {status: 200, data: 'Geht noch nicht '});
  } catch ( err ) {
      res.send( err );
  }
};
