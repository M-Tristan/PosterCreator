
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
    // borderWidth:number,
    // borderColor:string
}

export interface text extends operItem{
  text:string,
  fontSize:number,
  color:string
}

export interface code extends operItem{
  text:string,
  colorDark:string,
  colorLight:string
}
export interface background extends operItem{
  imageUrl:string,
  color:string
}

export interface postInfo {
   images:image[],
   texts:text[],
   layers:operItem[],
   codes:code[],
   background:background
}
