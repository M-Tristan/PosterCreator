import MathUtil from './MathUtil'
interface position{
  left:number,
  top:number
}
 interface clip{
  left:number,
  top:number,
  width:number,
  height:number,
}
interface point{
  x:number,
  y:number
}
interface flowerPoint extends point{
  lastCurPoint:point,
  nextCurPoint:point
}
class PositionUtil{
    constructor(){

    }
    /**
     * 计算四个顶点的的位置
     * @param x 
     * @param y 
     * @param w 
     * @param h 
     * @param angle 
     * @returns 
     */
    static getPosition(x:number,y:number,w:number,h:number,angle:number){
        let leftTop = {
            left:h/2*MathUtil.sin(angle)+x-w/2*MathUtil.cos(angle),
            top:h/2*MathUtil.cos(angle)+y-w/2*MathUtil.sin(angle)
        }
        let rightTop = {
            left:h/2*MathUtil.sin(angle)+x+w/2*MathUtil.cos(angle),
            top:h/2*MathUtil.cos(angle)+y+w/2*MathUtil.sin(angle)
        }
        let leftBottom = {
            left:x-h/2*MathUtil.sin(angle)-w/2*MathUtil.cos(angle),
            top:y-h/2*MathUtil.cos(angle)-w/2*MathUtil.sin(angle)
        }
        let rightBottom = {
            left:x-h/2*MathUtil.sin(angle)+w/2*MathUtil.cos(angle),
            top:y-h/2*MathUtil.cos(angle)+w/2*MathUtil.sin(angle)
        }
        let minLeft = leftTop.left
        let minTop = leftTop.top
        let maxLeft = leftTop.left
        let maxTop = leftTop.top
        let positionArray = new Array()
        positionArray.push(rightTop)
        positionArray.push(leftBottom)
        positionArray.push(rightBottom)
        positionArray.forEach(posi=>{
            if(posi.left>maxLeft){
                maxLeft = posi.left
            }
            if(posi.left < minLeft){
                minLeft = posi.left
            }
            if(posi.top > maxTop){
                maxTop = posi.top 
            }
            if(posi.top < minTop){
                minTop = posi.top
            }
        })
        
        return{
            leftTop, 
            rightTop,
            leftBottom,
            rightBottom,
            most:{
                minLeft,
                minTop,
                maxLeft,
                maxTop
            }
        }
    
    }
    /**
     * 得到中心点坐标
     */
    static getCenterPosition(x:number,y:number,w:number,h:number):position{
      return{
        top:y+h/2,
        left:x+w/2
      }
    }
      /**
   * 根据已知点，斜边长度，角度算自身坐标
   * @param angle 
   * @param Hypotenuse 
   * @param posi 
   * @returns 
   */
  static getPositionbyOther(angle:number,Hypotenuse:number,posi:position):position{
    return{
      left:posi.left - Hypotenuse*MathUtil.cos(angle),
      top:posi.top + Hypotenuse*MathUtil.sin(angle)
    }
  }
  /**
   * 通过中心点得到坐标位置
   * @param x 
   * @param y 
   * @param w 
   * @param h 
   * @returns 
   */
  static getPositionByCenter(x:number,y:number,w:number,h:number):position{
    return{
      left:x-w/2,
      top:y-h/2
    }
  }

  static getClipInfo(width:number,height:number,clip:clip):clip{
    let fullSize = MathUtil.getFullSize(width,height,clip.width/clip.height)
    let scale = fullSize.width/clip.width
    return{
      left:clip.left+(fullSize.width-width)/2/scale,
      top:clip.top+(fullSize.height-height)/2/scale,
      width:width/scale,
      height:height/scale,
    }

  }
  static getShapesPoints(num:number,r:number):point[]{
    let startRate = 0
    let averageAngle = 360/num
    let index = 0
    let opints:point[] = []
    while(index < num){
      opints.push({y:r-r*MathUtil.cos(startRate),x:r-r*MathUtil.sin(startRate)})
      startRate+=averageAngle
      index++
    }
    return opints
  }
  static getStartShapesPoints(num:number,outerR:number,innerR:number):point[]{
    let startRate = 0
    let averageAngle = 180/num
    let index = 0
    let opints:point[] = []
    while(index < num*2){
      let r = innerR
      if(index%2 == 0){
        r = outerR
      }
      opints.push({y:outerR-r*MathUtil.cos(startRate),x:outerR-r*MathUtil.sin(startRate)})
      startRate+=averageAngle
      index++
    }
    return opints
  }
  static getFlowerPointsByNum(num:number,r:number):flowerPoint[]{
    let startRate = 0
    let averageAngle = 360/num
    let curveR = r/MathUtil.cos(averageAngle/2)
    // if(num%2 == 0){
      // let startRate = averageAngle/2
    // }
    let index = 0
    let opints:flowerPoint[] = []
    while(index < num){
      let lastCurPoint = {y:r-curveR*MathUtil.cos(startRate-averageAngle/2),x:r-curveR*MathUtil.sin(startRate-averageAngle/2)}
      let nextCurPoint = {y:r-curveR*MathUtil.cos(startRate+averageAngle/2),x:r-curveR*MathUtil.sin(startRate+averageAngle/2)}
      opints.push({y:r-r*MathUtil.cos(startRate),x:r-r*MathUtil.sin(startRate),lastCurPoint,nextCurPoint})
      startRate+=averageAngle
      index++
    }
    return opints
  }
  
}

export default PositionUtil