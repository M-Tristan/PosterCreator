interface codeBaseInfo{
  text:string,
  colorDark:string,
  colorLight:string
}
import { v4 as uuidv4 } from 'uuid';
import store from './../store/index';
class ModuleUtil{
    constructor(){

    }
    static  getAddImageInfo(src:string){
        return new Promise((resolve,reject)=>{
            let image = new Image()
            image.src = src
            image.onload = ()=>{
                resolve({
                    id:uuidv4(),
                    width:image.naturalWidth,
                    height:image.naturalHeight,
                    top:10,
                    left:10,
                    src:src,
                    rotate:0,
                    blur:0,
                    opacity:1,
                    borderRadius:0,
                    rotateY:false,
                    rotateX:false,
                    dropshadowX:0,
                    dropshadowY:0,
                    dropshadowBlur:0,
                    dropshadowColor:'rgba(0,0,0,0)',
                    // borderWidth:0,
                    // borderColor:'rgba(0,0,0,0)',
                })
            }
        })
        
        

    }
    static  getAddTextInfo(text:string){
      return new Promise((resolve,reject)=>{
          resolve({
              id:uuidv4(),
              width:80,
              height:26,
              top:10,
              left:10,
              rotate:0,
              fontSize:20,
              color:'rgba(0,0,0,1)',
              text:text
          })
      })
    }
    static  getAddCodeInfo(code:codeBaseInfo){
      return new Promise((resolve,reject)=>{
          resolve({
            id:uuidv4(),
            width:200,
            height:200,
            top:10,
            left:10,
            rotate:0,
              ...code
          })
      })
    }
    static  getBackImageInfo(url:string){
      return new Promise((resolve,reject)=>{
        let img = new Image()
           img.src = url
           img.onload = function(){
             let canvas = store.state.postInfo.canvas
             let naturalWidth = img.naturalWidth
             let naturalHeight = img.naturalHeight
             let widthrate = canvas.width/naturalWidth
             let heightrate = canvas.height/naturalHeight
             let useRate = widthrate>heightrate?widthrate:heightrate
             let imageInfo = {
                width:useRate*img.naturalWidth,
                height:useRate*img.naturalHeight,
                top:(useRate*img.naturalHeight-canvas.height)/2,
                left:(useRate*img.naturalWidth-canvas.width)/2,
                src:url,
                blur:0
             }
             resolve(imageInfo)
          }
      })
    }
}
export default ModuleUtil