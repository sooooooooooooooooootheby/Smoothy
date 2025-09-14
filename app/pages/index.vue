<template>
	<div>
		<div v-if="content">
			<Enhancer :content="content" />
		</div>
		<div v-else>
			<p>文章不存在</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: content } = await useAsyncData(route.path, () => queryCollection("content").path(route.path).first());
</script>
