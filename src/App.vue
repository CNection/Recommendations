<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import json from './data.json';
import { darkTheme, useOsTheme } from 'naive-ui';

let osTheme = (useOsTheme().value === 'dark') ? darkTheme : null;
let theme = ref(osTheme);
let tags: Ref<string | null> = ref(null)
let options = ref([
    { label: 'Official', value: 'Official' },
    { label: 'Dictionary', value: 'Dictionary' },
    { label: 'Education', value: 'Education' },
]);
let data = computed(() => {
    if (tags.value === null) {
        return json;
    } else {
        return json.filter((item) => {
            return item.tag.includes(<string>tags.value);
        });
    }
});

function switchTheme() {
    (theme.value === null) ? theme.value = darkTheme : theme.value = null;
}

function openWeb(link: string) {
    window.open(link);
}

</script>

<template>
    <n-config-provider :theme="theme">
        <n-layout>
            <n-layout-header>
                <n-space justify="space-between" align="end" style="padding: 16px 32px;">
                    <n-space>
                        <n-gradient-text type="success" :size="24">
                            {{ $t('title') }}
                        </n-gradient-text>
                    </n-space>
                    <n-space>
                        <n-select style="min-width: 120px;" v-model:value="tags" placeholder="select tags"
                            :options="options" clearable />
                        <n-button quaternary circle
                            @click="($i18n.locale.slice(0, 2) === 'zh') ? $i18n.locale = 'en' : $i18n.locale = 'zh'">
                                <material-symbol v-if="$i18n.locale.slice(0, 2) === 'zh'">globe_uk</material-symbol>
                                <material-symbol v-else>globe_asia</material-symbol>
                        </n-button>
                        <n-button quaternary circle @click="switchTheme()">
                            <template #icon>
                                <material-symbol v-if="theme === null">dark_mode</material-symbol>
                                <material-symbol v-else>light_mode</material-symbol>
                            </template>
                        </n-button>
                    </n-space>
                </n-space>
            </n-layout-header>
            <n-layout-content content-style="padding: 24px; display:flex; flex-flow: row wrap;">
                <n-card class="cards" v-for="item in data">
                    <template #header>{{ $t(item.name.en + '.name') }}</template>
                    <template #header-extra>
                        <n-tag v-for="tag in item.tag" type="success" :bordered="false" size="small">{{ tag }}</n-tag>
                    </template>
                    <template #default>{{ $t(item.name.en + '.desc') }}</template>
                    <template #footer>
                        <n-button style="float: right;" quaternary type="primary" @click="openWeb(item.url)">{{
                            $t('open')
                        }}</n-button>
                    </template>
                </n-card>
            </n-layout-content>
        </n-layout>
    </n-config-provider>
</template>

<style scoped>
.cards {
    flex: 1 1 340px;
    margin: 16px 8px 0 8px
}
</style>
