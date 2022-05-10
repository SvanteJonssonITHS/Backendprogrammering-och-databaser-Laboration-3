<template>
	<UserModal v-if="showModal" @close="showModal = false" />
	<div class="w-screen min-h-screen flex flex-col align-center items-center md:flex-row">
		<aside class="w-11/12 md:w-1/5 flex flex-col justify-center p-2 order-3 md:order-1">
			<LastRoll :user="lastRoll.user" :value="lastRoll.value" class="mb-2" />
			<TopList :rolls="topList" />
		</aside>
		<main class="w-11/12 md:w-3/5 flex flex-col justify-center items-center order-1 md:order-2">
			<h2 class="text-7xl font-semibold">{{ totalValue }}</h2>
			<ul class="w-full flex justify-center flex-wrap">
				<li v-for="(dice, index) in diceArray" :key="index">
					<Dice :value="dice" class="m-2" />
				</li>
			</ul>
			<button class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md" @click="rollDice">
				Roll dice
			</button>
		</main>
	</div>
</template>

<script>
	import UserModal from './components/UserModal.vue';
	import Dice from './components/Dice.vue';
	import LastRoll from './components/LastRoll.vue';
	import TopList from './components/TopList.vue';

	export default {
		name: 'App',
		components: {
			UserModal,
			Dice,
			LastRoll,
			TopList
		},
		data() {
			return {
				username: '',
				showModal: true,
				diceArray: [0, 0, 0, 0, 0, 0],
				totalValue: 0,
				topList: [],
				topListLastItem: null,
				lastRoll: {
					user: '',
					value: null
				}
			};
		},
		mounted() {
			this.checkUsername();
			this.getTopList();

			this.sockets.subscribe('diceRoll', ({ user, value }) => {
				this.lastRoll = {
					user,
					value
				};

				if (
					(this.topListLastItem && this.topListLastItem < value) ||
					!this.topListLastItem ||
					this.topList.length < 10
				) {
					this.getTopList();
				}
			});
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
			},
			async getTopList() {
				const request = await fetch('/api/diceRolls?limit=10');
				const response = await request.json();

				if (response.data && response.data.length > 0) {
					this.topList = [];

					response.data.forEach((item) => {
						this.topList.push({
							user: item.user,
							value: item.value
						});
					});

					this.topListLastItem = this.topList[this.topList.length - 1].value;
				}
			}
		},
		watch: {
			totalValue(newValue) {
				this.$socket.emit('diceRoll', this.username, newValue);
			}
		}
	};
</script>
