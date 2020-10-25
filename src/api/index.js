import axios from 'axios';
import qs from 'qs';

const fetchFromDonorDrive = (offset, endpoint, params) => new Promise((resolve) => {
	const apiUrl = `https://www.extra-life.org/api/${endpoint}`;
	
	axios({
		url: apiUrl,
		params: params,
		paramsSerializer: function(params) {
			return qs.stringify(params, {arrayFormat: 'indices'})
		},
	}).then((response) => {
		resolve(response.data);
	});
});

export { fetchFromDonorDrive };
