<template>
    <n-button quaternary circle @click="add2favorate()" :type="isFavorite ? 'primary' : 'default'">
        <material-symbol v-if="isFavorite" class="material-symbols-outlined-filled">favorite</material-symbol>
        <material-symbol v-else>favorite</material-symbol>
    </n-button>
</template>

<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import type { Ref } from 'vue';
import { computed } from 'vue';

// Define props with name as required string
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
});

// Get favorite names from local storage
const favoriteNames: Ref<string[]> = useLocalStorage('favorite-names', [])

// Compute if the current item is a favorite
const isFavorite = computed(() => favoriteNames.value.includes(props.name))

// Function to add or remove item from favorites
function add2favorate() {
    if (isFavorite.value) {
        // If item is already a favorite, remove it from favorites
        favoriteNames.value = favoriteNames.value.filter(name => name !== props.name)
    } else {
        // If item is not a favorite, add it to favorites
        favoriteNames.value.push(props.name)
    }
}
</script>