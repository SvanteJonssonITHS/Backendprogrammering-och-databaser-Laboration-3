<template>
	<ul v-if="rolls.length > 0" class="flex flex-col bg-stone-300 p-2 list-decimal list-inside rounded-md">
		<li v-for="(item, index) in rolls" :key="index" class="border-b-2 border-stone-400 p-2">
			<span class="float-right">{{ item.user }} : {{ item.value }}</span>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'LastRoll',
		props: {
			rolls: {
				type: Array,
				Required: true,
				default: () => []
			}
		}
	};
</script>
