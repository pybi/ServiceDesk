require( "./model" );
const controller = require( "./controller" );

const express = require( "express" );

const router = express.Router( );

router.get('/', (req, res) => {
  res.send({ express: 'Hello Express' });
});
router.get( "/list", controller.list );
router.post( "/add", controller.add );
router.post( "/delete", controller.delete );

//router.put( "/edit", serviceid, controller.edit );

module.exports = router;
