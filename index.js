import express from "express";
import cors from "cors";
import sharp from "sharp";
import fs from 'fs';
import { filterByBrandName, getAllBrands } from "./sql.queries.js";

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => console.log(`Home-Page started on port: ${PORT}`));

// Serve static files from the "public" directory.

// Retrieve all data from the database.
app.get("/api/getAllBrands", async (req, res) => {
  // Fetch all brand images from the database.
  const images = await getAllBrands();
  const imagesBase64 = [];

  // Decode and convert images to base64 format and store them in the imagesBase64 array.
  for (const image of images) {
    const decoded_image = Buffer.from(image.images, 'base64');
    imagesBase64.push({
      filename: image.brandName,
      base64: decoded_image.toString('base64'),
    });
  }

  // Respond with the imagesBase64 array as JSON.
  res.json({
    imagesBase64
  });
});

// Filter brand images by brand name using a POST request.
app.post("/api/filter", async (req, res) => {
  const brandName = req.body.brandName;

  // Fetch filtered images from the database based on the provided brandName.
  const filteredImages = await filterByBrandName(brandName);
  const imagesBase64 = [];

  // Decode and convert the filtered image to base64 format and store it in the imagesBase64 array.
  const decoded_image = Buffer.from(filteredImages.images, 'base64');
  imagesBase64.push({
    filename: filteredImages.brandName,
    base64: decoded_image.toString('base64'),
  });

  // Respond with the filteredImages and imagesBase64 as JSON.
  res.json({
    filteredImages,
    imagesBase64
  });
});
