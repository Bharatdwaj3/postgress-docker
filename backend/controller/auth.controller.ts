import { 
  getAllUsersService, 
  getUserByIdService, 
  createUserService, 
  updateUserService, 
  deleteUserService 
} from '../models/userModel.js';


const handleResponse=(res, status, message, data=null)=>{
    res.status(status).json({status, message, data});
};

export const loginUser = async(req, res, next)=>{
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users fetched successfully", users);
      } catch (error) {
        next(error);
      }
}

export const logoutUser = async(req, res, next)=>{
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users fetched successfully", users);
      } catch (error) {
        next(error);
      }
}

