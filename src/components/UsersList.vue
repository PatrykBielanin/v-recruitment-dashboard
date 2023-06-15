<script setup>
    import UsersListHeader from './UsersList/UsersListHeader.vue'
    import UsersListItem from './UsersList/UsersListItem.vue'
    import AppPagination from './partials/AppPagination.vue'

    import {ref, reactive, onMounted, watch} from 'vue'
    import { useAppStore } from '../stores/app';
    const store = useAppStore()

    const users = ref(store.getUsers)

    watch(() => [store.users.length, store.activePage], function() {
        users.value = store.getUsers
    })

    const toggleGetUsersList = () => {
        store.getUsersList()
    }

    onMounted(() => {
        if(store.users.length == 0) {
            toggleGetUsersList()
        }
    })
</script>

<template>
    <h1>User list</h1>

    <div class="hero">
        <UsersListHeader></UsersListHeader>

        <p v-if="users.length == 0" class="users-list-not-found">
            No users found
        </p>

        <table v-else>
            <thead>
                <tr>
                    <th></th>
                    <th><b>Full Name</b></th>
                    <th><b>Action</b></th>
                </tr>
            </thead>
            <tbody>
                <template v-for="user in users">
                    <UsersListItem :id="user.id" :avatar="user.avatar">
                        {{ `${user.first_name} ${user.last_name}`}}
                    </UsersListItem>
                </template>
            </tbody>
        </table>
    </div>

    <AppPagination :pages="store.pagesCount"></AppPagination>
</template>
