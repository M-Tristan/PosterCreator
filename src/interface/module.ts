
export interface operItem{
  id:String,
  type:String,
  zindex:Number,
  width:Number,
  height:Number,
  top:Number,
  left:Number,
  rotate:Number,
  opacity:Number
}

export interface image extends operItem{
    src:String,
    blur:Number,
    borderRadius:Number,
    rotateY:Boolean,
    rotateX:Boolean,
    dropshadowX:Number,
    dropshadowY:Number,
    dropshadowBlur:Number,
    dropshadowColor:String,
    // borderWidth:Number,
    // borderColor:String
}


export interface postInfo {
   image:image[],
   layer:operItem[]
}
