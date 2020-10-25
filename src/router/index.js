import Vue from 'vue';
import VueRouter from 'vue-router';

import Overlay from '@/views/Overlay';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Overlay,
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
});

export default router;
