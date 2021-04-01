interface css{
  width:Number,
  height:Number,
  top:Number,
  left:Number,
  rotate:Number,
}
export interface operItem{
  id:String,
  type:String,
  zindex:Number,
  css:css
}

export interface image extends operItem{
    src:String
}
export interface postInfo {
   image:image[],
   layer:operItem[]
}
