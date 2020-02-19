let response = (code,messsage) => {
	let success = true;
	if (code[0] != '2') {
		success = false;
	}
	return ({
		'code':`${code}`,
		'success':success,
		'message':`${messsage}`
	});
};

export default response;