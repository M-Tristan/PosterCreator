<template>
  <div class='chart'>
    <div class='chart-content'> 
      <div ref='dom' style="width: 280px;height:280px;">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import {pie,bar} from './common/chartsDemo'
export default defineComponent({
  props:{
    type:{
      type:String,
      default:'pie'
    }
  },
  setup (props) {
    onMounted(() => {
      let chartDom = dom.value
      var myChart = echarts.init(chartDom);
      let option:any = pie;
      switch(props.type){
        case 'pie':
            option = pie;
            break
        case 'bar':
            option = bar;
            break
      }
      
      myChart.setOption(option);
     
      
     
    })
    let dom = ref(null as unknown as HTMLElement)

    return {dom}
  }
})
</script>

<style scoped>
.chart{
  display: inline-block;
  float: left;
  width: 140px;
  height: 140px;
}
.chart-content{
  transform: scale(0.5,0.5);
  transform-origin:0 0;
  
}
</style>