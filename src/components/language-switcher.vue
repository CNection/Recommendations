<template>
    <n-dropdown trigger="click" :options="options" @select="(key: string) => {
        key
            ? $i18n.locale = key
            : $i18n.locale = navigator.language
    }">
        <n-button quaternary circle>
            <material-symbol :size="18">language</material-symbol>
        </n-button>
    </n-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let options = ref([
    { label: 'English', key: 'en' },
    { label: '简体中文', key: 'zh' },
    { label: 'Deutsch', key: 'de' },
    { label: '日本語', key: 'ja' },
    { label: 'Español', key: 'es' },
]);

let navigator = ref(window.navigator);

</script>

<style scoped></style>