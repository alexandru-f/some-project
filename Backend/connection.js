const mongoose = require('mongoose');


//connect to db

connectToDb = () => {
    
    mongoose.connect('mongodb://heroku_dzr1wfk8:2b39ff429gnsn0qmgaiiabha4u@ds345937.mlab.com:45937/heroku_dzr1wfk8');

    mongoose.connection.once('open', function(){
        console.log('Connection has been made.');
    }).on('error', function(error){
        console.log('Connection error: ', error);
    });
}

module.exports = connectToDb;