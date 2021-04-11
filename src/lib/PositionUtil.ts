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
            left:h/2*Math.sin(angle/180*Math.PI)+x-w/2*Math.cos(angle/180*Math.PI),
            top:h/2*Math.cos(angle/180*Math.PI)+y-w/2*Math.sin(angle/180*Math.PI)
        }
        let rightTop = {
            left:h/2*Math.sin(angle/180*Math.PI)+x+w/2*Math.cos(angle/180*Math.PI),
            top:h/2*Math.cos(angle/180*Math.PI)+y+w/2*Math.sin(angle/180*Math.PI)
        }
        let leftBottom = {
            left:x-h/2*Math.sin(angle/180*Math.PI)-w/2*Math.cos(angle/180*Math.PI),
            top:y-h/2*Math.cos(angle/180*Math.PI)-w/2*Math.sin(angle/180*Math.PI)
        }
        let rightBottom = {
            left:x-h/2*Math.sin(angle/180*Math.PI)+w/2*Math.cos(angle/180*Math.PI),
            top:y-h/2*Math.cos(angle/180*Math.PI)+w/2*Math.sin(angle/180*Math.PI)
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
}