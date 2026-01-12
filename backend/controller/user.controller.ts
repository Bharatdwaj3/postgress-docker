import { 
  getAllUsersService, 
  getUserByIdService, 
  createUserService, 
  updateUserService, 
  deleteUserService 
} from '../models/userModel.js';

const handleResponse = (res: string, status: string, message: string, data = null ) => {
  res.status(status).json({ status, message, data });
};

export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

// ... Similar logic for getUserById, updateUser, and deleteUser