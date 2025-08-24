<template>
    <SelectFixedMsg v-model:value="comp_value" 
    :options="props.options" 
    :message="props.options[comp_value.valueOf()].message"
    :disabled="props.disabled"></SelectFixedMsg>
</template>
<script lang="ts">
import { defineComponent, h, reactive, ref } from 'vue';
import SelectFixedMsg from './SelectFixedMsg.vue'
export default defineComponent({
    name: "Select",
    props: {
        value: Number,
        options: { 
            label: String, value: Number, message: String, price: Number, disabled: Boolean,
            default: () => [],
        },
        disabled: Boolean,
    },
    emits:['update:value','update'],
    setup(props, ctx){
        return{
            props,
        }
    },
    methods:{
    },
    components:{
        SelectFixedMsg
    },
    computed:{
        comp_value:{
            get():Number{
                return this.props.value;
            },
            set(v:Number){
                //console.log(this.value);
                this.$emit('update:value',v);
                //this.$emit('update');
            }
        }
    },
    mounted() {
        console.log(this.value);
    },
})
</script>