<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import json from './data.json';
import { darkTheme, useOsTheme } from 'naive-ui';
import { useLocalStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import type { pxfy } from 'seemly';
import LanguageSwitcher from './components/language-switcher.vue';

let { t } = useI18n();
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
        alert(t('share_error'))
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
                        <language-switcher />
                        <n-button quaternary circle @click="switchTheme()" class="theme-toggle"
                            :class="{ 'theme-toggle--toggled': (theme === null) }" attr-type="button" title="Toggle theme"
                            aria-label="Toggle theme">
                            <template #icon>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em"
                                    fill="currentColor" stroke-linecap="round" class="theme-toggle__classic"
                                    viewBox="0 0 32 32">
                                    <clipPath id="theme-toggle__classic__cutout">
                                        <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
                                    </clipPath>
                                    <g clip-path="url(#theme-toggle__classic__cutout)">
                                        <circle cx="16" cy="16" r="9.34" />
                                        <g stroke="currentColor" stroke-width="1.5">
                                            <path d="M16 5.5v-4" />
                                            <path d="M16 30.5v-4" />
                                            <path d="M1.5 16h4" />
                                            <path d="M26.5 16h4" />
                                            <path d="m23.4 8.6 2.8-2.8" />
                                            <path d="m5.7 26.3 2.9-2.9" />
                                            <path d="m5.8 5.8 2.8 2.8" />
                                            <path d="m23.4 23.4 2.9 2.9" />
                                        </g>
                                    </g>
                                </svg>
                            </template>
                        </n-button>
                        <about></about>
                    </n-space>
                </n-space>
            </n-layout-header>
            <!-- <n-layout-content content-style="padding: 24px; display:flex; flex-flow: row wrap;"> -->
            <n-layout-content
                :content-style="{ 'padding': '24px', 'display': (data.length === 0) ? '' : 'flex', 'flex-flow': 'row wrap' }">
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
                <!-- 空白页 -->
                <n-empty v-if="data.length === 0" :description="$t('empty')" />
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
