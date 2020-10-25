import Vue from 'vue';
import Vuex from 'vuex';

import lastDonationModule from './modules/last-donation';
import participantModule from './modules/participant';
import teamModule from './modules/team';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
    mutations: {},
    getters: {},
    modules: {
		lastDonation: lastDonationModule,
		participant: participantModule,
		team: teamModule,
    },
});
