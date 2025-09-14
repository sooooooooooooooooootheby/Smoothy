<template>
	<div class="codeBlock">
		<div v-if="filename" class="filename">
			<p>{{ filename }}</p>
		</div>
		<Shiki lang="js" :code="code" />
		<div class="copy" @click="copyCode">
			<component :is="icons[copyStatus]" />
		</div>
	</div>
</template>

<script setup lang="ts">
import IconCopy from "./Icon/copy.vue";
import IconCopyCheck from "./Icon/copyCheck.vue";
import IconCopyXmark from "./Icon/copyXmark.vue";

const props = defineProps<{
	className: string;
	code: string;
	filename?: string;
	highlights?: number[];
	language?: string;
	meta?: string;
	style?: string;
}>();

enum CopyState {
	Idle = 0,
	Success = 1,
	Error = 2,
}
const copyStatus = ref<CopyState>(CopyState.Idle);
const icons = {
	[CopyState.Idle]: IconCopy,
	[CopyState.Success]: IconCopyCheck,
	[CopyState.Error]: IconCopyXmark,
};

const copyCode = async () => {
	try {
		await navigator.clipboard.writeText(props.code);
		copyStatus.value = CopyState.Success;
	} catch (err) {
		copyStatus.value = CopyState.Error;
	} finally {
		setTimeout(() => {
			copyStatus.value = CopyState.Idle;
		}, 3000);
	}
};
</script>
