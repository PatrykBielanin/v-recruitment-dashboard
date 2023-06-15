<script setup>
    import IconEdit from '../icons/IconEdit.vue'
    import IconDelete from '../icons/IconDelete.vue'
    import AppModal from '../partials/AppModal.vue'

    import {ref} from 'vue'
    import { useAppStore } from '../../stores/app';
    const store = useAppStore()

    const openModal = ref(false)
    const defaultAvatarUrl = ref('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')

    const deleteItem = (id) => {
        store.deleteItem(id)
        openModal.value = false
    }

    defineProps({
        id: {
            type: Number,
            required: true
        },
        avatar: {
            type: String,
            required: false,
            default: ''
        }
    })
</script>

<template>
    <tr class="users-list-item">
        <td>
            <img class="user-list-item-avatar" :src="avatar.length != 0 ? avatar : defaultAvatarUrl" alt="User profile avatar">
        </td>

        <td>
            <slot />
        </td>

         <td class="users-list-item-actions">
            <div>
                <RouterLink :to="'/edit/' + id">
                    <IconEdit></IconEdit>
                </RouterLink>
            </div>
            <div @click="openModal = true">
                <IconDelete></IconDelete>
            </div>
        </td>
    </tr>

    <AppModal
        @accepted="deleteItem(id)"
        @canceled="openModal = false"
        :isModalOpen="openModal"
    >
        Are you sure you want to delete this user?
    </AppModal>
</template>
