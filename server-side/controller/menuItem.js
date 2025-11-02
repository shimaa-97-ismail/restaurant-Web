import menuModel from "../models/menu.js";
import AppError from "../config/appError.js";
import MenuItem from "../models/items.js";


async function createNewMenuItem(req, res, next) {
  try {
    const newMenuItem = req.body;
    console.log(newMenuItem);
    
    if (!newMenuItem) {
      throw new AppError("Menu item data is required", 400);
    }
    const savedMenuItem = await MenuItem.create(newMenuItem);
    console.log(savedMenuItem);
    
    res.status(201).json(savedMenuItem);
  } catch (err) {
    next(err);
  }
}

async function getALLmenuItems(req, res,next) {
  console.log("in get all");
 const lang = req.headers["accept-language"]?.split(",")[0] || "en";
  try {
    const menuItems = await MenuItem.find()
   const result = menuItems.map((i) => ({
      name: i.name[lang] || i.name.en,
      description: i.description[lang] || i.description.en,
      price: i.price
    }));
    console.log();
    
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
    console.log("here");

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
    const { name } = req.params;
    console.log(name);
    // 68f9f10972fe0700f9d38b69
    const Menu = await menuModel.findOne({ name });
    console.log(Menu);
    
    if (!Menu) {
      throw new AppError("Menu not found", 404);
    }
    console.log(Menu._id);

    const Items = await MenuItem.find({ menuID:Menu._id})
    console.log(Items);
    
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
  console.log("asdasd");
  
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const MenuItemfound = await MenuItem.findOne({ _id: id });
    console.log(MenuItemfound);
    
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
