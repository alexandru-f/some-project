const mongoose = require('mongoose');


//connect to db

export default connectToDb = () => {
    
    mongoose.connect('mongodb://heroku_31h15hl0:6rb13lp45ubdrm3qs5ildphn1l@ds351807.mlab.com:51807/heroku_31h15hl0');

    mongoose.connection.once('open', function(){
        console.log('Connection has been made.');
    }).on('error', function(error){
        console.log('Connection error: ', error);
    });
}