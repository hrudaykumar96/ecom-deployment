const express = require('express');
const router = express.Router();
const verify_token = require('../utils/authentication');
const Products = require('../models/Products');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

/* add products */
router.post('/add/products', verify_token, upload.array('photos', 12), async (req, res, next) => {
    try {
        const user = req.user;
        const { brand_name, category, fabric, sleeve, pattern, color, items, price, section, about, status, description } = req.body;
        const images = req.files;
        const imagePaths = images.map(file => file.path);

        if(user.status === 'active'){
          const new_product = new Products({
            user: user._id,
            brand_name,
            category,
            fabric,
            sleeve,
            pattern,
            color,
            items,
            price,
            section,
            about,
            status,
            description,
            images: imagePaths 
        });

        await new_product.save();

        res.json({
            success: 'Product added successfully',
        });
        } else{
          res.json({
            status:`your account is ${user.status}. please contact admin`
          })
        }

        

    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
        });
    }
});




  router.get('/get/products', verify_token, async (req, res) => {
    try {
      const user = req.user;
      if (user) {
        const productsByCategory = await Products.aggregate([
          {
            $sort: { createdAt: -1 } 
          },
          {
            $group: {
              _id: "$section", 
              products: { $push: "$$ROOT" }
            }
          },
          {
            $project: {
              _id: 0,
              category: "$_id", 
              products: { $slice: ["$products", 0, 6] }
            }
          }
        ]);
        res.json({success: productsByCategory });
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      res.json({
        error:'internal server error'
    })
    }
  });

/* mens product */
router.get('/getproducts/bycategory/:section', verify_token, async(req, res)=>{
  try {
    const user = req.user;
    const section= req.params.section;
    if(user){
      const products = await Products.find({section}).sort({updatedAt:-1});
      if(products){
        res.json({
          success: products,
        })
      } else{
        res.json({
          error:'internal server error'
        })
      }
    }
  } catch (error) {
    res.json({
      error:'internal server error'
  })
  }
});


/* get products data */
router.get('/get/products/byadmin', verify_token, async(req,res)=>{
  try {
    const user = req.user;
    if(user.role==='admin'){
      const products = await Products.find().populate('user').sort({'user.name':1});
      res.json({
        success: products
      })
    }
    if(user.role === 'seller'){
      const products = await Products.find({user: user._id}).populate('user').sort({'user.name':1});
      res.json({
        success: products
      })
    }
  } catch (error) {
    res.json({
      error:'internal server error'
  })
  }
});

/* get products data by id */
router.get('/get/products/data/:id', verify_token, async(req,res)=>{
  try {
    const id = req.params.id;
    const products = await Products.findById(id);
    if(products){
      res.json({
        success: products
      })
    } else{
      res.json({
        status:'product not found'
      })
    }
  } catch (error) {
    res.json({
      error: 'internal server error'
  })
  }
});

/* delete products */
router.delete('/delete/products/:id', verify_token, async(req,res)=>{
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    const imagePaths = product.images.map(file => path.normalize(file)); // Normalize the image paths

    for (let imagePath of imagePaths) {
          // If the path starts with 'uploads', remove it to avoid duplication
          if (imagePath.startsWith('uploads\\')) {
            imagePath = imagePath.replace('uploads\\', ''); // Remove the leading 'uploads' part
          }
    
          // Check if the image path is valid before attempting to delete
          if (!imagePath) {
            continue;  // Skip if image path is undefined
          }

      const fullImagePath = path.join(__dirname, '..', 'uploads', imagePath);
      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath); 
      }

    }
    const products = await Products.findByIdAndDelete(id);
    if(!products){
      res.error({
        status: 'product not found'
      })
    } else {
      res.json({
        success: 'deleted successfully'
      })
    }
  } catch (error) {
    res.json({
      error:'internal server error'
  })
  }
})

/* update products */
router.post('/update/products/:id', verify_token, upload.array('photos', 12), async(req,res)=>{
  try {
    const { brand_name, category, fabric, sleeve, pattern, color, items, price, section, about, status, description } = req.body;
    const id = req.params.id;
    const products = await Products.findById(id);
    if(products){
      if(req.files && req.files.length >0){
        for (let oldImagePath of products.images) {
          const fullOldImagePath = path.join(__dirname, '..', oldImagePath);
          if (fs.existsSync(fullOldImagePath)) {
            fs.unlinkSync(fullOldImagePath);
          }
        }
        const imagePaths = req.files.map(file => file.path);
        products.images = imagePaths;
      } else{
        products.images = products.images
      }
      products.brand_name = brand_name || products.brand_name;
      products.category = category || products.category;
      products.fabric = fabric || products.fabric;
      products.sleeve = sleeve || products.sleeve;
      products.pattern = pattern || products.pattern;
      products.color = color || products.color;
      products.items = items || products.items;
      products.price = price || products.price;
      products.section = section || products.section;
      products.about = about || products.about;
      products.status = status || products.status;
      products.description = description || products.description;

      await products.save()
      res.json({
        success:'updated successfully'
      })
    } else{
      res.json({
        status: 'product not found'
      })
    }

  } catch (error) {
    res.json({
      error:'internal server error'
  })
  }
});


/* product details and info */
router.get('/get/product/info/:id', verify_token, async(req, res)=>{
  try {
    const id = req.params.id;
    const products = await Products.findById(id);
    const similarProducts = await Products.find({
      category: products.category,
      brand_name: products.brand_name, 
      _id: { $ne: products._id },
    });
    if(products){
      res.json({
        success: products,
        similarProducts
      })
    } else{
      res.json({
        status:'product not found'
      })
    }
  } catch (error) {
    res.json({
      error:'internal server error'
  })
  }
});










  module.exports = router;