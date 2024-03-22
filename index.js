import express from "express";
import axios from "axios";
//Loci a legjobb, de tényleg

const app = express()
const port = 3000;
const API_URL = "https://api.unsplash.com/"
const applicationID = "577334"
const accessKey = "SaqRkSIJJxQ1TexNj51Hr3Dzr0R2JzykSXqS7mxHuhw"
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


const config = {
    headers: { Authorization: `Client-ID ${accessKey}` }
}

const brands = {
  "Canon": "canon",
  "NIKON CORPORATION": "nikon",
  "FUJIFILM": "fujifilm",
  "SONY": "sony",
  null: "other"
}

var photosByBrand = {};

async function getPhotosByBrand(slug){
while (Object.keys(photosByBrand).length < Object.keys(brands).length){ 
    var results = await axios.get(API_URL + slug, config)

    results.data.forEach((result) => {
      if (result.exif.make in brands){
      const cleanBrand = brands[result.exif.make];
        photosByBrand[cleanBrand] = {
          brand: cleanBrand, 
          url: result.urls.regular,
          user: result.user.name,
          expo: result.exif.exposure_time,
          aper: result.exif.aperture,
          focal: result.exif.focal_length,
          iso: result.exif.iso,
          link: result.links.html,
          likes: 0};

        }}
    )
  
  }
 
}



var savedSearchQuery = ""
var likesArray = []
var canonLikes = 0
var nikonLikes = 0
var fujiLikes = 0
var sonyLikes = 0

var otherLikes = 0

app.get("/", async (req, res) => {
    try {
      await getPhotosByBrand("photos/random/?orientation=landscape&count=30");
      var pictures = []
      Object.keys(photosByBrand).forEach((x)=>{
      pictures.push(photosByBrand[x])
      })
        res.render("index.ejs", { photos: pictures });
      } catch (error){
        res.render("index.ejs", { photos: "error data" });
      }
  });

  app.get("/f", async (req, res) => {
    try{
      await getPhotosByBrand(`photos/random/?orientation=landscape&query=${req.query.search}&count=30`)
      savedSearchQuery = req.query.search
      var pictures = []
      Object.keys(photosByBrand).forEach((x)=>{
      pictures.push(photosByBrand[x])
    })
      res.render("index.ejs", { photos: pictures });
    } catch (error){
      res.render("index.ejs", {photos: "error data" });
    }
  });

  app.get("/l", async (req, res) => {
    
    likesArray.push(req._parsedUrl.query)

    canonLikes = likesArray.filter(x => x === "canon=").length;
    nikonLikes = likesArray.filter(x => x === "nikon=").length;
    fujiLikes = likesArray.filter(x => x === "fuji=").length;
    sonyLikes = likesArray.filter(x => x === "sony=").length;
    otherLikes = likesArray.filter(x => x === "other=").length;

    try { 
      
      await getPhotosByBrand(`photos/random/?orientation=landscape&query=${savedSearchQuery}&count=30`)
      var pictures = []
      Object.keys(photosByBrand).forEach((x)=>{
      pictures.push(photosByBrand[x])
      })
      res.render("index.ejs", {photos: pictures });

    } catch (error){
      res.render("index.ejs", {photos: "error data" });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  //Make like counter

  //sort pictures fixed positions on page

