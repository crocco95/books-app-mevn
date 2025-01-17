const socialService = require('../services/SocialService');

const add = ( req, res ) => {
  const userId = req.params.userId;
  const followingUserId = req.body.followingUserId;

  if( !followingUserId ){
    res.status(400).json({
      message: 'You must specify the user to follow'
    })
    return;
  }

  if( userId === followingUserId){
    res.status(400).json({
      message: 'You cannot follow yourself'
    })
    return;
  }

  socialService
    .add(userId, followingUserId)
    .then( f => res.status(201).json(f))
    .catch( err => res.status(400).json(err));
};

const list = ( req, res ) => {
  const userId = req.params.userId;

  socialService
    .list(userId)
    .then( f => res.status(200).json(f))
    .catch( err => res.status(400).json(err));
};

const get = ( req, res ) => {

  const userId = req.params.userId;
  const followingUserId = req.params.followingUserId;

  socialService
    .get(userId, followingUserId)
    .then( f => res.status(200).json(f))
    .catch( err => res.status(400).json(err));
};

const remove = ( req, res ) => {
  
  const userId = req.params.userId;
  const followingUserId = req.params.followingUserId;

  if(req.body.tokenUserId !== userId){
    res.status(403).json({
      message: 'Unauthorized',
    });
    return;
  }

  socialService
    .remove(userId, followingUserId)
    .then( f => res.status(200).json(f))
    .catch( err => res.status(400).json(err));
};

module.exports = {
  add,
  list,
  get,
  remove
}