import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
	state:{
		collapse:true
	},
	getter:{

	},
	mutations:{
		changeCollpase(state){
			state.collapse = !state.collapse;
		}
	},
	actions:{

	},
	modules:{

	}
});


export default store;