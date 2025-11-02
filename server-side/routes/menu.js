import express from 'express';
import {
  createMenu,
  getAllMenus,
  updateMenu,
  deleteMenu,
  getById
} from '../controller/menu.js';

const router = express.Router();
// Create a new menu
router.post('/',createMenu);
// Get all menus
router.get('/',getAllMenus);
// Update a menu
router.patch('/:id',updateMenu);
// Delete a menu
router.delete('/:id',deleteMenu);
//get by id
router.get('/:id',getById);


export default router;