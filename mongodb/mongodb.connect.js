const mongoose = require('mongoose');

async function connect() {

    try{
        await mongoose.connect(
            'mongodb://cursoMean:fWQZET6fAcr6ZB1w@cluster0-shard-00-00-ly7ll.mongodb.net:27017,cluster0-shard-00-01-ly7ll.mongodb.net:27017,cluster0-shard-00-02-ly7ll.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
            { useNewUrlParser: true }
        );
    }catch(err){
        console.log("Error connecting to mongoDB!");
        console.log(err);
    }
}

module.exports = { connect };

//string mongoDB
//mongodb://cursoMean:fWQZET6fAcr6ZB1w@cluster0-shard-00-00-ly7ll.mongodb.net:27017,cluster0-shard-00-01-ly7ll.mongodb.net:27017,cluster0-shard-00-02-ly7ll.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
//mongodb+srv://cursoMean:fWQZET6fAcr6ZB1w@cluster0-ly7ll.mongodb.net/test?retryWrites=true&w=majority
//pass fWQZET6fAcr6ZB1w