const express=require('express');
const upload=require('../services/multer.service');
const router=express.Router();

const {
  listStudent,
  getStudent,
  registerStudent,
  updateStudent,
  removeStudent,
} =require('../controllers/customer.controller');

const checkPermission = require('../middleware/permission.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const authUser=require('../middleware/auth.middleware');

router.get('/',
    roleMiddleware(['admin','seller']),
    checkPermission('list-students'),
    listStudent);

router.get('/profile/:id',
    authUser, 
    roleMiddleware(['customer','admin']), 
    checkPermission(''),
    getStudent);

router.put('/profile/:id',
    upload.single('image'), 
    authUser, 
    roleMiddleware(['customer']), 
    checkPermission('update_self'), 
    updateStudent);

router.delete('/profile/:id',
    authUser, 
    roleMiddleware(['admin']), 
    checkPermission('delete_customer'), 
    removeStudent);

module.exports=router;