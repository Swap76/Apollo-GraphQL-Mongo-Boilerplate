import jwt from 'jsonwebtoken';
// import { redisClient } from '../config/redis';

const jwtAuth = async ({req}) =>  {
	const authHeader = req.headers.authorization;
	let isAuth = false;
	if (!authHeader) return { isAuth };
	const token = authHeader.split(' ')[1];
	if (!token || token === '') return { isAuth };
	let decodedToken;
	try {
		decodedToken = jwt.verify(token,process.env.JWT_SECRET);
	} catch (error) {
		return { isAuth };
	}
	if (!decodedToken) return { isAuth };
	isAuth = true; 
	return { isAuth, token, userId:decodedToken.userId};
};

export default jwtAuth;