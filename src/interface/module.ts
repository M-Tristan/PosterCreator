
export interface operItem{
  id:string,
  type:string,
  zindex:number,
  width:number,
  height:number,
  top:number,
  left:number,
  rotate:number,
  opacity:number
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
  color:string,
  rotate:number
}


export interface postInfo {
   images:image[],
   texts:text[],
   layers:operItem[]
}
