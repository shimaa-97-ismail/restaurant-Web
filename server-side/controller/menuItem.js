import menuModel from "../models/menu.js";
import AppError from "../config/appError.js";
import MenuItem from "../models/items.js";


async function createNewMenuItem(req, res, next) {
  try {
    const newMenuItem = req.body;
   
    
    if (!newMenuItem) {
      throw new AppError("Menu item data is required", 400);
    }
    const savedMenuItem = await MenuItem.create(newMenuItem);
  
    
    res.status(201).json(savedMenuItem);
  } catch (err) {
    next(err);
  }
}

async function getALLmenuItems(req, res,next) {
  
 const lang = req.headers["accept-language"]?.split(",")[0] || "en";
  try {
    const menuItems = await MenuItem.find()
   const result = menuItems.map((i) => ({
      name: i.name[lang] || i.name.en,
      description: i.description[lang] || i.description.en,
      price: i.price
    }));

    // .populate("menuID", "name");
    res.status(200).json(menuItems);
  } catch (err) {
    next(err);
  }
}
async function updatedMenuItem(req, res, next) {
  try {
    const id = req.params.id;
    if (!id || id === "undefined") {
      throw new AppError("ID is required", 400);
    }
    const updatedMenuItem = await MenuItem.findOne({ _id: id });
    if (!updatedMenuItem) {
      throw new AppError("Menu item not found", 404);
    }
    await MenuItem.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}
async function deleteMenuItem(req, res, next) {
  try {
  
    const id = req.params.id;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const deletedMenuItem = await MenuItem.findOne({ _id: id });
    if (!deletedMenuItem) {
      throw new AppError("Menu item not found", 404);
    }
    await MenuItem.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}

async function getMenuByName(req, res, next) {
  try {
    console.log("meue");
    
    const { name } = req.params;
  
    // 68f9f10972fe0700f9d38b69
    const Menu = await menuModel.findOne({ name });
  
    
    if (!Menu) {
      throw new AppError("Menu not found", 404);
    }


    const Items = await MenuItem.find({ menuID:Menu._id})

    if (!Items) {
      throw new AppError("items not found")
      // console.log(Items.menuID);
    }
    res.status(200).json(Items);
  } catch (err) {
    console.log(err);
    
    next(err);
  }
}
async function getById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const MenuItemfound = await MenuItem.findOne({ _id: id });
    
    if (!MenuItemfound) {
      throw new AppError("Menu item not found", 404);
    }
    res.status(200).json({ data: MenuItemfound });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export {
  createNewMenuItem,
  deleteMenuItem,
  getALLmenuItems,
  updatedMenuItem,
  getMenuByName,
  getById
};
