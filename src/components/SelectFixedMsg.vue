<template>
    <n-grid x-gap="12" :cols="20" style="align-items: center">
    <n-gi span="15">
        <n-flex justify="center">
            <n-select v-model:value="comp_value" :options="props.options" :render-label="renderLabel"/>
        </n-flex>
    </n-gi>
    <n-gi span="5">
        <n-flex justify="start">
            <span>{{ $t(props.message) }}</span>
        </n-flex>
    </n-gi>
  </n-grid>
</template>
<script lang="ts">
import { defineComponent, h, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
    name: "SelectFixedMsg",
    props: {
        value: Number,
        options: { 
            label: String, value: Number, price: Number, disabled: Boolean,
            default: () => [],
        },
        message: String,
        disabled: Boolean,
    },
    emits:['update:value','update'],
    setup(props, ctx){
        const { t, locale } = useI18n();
        return{
            props,
            renderLabel: (option: SelectOption): VNodeChild => {
                if (option.type === 'group')
                    return `${option.label}(Cool!)`
                return [
                    h(
                        {
                            style: {
                                verticalAlign: '-0.15em',
                                marginRight: '4px'
                            }
                        }
                    ),
                    t(option.label) as string
                ]
            }
        }
    },
    methods:{
    },
    computed:{
        comp_value:{
            get():Number{
                return this.props.value;
            },
            set(v:Number){
                console.log(this.value);
                this.$emit('update:value',v);
                //this.$emit('update');
                //this.message=v.toString();
            }
        }
    },
    mounted() {
        console.log("mounted");
    },
})
</script>