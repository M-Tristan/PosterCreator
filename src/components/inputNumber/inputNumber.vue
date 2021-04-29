<template>
<div class='inputNumber'>
  <input ref='input' onkeyup = "value=value.replace(/[^\d]/g,'')" :value="value" @blur="changeValue" class='input' />
  <div class='button-area'>
    <div class='up button-item' @mouseup="closeInter" @mousedown="add">
      <i class='el-icon-caret-top'></i>
    </div>
    <div class='down button-item'  @mouseup="closeInter" @mousedown="reduce">
       <i class='el-icon-caret-bottom'></i>
    </div>
  </div>
</div>

</template>

<script lang="ts">
 import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'input-number',
  props: {
    value: {
      type:Number,
      default:0
    },
  },
 
  setup(props){
     let t: NodeJS.Timeout 
    let value = ref(props.value)
    const add = () => {
      t = setInterval(()=>{
        value.value++
      },50)
      
    }
    let input = ref(null as unknown as HTMLInputElement)
    const reduce = () => {
       t = setInterval(()=>{
        value.value--
      },50)
    }
    const closeInter = () => {
      clearInterval(t)
    }
    const changeValue = ( ) => {
      // let inputValue = input.value.value
      // value.value = Number(inputValue.replace(/[^\d]/g,''))
      // //  console.log(input.value.value)
    }
    return {value,add,closeInter,reduce,changeValue,input}

  }
});
</script>

<style lang="scss" scoped>
.inputNumber{
  width: 90%;
  border: 1px solid rgb(233, 233, 233);
  border-radius: 5px;
  height: 28px;
  display: flex;
  align-items: center;
   &:hover{   
    border: 1px solid rgb(0, 174, 255);
  }
}
.input{
  width: 80%;
  background:none;  
	outline:none;  
	border:none;
  float: left;
  &:focus{   
    border:none
  }
}
.button-area{
  width: 20%;
  float: left;
  height: 28px;
  .button-item{
    height: 14px;
    line-height: 14px;
    cursor: pointer;
  }
}
</style>