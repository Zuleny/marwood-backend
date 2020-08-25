const app = require('./app');

/**
 * Start Server
 */

 async function main(){
    app.listen(app.get('port'));
    console.log(`Server started on port ${ app.get('port') }`);
 }

 main();