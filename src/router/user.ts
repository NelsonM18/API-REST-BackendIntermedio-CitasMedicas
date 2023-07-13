import exprees from 'express';
import { deleteUser, getAllUsers } from '../controllers/user';
import { isAuthenticated } from '../middlewares';

export default (router: exprees.Router) => {
    
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, deleteUser);
}