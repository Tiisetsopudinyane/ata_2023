import express from "express";
import cors from "cors";
import sharp from "sharp";
import fs from 'fs';
import {filterByBrandName,getAllBrands} from "./sql.queries.js"


const app=express();
app.use(express.static("public"));
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => console.log(`Home-Page started on port: ${PORT}`));

//retrieve all data 
app.get("/api/getAllBrands",async (req,res)=>{
    

const images=await getAllBrands();
const imagesBase64=[]
for (const image of images) {
    const decoded_image=Buffer.from(image.images, 'base64')
    //const image_name=image.brandName+".svg";
    //fs.writeFileSync(image_name, decoded_image);
    imagesBase64.push({
      filename: image.brandName,
      base64: decoded_image.toString('base64'),
    });
  }
  res.json({
    imagesBase64
  })
    
})

//filter API
app.post("/api/filter",async (req,res)=>{
  let brandName=req.body.brandName
  console.log(brandName)
  const filteredImages=await filterByBrandName(brandName);
  const imagesBase64=[]
    const decoded_image=Buffer.from(filteredImages.images, 'base64')
    imagesBase64.push({
      filename: filteredImages.brandName,
      base64: decoded_image.toString('base64'),
    });
  
  res.json({
    filteredImages,
    imagesBase64
  })
})



