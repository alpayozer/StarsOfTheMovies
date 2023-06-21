import express from 'express';

import { createMovie, updateMovie, deleteMovie, getMovie, getAllMovies ,getLastMovies} from '../controller/movie-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { loginUser, signupUser, logoutUser,deleteUser ,getUser} from '../controller/user-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';
import { addWatchlist,getWatchlist,deleteWatchlist } from '../controller/watchlist-controller.js';
import { newRate,getRates } from '../controller/rate-controller.js';

import upload from '../utils/upload.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);
router.delete('/udelete/:id',authenticateToken,deleteUser);
router.get('/getuser/:id',authenticateToken,getUser);

router.post('/token', createNewToken);

router.post('/create', authenticateToken, createMovie);
router.put('/update/:id', authenticateToken, updateMovie);
router.delete('/delete/:id', authenticateToken, deleteMovie);
router.get('/post/:id', authenticateToken, getMovie);
router.get('/posts', authenticateToken, getAllMovies);
router.get('/lastmovies',authenticateToken,getLastMovies);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

router.post('/rate/new',authenticateToken,newRate);
router.get('/rates/:id',authenticateToken,getRates);

router.post('/watchlist/add',authenticateToken,addWatchlist);
router.get('/watchlist/:id',authenticateToken,getWatchlist);
router.delete('/watchlist/delete/:id',authenticateToken,deleteWatchlist);

export default router;