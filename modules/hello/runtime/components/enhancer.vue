<template>
    <div class="enhancer">
        <ContentRenderer :value="props.content" />
    </div>
</template>

<script lang='ts' setup>
const props = defineProps(['content'])
</script>