<template>
  <div id="app">
      <n-flex justify="center">
        <n-card title="Order Generator">
          <SelectFixedMsg v-model:value="comp_lang" :options="(lang_option as any)" :message="$t('lang')"></SelectFixedMsg>
          <Ckbx v-model:value="order_list[0].value.value" 
            :message_l="order_list[0].message" 
            :message_r="String(order_list[0].price)+' CNY'" 
            :message_p="order_list[0].explain" 
            :disabled="order_list[0].disabled.value"/>
          <Ckbx v-model:value="order_list[1].value.value" 
            :message_l="order_list[1].message" 
            :message_r="String(order_list[1].price)+' CNY'" 
            :message_p="order_list[1].explain" 
            :disabled="order_list[1].disabled.value"/>
          <Ckbx v-model:value="order_list[2].value.value" 
            :message_l="order_list[2].message" 
            :message_r="String(order_list[2].price)+' CNY'" 
            :message_p="order_list[2].explain" 
            :disabled="order_list[2].disabled.value"/>
          <Ckbx v-model:value="order_list[3].value.value" 
            :message_l="order_list[3].message" 
            :message_r="String(order_list[3].price)+' CNY'" 
            :message_p="order_list[3].explain" 
            :disabled="order_list[3].disabled.value"/>
          <Ckbx v-model:value="order_list[4].value.value" 
            :message_l="order_list[4].message" 
            :message_r="String(order_list[4].price)+' CNY'" 
            :message_p="order_list[4].explain" 
            :disabled="order_list[4].disabled.value"/>
          <Ckbx v-model:value="order_list[5].value.value" 
            :message_l="order_list[5].message" 
            :message_r="String(order_list[5].price)+' CNY'" 
            :message_p="order_list[5].explain" 
            :disabled="order_list[5].disabled.value"/>
          <Ckbx v-model:value="order_list[6].value.value" 
            :message_l="order_list[6].message" 
            :message_r="String(order_list[6].price)+' CNY'"
            :message_p="order_list[6].explain" 
            :disabled="order_list[6].disabled.value"/>
          <Ckbx v-model:value="order_list[7].value.value" 
            :message_l="order_list[7].message" 
            :message_r="String(order_list[7].price)+' CNY'" 
            :message_p="order_list[7].explain" 
            :disabled="order_list[7].disabled.value"/>
          <Ckbx v-model:value="order_list[8].value.value" 
            :message_l="order_list[8].message" 
            :message_r="String(order_list[8].price)+' CNY'" 
            :message_p="order_list[8].explain" 
            :disabled="order_list[8].disabled.value"/>
          <Ckbx v-model:value="order_list[9].value.value" 
            :message_l="order_list[9].message" 
            :message_r="String(order_list[9].price)+' CNY'" 
            :message_p="order_list[9].explain" 
            :disabled="order_list[9].disabled.value"/>
          <Ckbx v-model:value="order_list[10].value.value" 
            :message_l="order_list[10].message" 
            :message_r="String(order_list[10].price)+' CNY'" 
            :message_p="order_list[10].explain" 
            :disabled="order_list[10].disabled.value"/>
          <Select v-model:value="joystick_option_value" :options="(joystick_option as any)"></Select>
          <n-flex justify="start">
            <n-highlight
              :text="$t('msg.joystick_notice')"
              :patterns="[$t('msg.joystick_notice')]"
            />
          </n-flex>
          <n-flex justify="start">
            <span>{{ $t('msg.product_typ') }}</span>
          </n-flex>
          <Select v-model:value="product_option_value" :options="(product_option as any)"></Select>
          <n-divider />
          <n-flex justify="space-around">
            <n-button @click="copy_order()">{{ $t("msg.gen") }}</n-button>
            <n-tooltip trigger="hover">
              <template #trigger>
                <div>
                  <span>{{ $t("msg.total_cost") }}: </span>
                  <n-highlight :text="cost.toString()" :patterns="[cost.toString()]" 
                  :highlight-style="{
                    padding: '0 6px',
                    borderRadius: themeVars.borderRadius,
                    display: 'inline-block',
                    color: themeVars.baseColor,
                    background: themeVars.primaryColor,
                    transition: `all .3s ${themeVars.cubicBezierEaseInOut}`}"
                  />
                </div>
              </template>
              {{ $t("exp.total_cost_exp") }}
            </n-tooltip>
          </n-flex>
        </n-card>
      </n-flex>
      </div>
