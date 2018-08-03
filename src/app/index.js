const servicesRouter = require( "./services/router" );
const sectionsRouter = require( "./sections/router" );
const categoryRouter = require( "./category/router" );

module.exports = ( app ) => {
    app.use( "/api/services", servicesRouter );
    app.use( "/api/sections", sectionsRouter );
    app.use( "/api/category", categoryRouter );
};
