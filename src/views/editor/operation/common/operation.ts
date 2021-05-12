import { operItem } from "@/interface/module"
import { computed } from "vue"
import { useStore } from "vuex"

const operation = () =>{
  const store = useStore()
  const moveScale = computed(() => {
    return 100/store.state.scale
  })
  const moduleMove = (module:operItem)=>{
    let event =<MouseEvent> window.event
    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left 
    let oritop = module.top 
    window.onmousemove = (event:MouseEvent)=>{
        let X = event.clientX
        let Y = event.clientY
        module.left = orileft+(X-oriX)*moveScale.value
        module.top = oritop+(Y-oriY)*moveScale.value
        
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

  return{moduleMove}
}
 
export default operation