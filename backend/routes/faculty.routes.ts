import {Router} from 'express';
const router=Router();
import {
listFaculty,
  getFaculty,
  registerFaculty,
  updateFaculty,
  removeFaculty,
    
} from "../controller/faculty.controller.js";

import {roleMiddleware} from "../middleware/role.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import {authUser} from "../middleware/auth.middleware.js";

router.get('/',
    roleMiddleware(['admin','seller','customer']),
    checkPermission('listFaculty'),
    listFaculty);
    
router.post('/',
    authUser,
    roleMiddleware(['admin']),
    checkPermission('addFaculty'),
    registerFaculty);

router.get('/:id',
    authUser, 
    roleMiddleware(['student','admin', 'faculty']), 
    checkPermission('viewFaculty'),
    getFaculty);

router.put('/profile/:id',
    authUser, 
    roleMiddleware(['admin','faculty']), 
    checkPermission('editFaculty'), 
    updateFaculty);

router.delete('/:id',
    roleMiddleware(['admin', 'faculty']), 
    checkPermission('delFaculty'), 
    removeFaculty);


export default router;