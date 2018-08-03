require( "./model" );
const controller = require( "./controller" );
const express = require( "express" );
const router = express.Router( );

router.get('/', (req, res) => {
  res.send({ express: 'Sections' });
});
router.get( "/list/:category?", controller.list );
router.post( "/add", controller.add );
router.post( "/delete", controller.delete );

module.exports = router;
