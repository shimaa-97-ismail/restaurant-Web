import express from "express";
import authorize from "../middleware/authorize.js";
import {
  createNewMenuItem,
  getALLmenuItems,
  updatedMenuItem,
  deleteMenuItem,
  getMenuByName,
  getById
} from "../controller/menuItem.js";

const router =express.Router()

// Create a new menu item
router.post("/", createNewMenuItem);

// Get all menu items
router.get("/", getALLmenuItems);

//update a menu item
router.patch("/:id", authorize("admin"), updatedMenuItem);
// Delete a menu item
router.delete("/:id", authorize("admin"), deleteMenuItem);

router.get("/:name", getMenuByName);
router.get("/getById/:id",getById);


export default router;
