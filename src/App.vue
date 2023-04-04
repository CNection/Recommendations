<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import json from './data.json';
import { darkTheme, useOsTheme } from 'naive-ui';
import { useLocalStorage } from '@vueuse/core';

let osTheme = (useOsTheme().value === 'dark') ? darkTheme : null;
let theme = ref(osTheme);
let tags: Ref<string | null> = ref(null)
let options = ref([
    { label: 'Official', value: 'Official' },
    { label: 'Dictionary', value: 'Dictionary' },
    { label: 'Education', value: 'Education' },
    { label: 'Favorite', value: 'Favorite' },
]);
let favoriteNames: Ref<string[]> = useLocalStorage('favorite-names', [])
let data = computed(() => {
    if (tags.value === null) {
        return json;
    } else if (tags.value === 'Favorite') {
        return json.filter((item) => {
            return favoriteNames.value.includes(item.name.en);
        });
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

function shareWeb(url: string, title: string, text: string) {
    try {
        window.navigator.share({
            title: title,
            text: text,
            url: url,
        })
    } catch (e) {
        alert("Your browser doesn't support Web Share API")
        console.log(e)
    }
}

</script>

<template>
    <n-config-provider :theme="theme">
        <n-global-style />
        <n-layout>
            <n-layout-header>
                <n-space justify="space-between" align="end" style="padding: 16px 32px;">
                    <n-space>
                        <n-gradient-text type="success" :size="24">
                            {{ $t('title') }}
                        </n-gradient-text>
                    </n-space>
                    <n-space>
                        <n-select v-model:value="tags" :placeholder="$t('select_tags')" :options="options" clearable
                            filterable />
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
                        <about></about>
                    </n-space>
                </n-space>
            </n-layout-header>
            <n-layout-content content-style="padding: 24px; display:flex; flex-flow: row wrap;">
                <n-card class="cards" v-for="item in data" hoverable embedded>
                    <template #header>{{ $t(item.name.en + '.name') }}</template>
                    <template #header-extra>
                        <n-tag v-for="tag in item.tag" type="success" :bordered="false" size="small">{{ tag }}</n-tag>
                    </template>
                    <template #default>{{ $t(item.name.en + '.desc') }}</template>
                    <template #action>
                        <n-space justify="space-between">
                            <n-space>
                                <n-button style="float: right;" type="primary" @click="openWeb(item.url)">{{
                                    $t('open')
                                }}</n-button>
                            </n-space>
                            <n-space>
                                <n-button quaternary circle @click="shareWeb(
                                    item.url,
                                    $t(item.name.en + '.name'),
                                    $t(item.name.en + '.desc')
                                )">
                                    <material-symbol>share</material-symbol>
                                </n-button>
                                <card-favorate :name="item.name.en" />
                            </n-space>
                        </n-space>
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
