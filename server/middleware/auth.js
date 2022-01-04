import jwt from 'jsonwebtoken'

const authenticate = async (req, res, next) => { //next, do something then move to the next thing

    try {

        const token = req.headers.authorization.split(" ")[1];

        if ( token == null ) return res.status(401).json({message: "Missing token"});

        const isCustomAuth = token.length < 500; //check if the token is from our local token or googleAuth, if more than 500 means it is from google.

        let decodedData;

        if ( token && isCustomAuth ){
            decodedData = jwt.verify(token, process.env.TOKEN_KEY)

            req.userId = decodedData?.id;  // to your backend, anytime you use authenticate, the req.body will already include a req.userId. You can use this build logic on allowing that user to delete only once for example.
        } else { // decode data from GoogleAuth
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub; //sub is a google auth function to differentiate ids.
        }

        next()

        //process, user wants to like post, they click, then they go through this auth middleware that only initiates the next() function once they have verified the authority for the user to like the post.

    } catch (error) {
        console.log(error)
    }
};

export default authenticate;