
export interface itemBase{
  id:string,
  type:string,
  opacity:number
}
export interface operItem extends itemBase{
  zindex:number,
  width:number,
  height:number,
  top:number,
  left:number,
  rotate:number
}

export interface textShadow{
  hShadow:number,
  vShadow:number,
  blur:number,
  color:string
}

export interface image extends operItem{
    src:string,
    blur:number,
    borderRadius:number,
    rotateY:boolean,
    rotateX:boolean,
    dropshadowX:number,
    dropshadowY:number,
    dropshadowBlur:number,
    dropshadowColor:string,
    crop:{
      height: number,
      left: number,
      top: number,
      width: number
    },
    filter:{
      brightness:number,
      contrast:number,
      grayscale:number,
      hueRotate:number,
      invert:number,
      saturate:number
    }
    // borderWidth:number,
    // borderColor:string
}

export interface text extends operItem{
  text:string,
  fontSize:number,
  color:string,
  bold:boolean,
  italic:boolean,
  textDecoration:string,
  textAlign:string,
  lineHeight:number,
  letterSpacing:number,
  opacity:number,
  textShadowList?:Array<textShadow>
}

export interface code extends operItem{
  text:string,
  colorDark:string,
  colorLight:string,
  backImage?:string
}
export interface background extends itemBase{
  image:{
    width:number,
    height:number,
    top:number,
    left:number,
    src:string,
    blur:number
  },
  color:string
}

export interface canvas{
  width:number,
  height:number
}
export interface postInfo {
   canvas:canvas,
   images:image[],
   texts:text[],
   layers:operItem[],
   codes:code[],
   background:background
}
