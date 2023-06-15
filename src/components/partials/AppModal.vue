<script setup>
    import IconClose from '../icons/IconClose.vue'
    import AppButton from './AppButton.vue'

    defineProps({
        isModalOpen: {
            type: Boolean,
            required: false,
            default: false
        }
    })
</script>

<template>
    <div class="modal" v-if="isModalOpen">
        <div class="modal-close">
            <IconClose @click="$emit('canceled')"></IconClose>
        </div>

        <div class="modal-content">
            <div class="modal-text">
                <p>
                    <slot />
                </p>
            </div>

            <div class="modal-controls">
                <AppButton :style="'white'" @click="$emit('canceled')">
                    Cancel
                </AppButton>

                <AppButton @click="$emit('accepted')">
                    Confirm
                </AppButton>
            </div>
        </div>
    </div>
</template>
