import { fetchFromDonorDrive } from '@/api';

import store from '../index.js';

let team;
let offset;

const actions = {
	getTeam: ({ commit }, data) => {
		fetchTeamFunction(
			offset,
			`teams/${data.teamID}`,
		);
	}
}

function fetchTeamFunction(offset, endpoint, params) {
	fetchFromDonorDrive(offset, endpoint, params)
	.then((response) => {
		team = response;
		
		store.commit('saveTeam', team);
	})
	.catch((error) => {
		// eslint-disable-next-line
		console.error(error)
	});
}

const mutations = {
	saveTeam(state, team) {
		state.team = team
	}
};

const getters = {
	team: state => state.team,
};

export default {
	state: () => ({
		team: {},
	}),
	getters,
	actions,
	mutations,
};
