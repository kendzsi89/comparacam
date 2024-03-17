import express from "express";
import axios from "axios";
//Loci a legjobb

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

const cameras = [
  "canon",
  "nikon",
  "fujifilm",
  "sony",
  "other",
]


var savedSearchQuery = ""
var likesArray = []
var canonLikes = 0
var nikonLikes = 0
var fujiLikes = 0
var sonyLikes = 0

var otherLikes = 0

app.get("/", async (req, res) => {
    try {
        var canonPhotos = []
        var nikonPhotos = []
        var fujifilmPhotos = []
        var sonyPhotos = []
        var hasselbladPhotos = []
        var applePhotos = []
        var otherPhotos = []

      while (
        canonPhotos.length === 0 || 
        nikonPhotos.length === 0 || 
        fujifilmPhotos.length === 0 || 
        sonyPhotos.length === 0 ){
        const result = await axios.get(API_URL + "photos/random/?orientation=landscape&count=30", config);

        result.data.forEach((element) => {
          if (element.exif.make === "Canon") {
            canonPhotos.push(element)
          } else if  (element.exif.make === "NIKON CORPORATION") {
            nikonPhotos.push(element)
          } else if  (element.exif.make === "FUJIFILM") {
            fujifilmPhotos.push(element)
          } else if  (element.exif.make === "SONY") {
            sonyPhotos.push(element)
          } else if  (element.exif.make === "Hasselblad") {
            hasselbladPhotos.push(element)
          } else if  (element.exif.make === "Apple") {
            applePhotos.push(element)
          } else {
            otherPhotos.push(element)
          }
      })
      }
        var randomOne = 1
        var randomTwo = 1
        var randomThree = 1
        var randomFour = 1
        var randomFive = 1
        var randomSix = 1

        randomOne = Math.floor(Math.random() * canonPhotos.length);
        randomTwo = Math.floor(Math.random() * nikonPhotos.length);
        randomThree = Math.floor(Math.random() * fujifilmPhotos.length);
        randomFour = Math.floor(Math.random() * sonyPhotos.length);
        randomFive = Math.floor(Math.random() * otherPhotos.length);


        res.render("index.ejs", { 

            photo: canonPhotos[randomOne].urls.regular,
            meta: canonPhotos[randomOne].exif.make,
            user: canonPhotos[randomOne].user.name,
            expo: canonPhotos[randomOne].exif.exposure_time,
            aper: canonPhotos[randomOne].exif.aperture,
            focal: canonPhotos[randomOne].exif.focal_length,
            iso: canonPhotos[randomOne].exif.iso,
            link: canonPhotos[randomOne].links.html,

            photoSecond: nikonPhotos[randomTwo].urls.regular,
            metaSecond: nikonPhotos[randomTwo].exif.make,
            userSecond: nikonPhotos[randomTwo].user.name,
            expoSecond: nikonPhotos[randomTwo].exif.exposure_time,
            aperSecond: nikonPhotos[randomTwo].exif.aperture,
            focalSecond: nikonPhotos[randomTwo].exif.focal_length,
            isoSecond: nikonPhotos[randomTwo].exif.iso,
            linkSecond: nikonPhotos[randomTwo].links.html,

            photoThird: fujifilmPhotos[randomThree].urls.regular,
            metaThird: fujifilmPhotos[randomThree].exif.make,
            userThird: fujifilmPhotos[randomThree].user.name,
            expoThird: fujifilmPhotos[randomThree].exif.exposure_time,
            aperThird: fujifilmPhotos[randomThree].exif.aperture,
            focalThird: fujifilmPhotos[randomThree].exif.focal_length,
            isoThird: fujifilmPhotos[randomThree].exif.iso,
            linkThird: fujifilmPhotos[randomThree].links.html,

            photoFourth: sonyPhotos[randomFour].urls.regular,
            metaFourth: sonyPhotos[randomFour].exif.make,
            userFourth: sonyPhotos[randomFour].user.name,
            expoFourth: sonyPhotos[randomFour].exif.exposure_time,
            aperFourth: sonyPhotos[randomFour].exif.aperture,
            focalFourth: sonyPhotos[randomFour].exif.focal_length,
            isoFourth: sonyPhotos[randomFour].exif.iso,
            linkFourth: sonyPhotos[randomFour].links.html,

            photoFifth: otherPhotos[randomFive].urls.regular,
            metaFifth: JSON.stringify(otherPhotos[randomFive].exif.make),
            userFifth: otherPhotos[randomFive].user.name,
            expoFifth: otherPhotos[randomFive].exif.exposure_time,
            aperFifth: otherPhotos[randomFive].exif.aperture,
            focalFifth: otherPhotos[randomFive].exif.focal_length,
            isoFifth: otherPhotos[randomFive].exif.iso,
            linkFifth: otherPhotos[randomFive].links.html,



            likes: canonLikes,
            likesSecond: nikonLikes,
            likesThird: fujiLikes,
            likesFourth: sonyLikes,
            likesFifth: otherLikes,


        });
      } catch (error){

        res.render("index.ejs", {             
          photo: "error data",
          meta: "error data",
          user: "error data",
          expo:  "error data",
          aper:  "error data",
          focal:  "error data",
          iso:  "error data",
          link: "error data",
  
          photoSecond: "error data",
          metaSecond: "error data",
          userSecond: "error data",
          expoSecond: "error data",
          aperSecond:  "error data",
          focalSecond:  "error data",
          isoSecond:  "error data",
          linkSecond: "error data",
  
          photoThird: "error data",
          metaThird: "error data",
          userThird: "error data",
          expoThird: "error data",
          aperThird:  "error data",
          focalThird:  "error data",
          isoThird:  "error data",
          linkThird: "error data",
  
          photoFourth: "error data",
          metaFourth: "error data",
          userFourth: "error data",
          expoFourth: "error data",
          aperFourth:  "error data",
          focalFourth:  "error data",
          isoFourth:  "error data",
          linkFourth: "error data",
  
          photoFifth: "error data",
          metaFifth: "error data",
          userFifth: "error data",
          expoFifth: "error data",
          aperFifth:  "error data",
          focalFifth:  "error data",
          isoFifth:  "error data",
          linkFifth: "error data",
  
  
          likes: "error data",
          likesSecond: "error data",
          likesThird: "error data",
          likesFourth: "error data",
          likesFifth: "error data",

        });
      }
  });

  app.get("/f", async (req, res) => {
    try { 
      var canonPhotos = []
      var nikonPhotos = []
      var fujifilmPhotos = []
      var sonyPhotos = []
      var hasselbladPhotos = []
      var applePhotos = []
      var otherPhotos = []
      
      while (canonPhotos.length === 0 || 
        nikonPhotos.length === 0 || 
        fujifilmPhotos.length === 0 || 
        sonyPhotos.length === 0 ){
        const result = await axios.get(API_URL + `photos/random/?orientation=landscape&query=${req.query.search}&count=30`, config);
        savedSearchQuery = req.query.search

        result.data.forEach((element) => {
          if (element.exif.make === "Canon") {
            canonPhotos.push(element)
          } else if  (element.exif.make === "NIKON CORPORATION") {
            nikonPhotos.push(element)
          } else if  (element.exif.make === "FUJIFILM") {
            fujifilmPhotos.push(element)
          } else if  (element.exif.make === "SONY") {
            sonyPhotos.push(element)
          } else if  (element.exif.make === "Hasselblad") {
            hasselbladPhotos.push(element)
          } else if  (element.exif.make === "Apple") {
            applePhotos.push(element)
          } else {
            otherPhotos.push(element)
          }
        }) 
      }
        var randomOne = 1
        var randomTwo = 1
        var randomThree = 1
        var randomFour = 1
        var randomFive = 1
        var randomSix = 1

        randomOne = Math.floor(Math.random() * canonPhotos.length);
        randomTwo = Math.floor(Math.random() * nikonPhotos.length);
        randomThree = Math.floor(Math.random() * fujifilmPhotos.length);
        randomFour = Math.floor(Math.random() * sonyPhotos.length);
        randomFive = Math.floor(Math.random() * otherPhotos.length);


      res.render("index.ejs", { 
            photo: canonPhotos[randomOne].urls.regular,
            meta: canonPhotos[randomOne].exif.make,
            user: canonPhotos[randomOne].user.name,
            expo: canonPhotos[randomOne].exif.exposure_time,
            aper: canonPhotos[randomOne].exif.aperture,
            focal: canonPhotos[randomOne].exif.focal_length,
            iso: canonPhotos[randomOne].exif.iso,
            link: canonPhotos[randomOne].links.html,

            photoSecond: nikonPhotos[randomTwo].urls.regular,
            metaSecond: nikonPhotos[randomTwo].exif.make,
            userSecond: nikonPhotos[randomTwo].user.name,
            expoSecond: nikonPhotos[randomTwo].exif.exposure_time,
            aperSecond: nikonPhotos[randomTwo].exif.aperture,
            focalSecond: nikonPhotos[randomTwo].exif.focal_length,
            isoSecond: nikonPhotos[randomTwo].exif.iso,
            linkSecond: nikonPhotos[randomTwo].links.html,

            photoThird: fujifilmPhotos[randomThree].urls.regular,
            metaThird: fujifilmPhotos[randomThree].exif.make,
            userThird: fujifilmPhotos[randomThree].user.name,
            expoThird: fujifilmPhotos[randomThree].exif.exposure_time,
            aperThird: fujifilmPhotos[randomThree].exif.aperture,
            focalThird: fujifilmPhotos[randomThree].exif.focal_length,
            isoThird: fujifilmPhotos[randomThree].exif.iso,
            linkThird: fujifilmPhotos[randomThree].links.html,

            photoFourth: sonyPhotos[randomFour].urls.regular,
            metaFourth: sonyPhotos[randomFour].exif.make,
            userFourth: sonyPhotos[randomFour].user.name,
            expoFourth: sonyPhotos[randomFour].exif.exposure_time,
            aperFourth: sonyPhotos[randomFour].exif.aperture,
            focalFourth: sonyPhotos[randomFour].exif.focal_length,
            isoFourth: sonyPhotos[randomFour].exif.iso,
            linkFourth: sonyPhotos[randomFour].links.html,

            photoFifth: otherPhotos[randomFive].urls.regular,
            metaFifth: JSON.stringify(otherPhotos[randomFive].exif.make),
            userFifth: otherPhotos[randomFive].user.name,
            expoFifth: otherPhotos[randomFive].exif.exposure_time,
            aperFifth: otherPhotos[randomFive].exif.aperture,
            focalFifth: otherPhotos[randomFive].exif.focal_length,
            isoFifth: otherPhotos[randomFive].exif.iso,
            linkFifth: otherPhotos[randomFive].links.html,
            
            
            likes: canonLikes,
            likesSecond: nikonLikes,
            likesThird: fujiLikes,
            likesFourth: sonyLikes,
            likesFifth: otherLikes,
        
    });
    
    } catch (error){
      res.render("index.ejs", {             
        photo: "error data",
        meta: "error data",
        user: "error data",
        expo:  "error data",
        aper:  "error data",
        focal:  "error data",
        iso:  "error data",
        link: "error data",

        photoSecond: "error data",
        metaSecond: "error data",
        userSecond: "error data",
        expoSecond: "error data",
        aperSecond:  "error data",
        focalSecond:  "error data",
        isoSecond:  "error data",
        linkSecond: "error data",

        photoThird: "error data",
        metaThird: "error data",
        userThird: "error data",
        expoThird: "error data",
        aperThird:  "error data",
        focalThird:  "error data",
        isoThird:  "error data",
        linkThird: "error data",

        photoFourth: "error data",
        metaFourth: "error data",
        userFourth: "error data",
        expoFourth: "error data",
        aperFourth:  "error data",
        focalFourth:  "error data",
        isoFourth:  "error data",
        linkFourth: "error data",

        photoFifth: "error data",
        metaFifth: "error data",
        userFifth: "error data",
        expoFifth: "error data",
        aperFifth:  "error data",
        focalFifth:  "error data",
        isoFifth:  "error data",
        linkFifth: "error data",


        likes: "error data",
        likesSecond: "error data",
        likesThird: "error data",
        likesFourth: "error data",
        likesFifth: "error data",

    });
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
      var canonPhotos = []
      var nikonPhotos = []
      var fujifilmPhotos = []
      var sonyPhotos = []
      var hasselbladPhotos = []
      var applePhotos = []
      var otherPhotos = []
      
      while (
        canonPhotos.length === 0 || 
        nikonPhotos.length === 0 || 
        fujifilmPhotos.length === 0 || 
        sonyPhotos.length === 0
        ){
        const result = await axios.get(API_URL + `photos/random/?orientation=landscape&query=${savedSearchQuery}&count=30`, config);
        

        result.data.forEach((element) => {
          if (element.exif.make === "Canon") {
            canonPhotos.push(element)
          } else if  (element.exif.make === "NIKON CORPORATION") {
            nikonPhotos.push(element)
          } else if  (element.exif.make === "FUJIFILM") {
            fujifilmPhotos.push(element)
          } else if  (element.exif.make === "SONY") {
            sonyPhotos.push(element)
          } else if  (element.exif.make === "Hasselblad") {
            hasselbladPhotos.push(element)
          } else if  (element.exif.make === "Apple") {
            applePhotos.push(element)
          } else {
            otherPhotos.push(element)
          }
        }) 
      }
        var randomOne = 1
        var randomTwo = 1
        var randomThree = 1
        var randomFour = 1
        var randomFive = 1
        var randomSix = 1

        randomOne = Math.floor(Math.random() * canonPhotos.length);
        randomTwo = Math.floor(Math.random() * nikonPhotos.length);
        randomThree = Math.floor(Math.random() * fujifilmPhotos.length);
        randomFour = Math.floor(Math.random() * sonyPhotos.length);
        randomFive = Math.floor(Math.random() * otherPhotos.length);

      res.render("index.ejs", { 
        photo: canonPhotos[randomOne].urls.regular,
        meta: canonPhotos[randomOne].exif.make,
        user: canonPhotos[randomOne].user.name,
        expo: canonPhotos[randomOne].exif.exposure_time,
        aper: canonPhotos[randomOne].exif.aperture,
        focal: canonPhotos[randomOne].exif.focal_length,
        iso: canonPhotos[randomOne].exif.iso,
        link: canonPhotos[randomOne].links.html,

        photoSecond: nikonPhotos[randomTwo].urls.regular,
        metaSecond: nikonPhotos[randomTwo].exif.make,
        userSecond: nikonPhotos[randomTwo].user.name,
        expoSecond: nikonPhotos[randomTwo].exif.exposure_time,
        aperSecond: nikonPhotos[randomTwo].exif.aperture,
        focalSecond: nikonPhotos[randomTwo].exif.focal_length,
        isoSecond: nikonPhotos[randomTwo].exif.iso,
        linkSecond: nikonPhotos[randomTwo].links.html,

        photoThird: fujifilmPhotos[randomThree].urls.regular,
        metaThird: fujifilmPhotos[randomThree].exif.make,
        userThird: fujifilmPhotos[randomThree].user.name,
        expoThird: fujifilmPhotos[randomThree].exif.exposure_time,
        aperThird: fujifilmPhotos[randomThree].exif.aperture,
        focalThird: fujifilmPhotos[randomThree].exif.focal_length,
        isoThird: fujifilmPhotos[randomThree].exif.iso,
        linkThird: fujifilmPhotos[randomThree].links.html,

        photoFourth: sonyPhotos[randomFour].urls.regular,
        metaFourth: sonyPhotos[randomFour].exif.make,
        userFourth: sonyPhotos[randomFour].user.name,
        expoFourth: sonyPhotos[randomFour].exif.exposure_time,
        aperFourth: sonyPhotos[randomFour].exif.aperture,
        focalFourth: sonyPhotos[randomFour].exif.focal_length,
        isoFourth: sonyPhotos[randomFour].exif.iso,
        linkFourth: sonyPhotos[randomFour].links.html,

        photoFifth: otherPhotos[randomFive].urls.regular,
        metaFifth: JSON.stringify(otherPhotos[randomFive].exif.make),
        userFifth: otherPhotos[randomFive].user.name,
        expoFifth: otherPhotos[randomFive].exif.exposure_time,
        aperFifth: otherPhotos[randomFive].exif.aperture,
        focalFifth: otherPhotos[randomFive].exif.focal_length,
        isoFifth: otherPhotos[randomFive].exif.iso,
        linkFifth: otherPhotos[randomFive].links.html,
      
        
        likes: canonLikes,
        likesSecond: nikonLikes,
        likesThird: fujiLikes,
        likesFourth: sonyLikes,
        likesFifth: otherLikes,
        
        
    });

    } catch (error){
      res.render("index.ejs", {             
        photo: "error data",
        meta: "error data",
        user: "error data",
        expo:  "error data",
        aper:  "error data",
        focal:  "error data",
        iso:  "error data",
        link: "error data",

        photoSecond: "error data",
        metaSecond: "error data",
        userSecond: "error data",
        expoSecond: "error data",
        aperSecond:  "error data",
        focalSecond:  "error data",
        isoSecond:  "error data",
        linkSecond: "error data",

        photoThird: "error data",
        metaThird: "error data",
        userThird: "error data",
        expoThird: "error data",
        aperThird:  "error data",
        focalThird:  "error data",
        isoThird:  "error data",
        linkThird: "error data",

        photoFourth: "error data",
        metaFourth: "error data",
        userFourth: "error data",
        expoFourth: "error data",
        aperFourth:  "error data",
        focalFourth:  "error data",
        isoFourth:  "error data",
        linkFourth: "error data",

        photoFifth: "error data",
        metaFifth: "error data",
        userFifth: "error data",
        expoFifth: "error data",
        aperFifth:  "error data",
        focalFifth:  "error data",
        isoFifth:  "error data",
        linkFifth: "error data",


        likes: "error data",
        likesSecond: "error data",
        likesThird: "error data",
        likesFourth: "error data",
        likesFifth: "error data",

    });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  
