const firebaseAdmin = require('firebase-admin');

const extractUserIdFromTokenToBody = async (req, res, next) => {

  let error = '';

  if( req.headers.authorization ){
    await firebaseAdmin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then( decodedToken => req.body.tokenUserId = decodedToken.uid )
      .catch( err =>  {
        req.body.tokenUserId = null;
        error = err;
      });

      if(req.body.tokenUserId){
        next();
        return;
      }
  }

  res.status(401).json( {
    message: 'You must be authenticated',
    details: error,
    code: 401,
  } );
}

module.exports = {
  extractUserIdFromTokenToBody
}