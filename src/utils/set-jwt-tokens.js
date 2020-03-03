import { sign } from 'jsonwebtoken';

function setTokens(userId) {
	const sevenDays = 60 * 60 * 24 * 7 * 1000;
	const fifteenMins = 60 * 15 * 1000;
	const accessUser = {
		id: userId
	};
	const accessToken = sign(
		{ user: accessUser },
		process.env.JWT_SECRET,
		{
			expiresIn: fifteenMins
		}
	);
	const refreshUser = {
		id: userId
	};
	const refreshToken = sign(
		{ user: refreshUser },
		process.env.JWT_SECRET,
		{
			expiresIn: sevenDays
		}
	);

	return { accessToken, refreshToken };
}

export default setTokens;