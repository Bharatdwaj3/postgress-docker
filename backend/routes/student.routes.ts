import {Router} from 'express';
const router=Router();

import {
  listStudent,
  getStudent,
  registerStudent,
  updateStudent,
  removeStudent,
} from '../controller/student.controller.js';

import checkPermission from '../middleware/permission.middleware.js';
import {roleMiddleware} from '../middleware/role.middleware.js';
import {authUser} from '../middleware/auth.middleware.js';

router.get('/',
    roleMiddleware(['admin','faculty','student']),
    checkPermission('listStudent'),
    listStudent);

router.get('/profile/:id',
    authUser, 
    roleMiddleware(['faculty','student','admin']), 
    checkPermission('viewStudent'),
    getStudent);

router.post('/',
    authUser,
    roleMiddleware(['faculty','admin']),
    checkPermission('addStudent'),
    registerStudent);

router.put('/profile/:id',
    authUser, 
    roleMiddleware(['admin']), 
    checkPermission('editStudent'), 
    updateStudent);

router.delete('/profile/:id',
    authUser, 
    roleMiddleware(['admin']), 
    checkPermission('delStudent'), 
    removeStudent);

export default router;