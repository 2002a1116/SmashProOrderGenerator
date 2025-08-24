<template>
    <n-layout-footer 
        bordered
        position="fixed"
        :native-scrollbar="false"
        content-style="padding: 16px;">
        <span>test</span>
    </n-layout-footer>
</template>
<script lang="ts">
import { defineComponent, h, reactive, ref } from 'vue';
export default defineComponent({
    name: "ButtomBar",
    props: {
        value: Number,
    },
    setup(props, ctx){
        return{
            value: props.value,
        }
    },
    methods:{
    },
    computed:{
    },
    mounted() {
    },
})
</script>