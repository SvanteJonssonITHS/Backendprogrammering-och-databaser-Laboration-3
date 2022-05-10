<template>
	<UserModal v-if="showModal" @close="showModal = false" />
	<main class="w-screen h-m-screen flex flex-col justify-center items-center">
		<h2 class="text-7xl font-semibold">{{ totalValue }}</h2>
		<ul class="w-11/12 md:3/5 h-full flex justify-center flex-wrap">
			<li v-for="(dice, index) in diceArray" :key="index">
				<Dice :value="dice" class="m-2" />
			</li>
		</ul>
		<button class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md" @click="rollDice">Roll dice</button>
	</main>
</template>

<script>
	import UserModal from './components/UserModal.vue';
	import Dice from './components/Dice.vue';

	export default {
		name: 'App',
		components: {
			UserModal,
			Dice
		},
		data() {
			return {
				username: '',
				showModal: true,
				diceArray: [0, 0, 0, 0, 0, 0],
				totalValue: 0
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
			},
			async rollDice() {
				const request = await fetch('/api/rollDice?amount=6');
				const response = await request.json();

				// if the request was successful, set the dice array
				if (response.data[0]) {
					this.totalValue = response.data[0].total;
					this.diceArray = response.data[0].dice;
				}
			}
		}
	};
</script>
