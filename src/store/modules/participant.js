import { fetchFromDonorDrive } from '@/api';

import store from '../index.js';

let participant;
let offset;

const actions = {
	getParticipant: ({ commit }, data) => {
		fetchParticipantFunction(
			offset,
			`participants/${data.participantID}`,
		);
	}
}

function fetchParticipantFunction(offset, endpoint, params) {
	fetchFromDonorDrive(offset, endpoint, params)
	.then((response) => {
		participant = response;
		
		store.commit('saveParticipant', participant);
	})
	.catch((error) => {
		// eslint-disable-next-line
		console.error(error)
	});
}

const mutations = {
	saveParticipant(state, participant) {
		state.participant = participant
	}
};

const getters = {
	participant: state => state.participant,
};

export default {
	state: () => ({
		participant: {},
	}),
	getters,
	actions,
	mutations,
};
