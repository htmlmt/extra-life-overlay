import { fetchFromDonorDrive } from '@/api';

import store from '../index.js';

let lastDonation;
let lastDonationUrl;
let offset;

const actions = {
	getLastDonation: ({ commit }, data) => {
		if (data.teamID) {
			lastDonationUrl = `teams/${data.teamID}/donations`;
		} else {
			lastDonationUrl = `participants/${data.participantID}/donations`;
		}
		
		fetchLastDonationFunction(
			offset,
			lastDonationUrl,
			{
				limit: 1,
				orderBy: 'createdDateUTC DESC'
			},
		);
	}
}

function fetchLastDonationFunction(offset, endpoint, params) {
	fetchFromDonorDrive(offset, endpoint, params)
	.then((response) => {
		lastDonation = response[0];
		
		store.commit('saveLastDonation', lastDonation);
	})
	.catch((error) => {
		// eslint-disable-next-line
		console.error(error)
	});
}

const mutations = {
	saveLastDonation(state, lastDonation) {
		state.lastDonation = lastDonation
	}
};

const getters = {
	lastDonation: state => state.lastDonation,
};

export default {
	state: () => ({
		lastDonation: {},
	}),
	getters,
	actions,
	mutations,
};
