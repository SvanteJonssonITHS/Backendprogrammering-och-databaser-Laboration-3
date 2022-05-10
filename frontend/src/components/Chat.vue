<template>
	<div class="bg-stone-300 p-2 list-decimal list-inside rounded-md">
		<h2 class="font-semibold text-lg">Chat</h2>
		<ul class="my-2 max-h-80 overflow-y-scroll" id="chat">
			<li v-for="item in messages" :key="item._id">
				<span class="font-bold">{{ item.user }}</span>
				<span class="mx-2">{{ item.value }}</span>
				<span class="text-sm text-stone-500">{{ item.createdAt }}</span>
			</li>
		</ul>
		<form @submit.prevent="submit" class="flex flex-col">
			<input type="text" v-model="message" class="border-2 border-neutral-500 p-2 outline-none rounded-md" />
			<button class="bg-blue-500 hover:bg-blue-400 transition ease duration-150 text-white px-4 py-2 rounded-md">
				Send
			</button>
		</form>
	</div>
</template>
<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	export default {
		name: 'Chat',
		props: {
			username: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				messages: [],
				message: ''
			};
		},
		async mounted() {
			await this.getMessages();
			this.scrollToBottom();

			this.sockets.subscribe('message', ({ user, value, createdAt }) => {
				this.messages.push({
					user,
					value,
					createdAt: dayjs(createdAt).fromNow()
				});
			});
		},
		methods: {
			async getMessages() {
				const request = await fetch('/api/messages');
				const response = await request.json();

				if (!response.success) return;

				// Format the messages createdAt date
				response.data.forEach((message) => {
					message.createdAt = dayjs(message.createdAt).fromNow();
				});

				this.messages = response.data;
			},
			submit() {
				if (this.message != '' && this.message.length > 0) {
					this.$socket.emit('message', this.username, this.message);
					this.message = '';
				}
			},
			scrollToBottom() {
				const chat = document.getElementById('chat');
				chat.scrollTop = chat.scrollHeight;
			}
		},
		watch: {
			messages: {
				handler() {
					this.scrollToBottom();
				},
				deep: true
			}
		}
	};
</script>
