import axios from 'axios';
import store from '../index.js';

let shortUrl;
let participant;
let page;
let domain;
let getUrl;

const actions = {
	getShortUrl: ({ commit }, data) => {
		participant = data.participant;
		page = participant.links.page;
		domain = page.split('/index.cfm')[0];
		getUrl = `${domain}/index.cfm?fuseaction=donordrive.ajaxGetShortUrl&url=${encodeURIComponent(participant.links.page)}&eventID=${participant.eventID}`;
		
		axios({
			url: getUrl
		}).then((response) => {
			console.log(response.data);
		});
	}
}

const mutations = {
	saveShortUrl(state, shortUrl) {
		state.shortUrl = shortUrl
	}
};

const getters = {
	shortUrl: state => state.shortUrl,
};

export default {
	state: () => ({
		shortUrl: '',
	}),
	getters,
	actions,
	mutations,
};
