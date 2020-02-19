let formatter = (userId) => {
	if (userId != undefined){
		return userId;
	} else {
		return 'Unknown';
	}
};

export default formatter;