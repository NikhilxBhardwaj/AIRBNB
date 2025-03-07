const mongoose =require("mongoose");
const initData = require("./data.js");
const Listing =require("../models/listing.js");

const MONGO_URL="mongodb+srv://Nikhil:9001330627@cluster0.iphvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initzalised");
}

initDB();
