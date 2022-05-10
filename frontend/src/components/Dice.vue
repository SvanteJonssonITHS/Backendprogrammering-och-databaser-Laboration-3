<template>
	<div class="dice" v-if="value >= 1 && value <= 6">
		<span
			:class="`dot 
            ${value == 1 && index == 1 ? 'mm' : ''}
            ${value == 2 && index == 1 ? 'tl' : ''}
            ${value == 2 && index == 2 ? 'br' : ''}
            ${value == 3 && index == 1 ? 'tl' : ''}
            ${value == 3 && index == 2 ? 'mm' : ''}
            ${value == 3 && index == 3 ? 'br' : ''}
            ${value == 4 && index == 1 ? 'tl' : ''}
            ${value == 4 && index == 2 ? 'tr' : ''}
            ${value == 4 && index == 3 ? 'bl' : ''}
            ${value == 4 && index == 4 ? 'br' : ''}
            ${value == 5 && index == 1 ? 'tl' : ''}
            ${value == 5 && index == 2 ? 'tr' : ''}
            ${value == 5 && index == 3 ? 'mm' : ''}
            ${value == 5 && index == 4 ? 'bl' : ''}
            ${value == 5 && index == 5 ? 'br' : ''}
            ${value == 6 && index == 1 ? 'tl' : ''}
            ${value == 6 && index == 2 ? 'tr' : ''}
            ${value == 6 && index == 3 ? 'ml' : ''}
            ${value == 6 && index == 4 ? 'mr' : ''}
            ${value == 6 && index == 5 ? 'bl' : ''}
            ${value == 6 && index == 6 ? 'br' : ''}
            `"
			v-for="index in value"
			:key="index"
		/>
	</div>
	<div class="dice" v-else>
		<p class="mm text-7xl font-bold text-white">?</p>
	</div>
</template>
<script>
	export default {
		name: 'Dice',
		props: {
			value: {
				type: Number,
				default: 1,
				validator(value) {
					return value >= 1 && value <= 6;
				}
			}
		}
	};
</script>

<style scoped>
	.dice {
		@apply bg-red-500 w-32 h-32 rounded-xl grid grid-cols-3 grid-rows-3 place-items-center;
	}
	.dot {
		@apply bg-white w-7 h-7 rounded-full block;
	}
	.tl {
		@apply row-start-1 col-start-1;
	}
	.tr {
		@apply row-start-1 col-start-3;
	}
	.ml {
		@apply row-start-2 col-start-1;
	}
	.mm {
		@apply row-start-2 col-start-2;
	}
	.mr {
		@apply row-start-2 col-start-3;
	}
	.bl {
		@apply row-start-3 col-start-1;
	}
	.br {
		@apply row-start-3 col-start-3;
	}
</style>
