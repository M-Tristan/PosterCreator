import MathUtil from './MathUtil'
interface position{
  left:number,
  top:number
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
}

export default PositionUtil