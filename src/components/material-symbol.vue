<template>
    <span class="material-symbols-outlined"
        :style="{ 'vertical-align': 'sub', 'font-size': `${typeof size === 'number' ? `${size}px` : size}` }">
        <slot></slot>
    </span>
</template>
<script lang="ts" setup>
const props = defineProps({
    size: {
        type: [String, Number],
        default: 24
    }
});
</script>