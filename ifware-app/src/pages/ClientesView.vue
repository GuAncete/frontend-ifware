<template>
	<div class="clientes-page">
		<ClientsCrud />
	</div>
</template>

<script>
import ClientsCrud from '@/components/ClientsCrud.vue'
export default {
	components: { ClientsCrud },
}
</script>

<style scoped>
.clientes-page{ padding: 12px }
</style>