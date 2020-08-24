const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      include: [user],
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
  
        res.render('homepage', {
          posts,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  // get single post
  router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
          User,
          {
            model: Comment,
            include: [User],
          },
        ],
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        const post = dbPostData.get({ plain: true });
  
        res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;