</template>
<script lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import { useThemeVars } from 'naive-ui'
import Ckbx from './components/Ckbx.vue';
import Select from './components/Select.vue';
import ButtomBar from './components/ButtomBar.vue';
import { useI18n } from 'vue-i18n';
import SelectFixedMsg from './components/SelectFixedMsg.vue';
import clipBoard from 'vue-clipboard3'
import { generate } from '@vue/compiler-core';
class order_item{
  name: string="default";
  value: any=ref(false);
  price: Number=0;
  message: string="default_message";
  disabled: any=ref(false);
}
export default {
  setup(){
    const { t, locale } = useI18n();    
    const themeVars = useThemeVars()
    let cost=ref(0);
    let lang=ref("zh-CN");
    let product_option_value=ref(0);
    let joystick_option_value=ref(0);
    
    let order_list:order_item[]=[
      {
        name:"basic",
        value:ref(true),
        price:169,
        message:('msg.basic_kit_desc'),
        explain:'exp.basic_kit_exp',
        disabled: ref(true),
      },{
        name:"cable",
        value:ref(true),
        price:5,
        message:('msg.cable_desc'),
        explain:'exp.cable_exp',
        disabled: ref(true),
      },{
        name:"rumble",
        value:ref(false),
        price:70,
        message:('msg.rumble_desc'),
        explain:'exp.rumble_exp',
        disabled: ref(false),
      },{
        name:"motion",
        value:ref(false),
        price:30,
        message:('msg.motion_desc'),
        explain:'exp.motion_exp',
        disabled: ref(false),
      },{
        name:"js_rgb",
        value:ref(false),
        price:15,
        message:('msg.js_rgb_desc'),
        explain:'exp.js_rgb_exp',
        disabled: ref(false),
      },{
        name:"top_rgb",
        value:ref(false),
        price:30,
        message:('msg.top_rgb_desc'),
        explain:'exp.top_rgb_exp',
        disabled: ref(false),
      },{
        name:"wireless",
        value:ref(false),
        price:50,
        message:('msg.wireless_desc'),
        explain:'exp.wireless_exp',
        disabled: ref(true),
      },{
        name:"exr_shell",
        value:ref(false),
        price:40,
        message:('msg.exr_shell_desc'),
        explain:'exp.exr_shell_exp',
        disabled: ref(false),
      },{
        name:"clicky_abxy",
        value:ref(false),
        price:30,
        message:('msg.clicky_abxy_desc'),
        explain:'exp.clicky_abxy_exp',
        disabled: ref(false),
      },{
        name:"clicky_shouders",
        value:ref(false),
        price:60,
        message:('msg.clicky_shouders_desc'),
        explain:'exp.clicky_shouders_exp',
        disabled: ref(false),
      },{
        name:"clicky_crosses",
        value:ref(false),
        price:40,
        message:('msg.clicky_crosses_desc'),
        explain:'exp.clicky_crosses_exp',
        disabled: ref(true),
      }
    ];
    let lang_option=[
      {
            label: 'zh-CN',
            value: "zh-CN",
            message: "Chinese",
            disabled: false
        },{
            label: 'en-US',
            value: "en-US",
            message: "英语",
            disabled: false
        }
    ];
    let joystick_option=[
        {
            label: 'label.alps',
            value: 0,
            message: "0 CNY",
            price: 0,
            disabled: false
        },{
            label: 'label.alps_tmr',
            value: 1,
            message: "60 CNY",
            price: 60,
            disabled: false
        },{
            label: 'label.gulkit_adj',
            value: 2,
            message: "130 CNY",
            price: 130,
            disabled: false
        },{
            label: 'label.guliKit/hallPi',
            value: 3,
            message: "80 CNY",
            price: 80,
            disabled: false
        },{
            label: 'label.ginfull_low_resistent',
            value: 4,
            message: "40 CNY",
            price: 40,
            disabled: false
        },{
            label: 'label.k-silver-js13p',
            value: 5,
            message: "60 CNY",
            price: 60,
            disabled: false
        },{
            label: 'label.favor_union_tmr',
            value: 6,
            message: "40 CNY",
            price: 40,
            disabled: false
        },{
            label: 'label.ginfull',
            value: 7,
            message: "40 CNY",
            price: 40,
            disabled: false
        },{
            label: 'label.others',
            value: 8,
            message: "msg.floating_price",
            price: 0,
            disabled: false
        },
      ];
    let product_option=[
        {
            label: ('label.mod_kit'),
            value: 0,
            message: "0 CNY",
            price: 0,
            disabled: false
        },{
            label: ('label.oem'),
            value: 1,
            message: "100 CNY",
            price: 100,
            disabled: false
        },{
            label: ('label.mod_for_me'),
            value: 2,
            message: "40 CNY",
            price: 40,
            disabled: false
        },
      ];
    watchEffect(()=>{
      if(product_option_value.value==0){
        order_list[7].value.value=false;
        order_list[7].disabled.value=true;
        console.log("disabled");
      }else{
        //this.order_list[7].checked.value=false;
        order_list[7].disabled.value=false;
      }
      let c=0;
      order_list.forEach((v:order_item)=>{if(v.value.value==true)c+=v.price.valueOf();});
      c+=joystick_option[joystick_option_value.value].price;
      c+=product_option[product_option_value.value].price;
      if(product_option_value.value>0){
        if(order_list[8].value.value==true){
          c+=10;
        }
        if(order_list[9].value.value==true){
          c+=30;
        }
        if(order_list[10].value.value==true){
          c+=20;
        }
      }
      cost.value=c;
    });
    return{
      product_option_value,
      product_option,
      joystick_option_value,
      joystick_option,
      cost,
      reactive,
      ref,
      order_list,
      lang_option,
      lang,
      t,
      themeVars,
    };
  },
  components: {
      Ckbx,
      Select,
      ButtomBar,
      SelectFixedMsg,
  },
  methods:{
    updateLanguage(){
      this.$i18n.locale = this.lang;
      console.log("set lang "+this.lang);
      // 可选：保存用户语言偏好
      localStorage.setItem('userLanguage', this.lang)
    },
    generate_order(){
      let res="";
      this.order_list.forEach((i:order_item)=>{if(i.value.value)res+=this.t(i.message)+'\r\n';});
      res+=this.t(this.joystick_option[this.joystick_option_value].label)+"\r\n";
      res+=this.t('msg.typ')+" ";
      res+=this.t(this.product_option[this.product_option_value].label)+"\r\n";
      res+=this.t("msg.total_cost")+": "+this.cost.toString();
      return res;
    },
    async copy_order(){
      let { toClipboard } = clipBoard();
      console.log("gene");
      let res=this.generate_order();
      console.log(res);
      try {
        await toClipboard(res);
        alert(this.t("msg.copy_success"));
      } catch (e) {
        alert(this.t("msg.copy_fail"));
      }
    }
  },
  computed:{
    comp_lang:{
      get():String{
        return this.lang;
      },
      set(s:String){
        console.log("lang "+s);
        this.lang=s;
        this.updateLanguage();
      }
    },
  },
  mounted(){
    let lang = localStorage.getItem("userLanguage") || navigator.language;
    if (lang) {
      this.$i18n.locale = lang;
      this.lang=lang;
    }
    //console.log(order_list[0].value);
  }
}
</script>