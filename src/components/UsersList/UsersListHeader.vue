<script setup>
    import UsersListSearchBar from './UsersListSearchBar.vue'
    import AppButton from '../partials/AppButton.vue'
    import IconAdd from '../icons/IconAdd.vue'
</script>

<template>
    <div class="users-list-header">
        <UsersListSearchBar></UsersListSearchBar>
        <RouterLink to="/user">
            <AppButton :isRounded="true" :icon="'IconAdd'">
                <template #icon>
                    <IconAdd></IconAdd>
                </template>
                Add User
            </AppButton>
        </RouterLink>
    </div>
</template>
