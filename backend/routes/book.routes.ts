import {Router} from 'express';
import { firebaseAuth } from '../middleware/firebase-auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';


const router=Router();


import {
  listBooks,
  getBook,
  registerBook,
  updateBook,
  removeBook,
} from "../controller/book.controller.js"


router.get('/',
    //roleMiddleware(['admin','faculty','student']),
    //checkPermission('listBook'),
    listBooks);

router.get('/:id', 
    //authUser,
    //roleMiddleware(['admin','faculty','studemnt']),
    //checkPermission('viewBook'),
    getBook);

router.post('/',
    //authUser,
    //roleMiddleware(['admin']),
    //checkPermission('addBook'),
    registerBook);

router.put('/:id',
    //authUser,
    //roleMiddleware(['admin']),
    //checkPermission('editBook'),
    updateBook);

router.delete('/:id',
    //authUser,
    //roleMiddleware(['admin']),
    //checkPermission('delBook'),
    removeBook);

export default router;