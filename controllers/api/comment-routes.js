const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, (req, res) => {
    Comment.create({ ...req.body, userId: req.session.userId })
      .then(dbCommentData => {
        res.json(dbCommentData);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

module.exports = router;