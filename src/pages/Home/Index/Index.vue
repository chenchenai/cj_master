<template>
	<div class="table">
		<!-- <BaseTable :propsData="config" /> -->
		1111
	</div>
</template>

<script>
	import BaseTable from '@/components/BaseTable'
	import table from './table.config.js'
	export default {
		components: {BaseTable},
		data () {
			return {
				config: {}
			}
		},
		created () {
			this.setConfig()
			console.log(this.config)
		},
		methods: {
			setConfig () {
				this.config = {
					props: {
	          data: [
	          	{a: 111, b: 111},
	          	{a: 222, b: 222},
	          	{a: 333, b: 333}
	          ],
	          border: true,
	          select: true
	        },
	        on: {
	          'handleSort': this.handleSortBySignNum
	        },
	        columns: table(this)
				}
			},
			handleSortBySignNum (a, b, c) {
				console.log(a)
			}
		}
	}
</script>

<style></style>