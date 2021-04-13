
class MathUtil{
  constructor(){

  }
  static sin(angle:number):number{
    return Math.sin(angle/180*Math.PI)
  }
  static asin(sinValue:number):number{
    return Math.asin(sinValue)/Math.PI*180
  }
  static cos(angle:number):number{
    return Math.cos(angle/180*Math.PI)
  }
  static tan(angle:number):number{
    return Math.tan(angle/180*Math.PI)
  }
  static atan(tanvalue:number):number{
    return Math.atan(tanvalue)/Math.PI*180
  }
  static getHypotenuse(width:number,height:number):number{
    return Math.sqrt(Math.pow(width,2)+Math.pow(height,2))
  }

}
export default MathUtil