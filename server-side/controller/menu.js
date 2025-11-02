import menu from "../models/menu.js";
import AppError from "../config/appError.js";


async function createMenu(req, res, next) {
  try {
    console.log("asd");
    const newMenu = req.body;
    console.log(newMenu); 
    if (!newMenu) {
      throw new AppError("Menu data is required", 400);
    }
    const savedMenu = await menu.create(newMenu);
    res.status(201).json(savedMenu);
  } catch (err) {
    next(err);
  }
}

async function getAllMenus(req, res,next) {
  try {
    const menus = await menu.find();
    res.status(200).json(menus);
  } catch (err) {
    next(err);
  }
}
async function deleteMenu(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const deletedMenu = await menu.findOne({ _id: id });
    if (!deletedMenu) {
      throw new AppError("Menu not found", 404);
    }
    await menu.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}

async function updateMenu(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      throw new AppError("ID is required", 400);
    }
    const updatedMenu = await menu.findOne({ _id: id });
    if (!updatedMenu) {
      throw new AppError("Menu not found", 404);
    }
    await menu.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.status(200).json({ id: id });
  } catch (err) {
    next(err);
  }
}

const getById=async(req,res,next)=>{
  try{
const id = req.params.id;
    if (!id) {
        throw new AppError("ID is required", 400);
    }
   
     const Menu = await menu.findOne({ _id: id });
       if (!Menu) {
      throw new AppError("Menu not found", 404);
    }
     res.status(200).json({ data: Menu });
  }catch(err){
    next(err);
  }
 
}


 export { createMenu, getAllMenus,updateMenu,deleteMenu,getById };
