<script setup>
    import AppButton from './partials/AppButton.vue'
    import AppError from './partials/AppError.vue'
    import IconCamera from './icons/IconCamera.vue'
    import {ref, onMounted} from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useAppStore } from '../stores/app';
    const store = useAppStore()
    const route = useRoute()
    const router = useRouter()

    const props = defineProps({
        mode: {
            type: String,
            required: false,
            default: 'add'
        },
    })

    const form = ref({})
    const error = ref(false)
    const avatar = ref({
        edit: false,
        link: ''
    })

    const saveNewUser = () => {
        if (validateForm()) {
            return
        }

        store.saveNewUser(form.value)
        router.push({name: 'app'})
    }

    const editUserInfo = () => {
        if (validateForm()) {
            return
        }

        store.editUserInfo(route.params.id, form)

        router.push({name: 'app'})
    }

    const validateForm = () => {
        error.value = false
        if (!form.value.first_name || !form.value.last_name) {
            error.value = true
            return true
        }
        hasNewAvatar(form.value)
    }

    const hasNewAvatar = (form) => {
        if (avatar.value.link.length != 0) {
            form.avatar = avatar.value.link
        }
        return form
    }

    const getUserInfo = () => {
        let user = store.getUserInfo(route.params.id)

        if(user) {
            form.value.first_name = user.first_name
            form.value.last_name = user.last_name
            form.value.avatar = user.avatar

            if(form.value.avatar){
                avatar.value.link = form.value.avatar
            }
            return
        }
    }

    onMounted(() => {
        if(props.mode == 'edit'){
            getUserInfo()
        }
    })
</script>

<template>
    <h1>
        {{ mode != 'edit' ? 'Add user' : 'Edit user' }}
    </h1>

    <div class="user-item">
        <div class="user-item-form">
            <div class="user-item-form-inputs">
                <div class="user-item-form-input">
                    <p>
                        First Name
                    </p>

                    <input
                        v-model="form.first_name"
                        type="text"
                        placeholder="John"
                        :class="{'error-input': error && !form.first_name}"
                    />
                </div>

                <div class="user-item-form-input">
                    <p>
                        Last Name
                    </p>

                    <input
                        v-model="form.last_name"
                        type="text"
                        placeholder="Doe"
                        :class="{'error-input': error && !form.last_name}"
                    />
                </div>
            </div>

            <AppError v-if="error">
                    You need to fill both inputs
            </AppError>

            <div class="user-item-form-buttons">
                <AppButton @click="mode != 'edit' ? saveNewUser() : editUserInfo()">
                    {{ mode != 'edit' ? 'Save new user' : 'Update details' }}
                </AppButton>
            </div>
        </div>

        <div class="user-item-avatar">
            <div class="user-item-avatar-preview">
                <img
                    :src="form.avatar ? form.avatar : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                    alt="User avatar"
                >
            </div>

            <AppButton
                v-if="!avatar.edit"
                :style="'white'"
                @click="avatar.edit = !avatar.edit"
            >
                <template v-slot:icon>
                    <IconCamera></IconCamera>
                </template>
                Change Photo
            </AppButton>

            <input
                v-else
                class="user-item-form-avatar-input"
                v-model="avatar.link"
                type="text"
                placeholder="Paste link here to new picture"
            />
        </div>
    </div>
</template>
