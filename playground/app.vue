<template>
	<div>
		<div v-if="content" class="w-2xl mx-auto my-12">
			<Enhancer :content="content" />
			<!-- <pre>{{ content }}</pre> -->
		</div>
		<div v-else>
			<p>The article does not exist.</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: content } = await useAsyncData(route.path, () => queryCollection("content").path(route.path).first());
</script>
