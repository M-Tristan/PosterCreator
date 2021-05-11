interface codeBaseInfo{
  text:string,
  colorDark:string,
  colorLight:string,
  backImage?:string
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
                    crop:{
                      width: image.naturalWidth,
                      height: image.naturalHeight,
                      left: 0,
                      top: 0
                    },
                    filter:{
                      brightness:100,
                      contrast:100,
                      grayscale:0,
                      hueRotate:0,
                      invert:0,
                      saturate:100
                    }
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
              text:text,
              bold:false,
              italic:false,
              textDecoration:'none',
              lineHeight:1,
              textAlign:'left',
              letterSpacing:0,
              opacity:1,
              textShadowList:[],
              strokeWidth:0,
              strokeColor:'rgba(0,0,0,1)'
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

    static  getChartInfo(type){
      return new Promise((resolve,reject)=>{
        let option
        if(type == 'pie'){
          option = {
            animation: false,
            series: [
                {   
                    name: '标题',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    itemStyle: {
                        borderRadius: 20,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 100, name: '模块一'},
                        {value: 50, name: '模块二'},
                    ]
                }
            ]
          }
        }
        if(type == 'bar'){
          option = {
            animation: false,
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [5, 5, 6, 6, 7, 7, 8],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]
          };
        }
        resolve({
            id:uuidv4(),
            width:300,
            height:300,
            top:10,
            left:10,
            rotate:0,
            opacity:1,
            option,
            chartType:'pie'
        })
      })
    }
    static  getShapeInfo(type){
      return new Promise((resolve,reject)=>{
        let res:any = {
          id:uuidv4(),
          width:300,
          height:300,
          top:10,
          left:10,
          rotate:0,
          opacity:1,
          shapeType:type,
          color:'rgba(255, 255, 255, 1)'
      }
      if(type == 'polygon'){
        res.sides = 5
      }else if(type == 'star'){
        res.angles = 6
      }else if(type == 'sector'){
        res.sectorAngle = 140
      }else if(type == 'flower'){
        res.petals = 8
      }
      
        resolve(res)
      })
    }
}
export default ModuleUtil