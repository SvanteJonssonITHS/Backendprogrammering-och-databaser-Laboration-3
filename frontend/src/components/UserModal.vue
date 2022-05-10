<template>
	<div class="absolute top-0 left-0 w-screen min-h-screen bg-black/50 flex">
		<form @submit.prevent="submit" class="m-auto bg-white text-black p-10 rounded-md">
			<h2 class="text-3xl font-semibold">Set site username</h2>
			<label class="flex flex-col my-10">
				<p class="text-lg mb-2">Username:</p>
				<input
					type="text"
					maxlength="15"
					v-model="username"
					class="border-2 border-neutral-500 p-2 outline-none rounded-md"
				/>
			</label>
			<button
				@click="submit"
				class="bg-blue-500 hover:bg-blue-400 transition ease duration-150 text-white px-4 py-2 rounded-md float-right"
			>
				Set username
			</button>
		</form>
	</div>
</template>
<script>
	export default {
		name: 'UserModal',
		emits: ['close'],
		data() {
			return {
				username: ''
			};
		},
		methods: {
			submit() {
				if (this.username != '' && this.username.length > 0) {
					sessionStorage.setItem('username', this.username);
					this.$emit('close');
				}
			}
		}
	};
</script>
