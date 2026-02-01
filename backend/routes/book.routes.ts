import {Router} from 'express';
import { firebaseAuth } from '../middleware/fireauth.middleware.ts';
import { requireRole } from '../middleware/role.middleware.ts';


const router=Router();


import {
  listBooks,
  getBook,
  registerBook,
  updateBook,
  removeBook,
} from "../controller/book.controller.ts"


router.get('/',listBooks);
router.get('/:id',getBook);

router.post('/',
    firebaseAuth,
    requireRole(['admin','faculty']),
    registerBook);

router.put('/:id',
    firebaseAuth,
    requireRole(['admin']),
    updateBook);

router.delete('/:id',
    firebaseAuth,
    requireRole(['admin']),
    removeBook);

export default router;