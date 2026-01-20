const express=require('express');
const router=express.Router();

const{
    listFaculty,
  getFaculty,
  registerFaculty,
  updateFaculty,
  removeFaculty,
    
} =require('../controllers/faculty.controller');

const roleMiddleware = require('../middleware/role.middleware');
const checkPermission = require('../middleware/permission.middleware');
const authUser=require('../middleware/auth.middleware');

router.get('/',
    roleMiddleware(['admin','seller','customer']),
    checkPermission('view_sellers'),
    listFaculty);
    
router.post('/',
    authUser,
    roleMiddleware(['seller','admin']),
    checkPermission('create_seller'),
    registerFaculty);

router.get('/:id',
    authUser, 
    roleMiddleware(['seller','admin']), 
    checkPermission('view-self'),
    getFaculty);

router.put('/profile/:id',
    authUser, 
    roleMiddleware(['admin','seller']), 
    checkPermission('update_seller'), 
    upload.single('image'), 
    updateFaculty);

router.delete('/:id',
    roleMiddleware(['admin']), 
    checkPermission('delete_seller'), 
    removeFaculty);

module.exports=router;