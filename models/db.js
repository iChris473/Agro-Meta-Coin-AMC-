const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://ichris:uRltYApIKnACkOXK@cluster0.rpaco.mongodb.net/Agrocoin?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log("MongoDB running..."))


// mongodb://ichris:<password>@cluster0-shard-00-00.rpaco.mongodb.net:27017,cluster0-shard-00-01.rpaco.mongodb.net:27017,cluster0-shard-00-02.rpaco.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8dmutx-shard-0&authSource=admin&retryWrites=true&w=majority

// mongodb+srv://ichris:uRltYApIKnACkOXK@cluster0.rpaco.mongodb.net/Agrocoin?retryWrites=true&w=majority

// mongodb://ichris:uRltYApIKnACkOXK@cluster0-shard-00-00-zcbag.mongodb.net:27017,cluster0-shard-00-01-zcbag.mongodb.net:27017,cluster0-shard-00-02-xvnqv.mongodb.net:27017/zcbag?ssl=true&replicaSet=Cluster0-shard-0&authSource=test&retryWrites=true&w=majority