import { operItem } from "@/interface/module"
import { computed } from "vue"

const operation = () =>{
  let moveScale = 1
  const moduleMove = (module:operItem)=>{
    let event =<MouseEvent> window.event
    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left 
    let oritop = module.top 
    window.onmousemove = (event:MouseEvent)=>{
        let X = event.clientX
        let Y = event.clientY
        module.left = orileft+(X-oriX)*moveScale
        module.top = oritop+(Y-oriY)*moveScale
        
    }
    window.onmouseup = ()=>{
        window.onmousemove = null
        module.left = Math.round(module.left)
        module.height = Math.round(module.height)
        module.width = Math.round(module.width)
        module.top = Math.round(module.top)
        window.onmouseup=null
        
    }
  }
  let cursor = computed((module)=>{
    let result:any = {}
  if((module.rotate < 25 && module.rotate >= 0)||(module.rotate < 360 && module.rotate >=340)){
    result.leftTop='nw-resize'
    result.middleTop='n-resize'
    result.rightTop='ne-resize'
    result.rightMiddle='e-resize'
    result.rightDown='nw-resize'
    result.middleDown='n-resize'
    result.leftDown='ne-resize'
    result.leftMiddle='e-resize'
  }
  if(module.rotate < 70 && module.rotate >= 25){
    result.leftTop='n-resize'
    result.middleTop='ne-resize'
    result.rightTop='e-resize'
    result.rightMiddle='nw-resize'
    result.rightDown='n-resize'
    result.middleDown='ne-resize'
    result.leftDown='e-resize'
    result.leftMiddle='nw-resize'
  }
  if(module.rotate < 115 && module.rotate >= 70){
    result.leftTop='ne-resize'
    result.middleTop='e-resize'
    result.rightTop='nw-resize'
    result.rightMiddle='n-resize'
    result.rightDown='ne-resize'
    result.middleDown='e-resize'
    result.leftDown='nw-resize'
    result.leftMiddle='n-resize'
  }
  if(module.rotate < 160 && module.rotate >= 115){
    result.leftTop='e-resize'
    result.middleTop='nw-resize'
    result.rightTop='n-resize'
    result.rightMiddle='ne-resize'
    result.rightDown='e-resize'
    result.middleDown='nw-resize'
    result.leftDown='n-resize'
    result.leftMiddle='ne-resize'
  }
  if(module.rotate < 205 && module.rotate >= 160){
    result.leftTop='nw-resize'
    result.middleTop='n-resize'
    result.rightTop='ne-resize'
    result.rightMiddle='e-resize'
    result.rightDown='nw-resize'
    result.middleDown='n-resize'
    result.leftDown='ne-resize'
    result.leftMiddle='e-resize'
  }
  if(module.rotate < 250 && module.rotate >= 205){
    result.leftTop='n-resize'
    result.middleTop='ne-resize'
    result.rightTop='e-resize'
    result.rightMiddle='nw-resize'
    result.rightDown='n-resize'
    result.middleDown='ne-resize'
    result.leftDown='e-resize'
    result.leftMiddle='nw-resize'
  }
  if(module.rotate < 295 && module.rotate >= 250){
    result.leftTop='ne-resize'
    result.middleTop='e-resize'
    result.rightTop='nw-resize'
    result.rightMiddle='n-resize'
    result.rightDown='ne-resize'
    result.middleDown='e-resize'
    result.leftDown='nw-resize'
    result.leftMiddle='n-resize'
  }
  if(module.rotate < 340 && module.rotate >= 295){
    result.leftTop='e-resize'
    result.middleTop='nw-resize'
    result.rightTop='n-resize'
    result.rightMiddle='ne-resize'
    result.rightDown='e-resize'
    result.middleDown='nw-resize'
    result.leftDown='n-resize'
    result.leftMiddle='ne-resize'
  }
  return result
})
  return{moduleMove,cursor}
}
 
export default operation