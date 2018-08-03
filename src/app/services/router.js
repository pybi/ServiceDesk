require( "./model" );
const controller = require( "./controller" );

const express = require( "express" );

const router = express.Router( );

router.get('/', (req, res) => {
  res.send({ express: 'Hello wqddqwdqw Express' });
});
router.get( "/list/:category?/:section?", controller.list );
router.get( "/search/:content", controller.search );
router.post( "/add", controller.add );
router.post( "/delete", controller.delete );

// router.put( "/edit", serviceid, controller.edit );
//
// router.delete( "/delete", serviceid, controller.delete );

module.exports = router;
