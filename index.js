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
var savedSearchQuery = ""

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
          };

        }}
    )
  
  }
 
}





app.get("/", async (req, res) => {

    try {
      await getPhotosByBrand("photos/random/?orientation=landscape&count=30");
      var pictures = []
      Object.keys(photosByBrand).forEach((x)=>{
      pictures.push(photosByBrand[x])
      })
      pictures.sort(function(a, b) {
        return a.brand.localeCompare(b.brand);
     });
        res.render("index.ejs", { photos: pictures.sort() });
      } catch (error){
        res.render("index.ejs", { photos: "error data" });
      }
      photosByBrand = {}
      pictures = []
  });

  app.get("/f", async (req, res) => {

    try{
      await getPhotosByBrand(`photos/random/?orientation=landscape&query=${req.query.search}&count=30`)
      savedSearchQuery = req.query.search
      var pictures = []
      Object.keys(photosByBrand).forEach((x)=>{
      pictures.push(photosByBrand[x])
    })
    
    pictures.sort(function(a, b) {
      return a.brand.localeCompare(b.brand);
   });
    console.log(pictures);
      res.render("index.ejs", { photos: pictures.sort() });
    } catch (error){
      res.render("index.ejs", {photos: "error data" });
    }
    photosByBrand = {}
    pictures = []
  });

  app.get("/l", async (req, res) => {

    try { 
      console.log(savedSearchQuery)
      await getPhotosByBrand(`photos/random/?orientation=landscape&query=${savedSearchQuery}&count=30`)
      var pictures = []
      Object.keys(photosByBrand).forEach((x)=>{
      pictures.push(photosByBrand[x])
      })
      pictures.sort(function(a, b) {
        return a.brand.localeCompare(b.brand);
     });
      res.render("index.ejs", {photos: pictures.sort() });

    } catch (error){
      res.render("index.ejs", {photos: "error data" });
    }
    photosByBrand = {}
    pictures = []
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

  //sort pictures fixed positions on page

