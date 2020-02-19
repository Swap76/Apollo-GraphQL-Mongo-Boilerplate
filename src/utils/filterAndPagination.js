import responseFinal from './sendResponse';

export const filterAndPagination = (where, limit, skip) => {
	try {
		where = where ? where : {};
		limit = limit ? limit : 15;
		skip = skip ? skip : 0;
		let final = {...responseFinal('200','Perfect'),data:{where,limit,skip}};
		return final;
	} catch (error) {
		let final = {...responseFinal('422',`${error.message}`),data:null};
		return final;
	}
};