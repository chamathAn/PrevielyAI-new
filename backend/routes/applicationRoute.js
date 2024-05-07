const routes = require('express').Router();
const { createPost, getAllPosts, getPost } =  require('../controllers/applicationController');
const {authonticateToken } = require('../middlewares/authonticateToken');

routes.post('/', createPost);
routes.get('/', getAllPosts);
routes.get('/:id', getPost);

module.exports = routes