import { v4 as uuidv4 } from 'uuid';
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
              height:20,
              top:10,
              left:10,
              rotate:0,
              fontSize:20,
              color:'rgba(0,0,0,1)',
              text:text
          })
      })
      
      

  }
}
export default ModuleUtil