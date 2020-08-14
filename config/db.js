module.exports = {
  //url: 'mongodb://localhost:27017/fynd' // local database
  url: "mongodb+srv://swapnil:swapnil@cluster0.kalgi.mongodb.net/fynd?retryWrites=true&w=majority"
}

//mongodb+srv://swapnil:<password>@cluster0.kalgi.mongodb.net/<dbname>?retryWrites=true&w=majority

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://swapnil:<password>@cluster0.kalgi.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
