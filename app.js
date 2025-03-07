const express =require("express");
const app =express();
const mongoose = require("mongoose");
const Listing =require("../MAJORPROJECT/models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


const MONGO_URL="mongodb+srv://Nikhil:9001330627@cluster0.iphvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

async function main(){
    await mongoose.connect(MONGO_URL);
}

//index Route
app.get("/listings",async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

// new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//create route
app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    const {id}= req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

//update route
app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});  
    res.redirect(`/listings/${id}`);
});


//delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});
//show Route
app.get("/listings/:id",async(req,res)=>{
    const {id}= req.params;
    const listing =await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

// app.get("/listing", async (req, res) => {
//     const allListings = await Listing.find({});
//     console.log(allListings); // Log the listings to check the image URLs
//     res.render("listings/index.ejs", { allListings });
// });


// app.get("/testing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1200,
//         location:"goa",
//         country:"India",
//     });
    
//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("succesaful");
// })

app.get("/",(req,res)=>{
    res.send("working");
})


app.listen(8080,()=>{
    console.log("Server Started");
})