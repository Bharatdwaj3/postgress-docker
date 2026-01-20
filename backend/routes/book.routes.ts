const express=require('express');
const router=express.Router();

const{
  listBooks,
  getBook,
  registerBook,
  updateBook,
  removeBook,
} =require('../controller/book.controller');

const authMiddleware = require('../middleware/auth.middleware');
const checkPermission = require('../middleware/permission.middleware');
const roleMiddleware = require('../middleware/role.middleware');


router.get('/',
    authMiddleware,
    roleMiddleware(['admin','faculty','student']),
    checkPermission('list-bookInfo'),
    listBooks);

router.get('/:id', 
    authMiddleware,
    roleMiddleware(['admin','faculty','studemnt']),
    checkPermission('view_products'),
    getBook);

router.post('/',
    authMiddleware,
    roleMiddleware(['faculty','admin']),
    checkPermission('reg-bookInfo'),
    registerBook);

router.put('/:id',
    authMiddleware,
    roleMiddleware(['faculty','admin']),
    checkPermission('update-bookInfo'),
    updateBook);

router.delete('/:id',
    authMiddleware,
    roleMiddleware(['faculty','admin']),
    checkPermission('rmv-bookInfo'),
    removeBook);

module.exports=router;