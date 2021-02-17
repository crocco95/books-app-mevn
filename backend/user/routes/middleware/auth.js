const firebaseAdmin = require('firebase-admin');

const extractUserIdFromTokenToBody = async (req, res, next) => {

  let error = false;

  if( req.headers.authorization ){
    await firebaseAdmin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then( decodedToken => req.body.tokenUserId = decodedToken.uid )
      .catch( err =>  {
        error = err;
      });
  }

  if( !error ){
    next();
  }else{
    console.error( error );
    res.status(401).json( {message: error.message} );
  }
}

module.exports = {
  extractUserIdFromTokenToBody
}