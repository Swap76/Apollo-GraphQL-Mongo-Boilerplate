import User from '../models/User';
import { verify } from 'jsonwebtoken';
import { setTokens } from '../utils/set-jwt-tokens';

function validateAccessToken(token) {
	try {
		return verify(token, process.env.JWT_SECRET);
	} catch {
		return null;
	}
}

function validateRefreshToken(token) {
	try {
		return verify(token, process.env.JWT_SECRET);
	} catch {
		return null;
	}
}

async function validateTokensMiddleware (req, res, next) {
	const refreshToken = req.cookies['refresh'];
	const accessToken = req.cookies['access'];
	if (!accessToken && !refreshToken) return next();

	const decodedAccessToken = validateAccessToken(accessToken);
	if (decodedAccessToken && decodedAccessToken.user) {
		req.user = decodedAccessToken.user;
		return next();
	}

	const decodedRefreshToken = validateRefreshToken(refreshToken);
	if (decodedRefreshToken && decodedRefreshToken.user) {
		// valid refresh token
		const user = await User.findOne({_id : decodedRefreshToken.user.id});
		// valid user and user token not invalidated
		if (!user || user.tokenCount !== decodedRefreshToken.user.count) {
			res.clearCookie('access');
			res.clearCookie('refresh');
			return next();
		}
		// refresh the tokens
		const userTokens = setTokens(user);
		req.user = decodedRefreshToken.user;

		const cookies = tokenCookies(userTokens);
		res.cookie(...cookies.access);
		res.cookie(...cookies.refresh);
		return next();
	}
	next();
}

export default validateTokensMiddleware;