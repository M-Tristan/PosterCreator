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
                    rotate:0
                })
            }
        })
        
        

    }
}
export default ModuleUtil