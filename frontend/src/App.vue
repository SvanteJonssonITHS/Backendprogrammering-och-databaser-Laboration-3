<template>
	<UserModal v-if="showModal" @close="showModal = false" />
</template>

<script>
	import UserModal from './components/UserModal.vue';

	export default {
		name: 'App',
		components: {
			UserModal
		},
		data() {
			return {
				username: '',
				showModal: true
			};
		},
		mounted() {
			this.checkUsername();
		},
		methods: {
			checkUsername() {
				// check if the username is set in the sessionStorage
				const username = sessionStorage.getItem('username');

				// if not, show the modal
				if (username) {
					this.showModal = false;
					this.username = username;
				}
			}
		}
	};
</script>
