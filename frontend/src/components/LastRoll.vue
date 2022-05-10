<template>
	<div class="flex flex-col bg-stone-300 p-2 rounded-md">
		<h2 class="font-semibold text-lg mr-auto">Last roll</h2>
		<p v-if="value >= 6 && value <= 36 && user != ''">
			<span class="font-semibold">{{ user }}</span> rolled a
			{{ value }}
		</p>
		<p v-else>No one has rolled yet</p>
	</div>
</template>
<script>
	export default {
		name: 'LastRoll',
		props: {
			user: {
				type: String,
				default: '',
				Required: true
			},
			value: {
				type: Number,
				default: 1,
				Required: true,
				validator(value) {
					return value >= 6 && value <= 36;
				}
			}
		}
	};
</script>
