<script setup>
    import IconBackward from '../icons/IconBackward.vue'
    import {ref} from 'vue'
    import { useAppStore } from '../../stores/app';
    const store = useAppStore()

    defineProps({
        pages: {
            type: Number,
            required: false,
            default: 1
        }
    })

    const togglePagination = (index) => {
        store.togglePagination(index)
    }
</script>

<template>
    <div class="pagination">
        <ul>
            <li @click="togglePagination(1)">
                <IconBackward></IconBackward>
            </li>

            <li
                v-for="page in pages"
                @click="togglePagination(page)"
                :class="{'pagination-active': page == store.activePage}"
            >
                {{ page }}
            </li>

            <li @click="togglePagination(pages)">
                <IconBackward class="rotate-180"></IconBackward>
            </li>
        </ul>
    </div>
</template>
