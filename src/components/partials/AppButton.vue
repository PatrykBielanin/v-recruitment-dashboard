<script setup>
    import IconAdd from '../icons/IconAdd.vue'
    import {ref, onMounted} from 'vue'

    const props = defineProps({
        isRounded: {
            type: Boolean,
            required: false,
            default: false
        },
        style: {
            type: String,
            required: false,
            default: 'success'
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        }
    })

    const buttonStyle = ref('btn-success')

    onMounted(() => {
        buttonStyle.value = 'btn-' + props.style
    })
</script>

<template>
    <div class="btn" :class="[{'btn-rounded': isRounded}, buttonStyle]">
        <slot name="icon">
        </slot>

        <slot />
    </div>
</template>
