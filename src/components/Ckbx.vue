<template>
    <n-grid x-gap="12" :cols="20" style="align-items: center">
    <n-gi span="14">
        <n-tooltip trigger="hover">
            <template #trigger>
                <n-flex justify="center">
                    <span>{{ $t(props.message_l) }}</span>
                </n-flex>
            </template>
            {{ $t(props.message_p) }}
        </n-tooltip>
    </n-gi>
    <n-gi>
        <n-checkbox v-model:checked="comp_value" :disabled="props.disabled"></n-checkbox>
    </n-gi>
    <n-gi span="5">
        <n-flex justify="start">
            <span>{{ $t(props.message_r) }}</span>
        </n-flex>
    </n-gi>
  </n-grid>
</template>
<script lang="ts">
import { defineComponent, h, reactive, ref } from 'vue';
export default defineComponent({
    name: "Ckbx",
    props: {
        value: Boolean,
        message_l: String,
        message_r: String,
        message_p: String,
        disabled: Boolean,
    },
    emits:['update:value'],
    setup(props, ctx){
        return{
            props,
        }
    },
    methods:{
    },
    computed:{
        comp_value:{
            get():Boolean{
                return this.props.value;
            },
            set(v:Boolean){
                this.$emit('update:value',v);
            }
        }
    },
    mounted() {
    },
})
</script>