
export interface itemBase {
  id: string,
  type: string,
  opacity: number
}
export interface operItem extends itemBase {
  zindex: number,
  width: number,
  height: number,
  top: number,
  left: number,
  rotate: number,
  lock: boolean,
  groupId?: string
}

export interface textShadow {
  hShadow: number,
  vShadow: number,
  blur: number,
  color: string
}
export interface option {
  hShadow: number,
  vShadow: number,
  blur: number,
  color: string
}
export interface image extends operItem {
  src: string,
  blur: number,
  borderRadius: number,
  rotateY: boolean,
  rotateX: boolean,
  dropshadowX: number,
  dropshadowY: number,
  dropshadowBlur: number,
  dropshadowColor: string,
  crop: {
    height: number,
    left: number,
    top: number,
    width: number
  },
  filter: {
    brightness: number,
    contrast: number,
    grayscale: number,
    hueRotate: number,
    invert: number,
    saturate: number
  },
  mask?: {
    type: string,
    src?: string
  }
  // borderWidth:number,
  // borderColor:string
}
export interface chart extends operItem {
  option: object,
  chartType: string
}

export interface shape extends operItem {
  shapeType: string,
  color: string,
  sides?: number,
  angles?: number,
  sectorAngle?: number,
  petals?: number
}
interface deformation {
  type: string
}
export interface text extends operItem {
  text: string,
  html: string,
  fontSize: number,
  fontFamily: string,
  color: string,
  bold: boolean,
  italic: boolean,
  textDecoration: string,
  textAlign: string,
  lineHeight: number,
  letterSpacing: number,
  opacity: number,
  textShadowList?: Array<textShadow>,
  strokeWidth: number,
  strokeColor: string,
  deformation?: deformation
}

export interface effectText extends operItem {
  text: string,
  fontSize: number,
  fontFamily: string,
  color: string,
  bold: boolean,
  italic: boolean,
  textDecoration: string,
  textAlign: string,
  lineHeight: number,
  letterSpacing: number,
  opacity: number,
  textShadowList?: Array<textShadow>,
  strokeWidth: number,
  strokeColor: string,
  lengthRate: number
}
export interface code extends operItem {
  text: string,
  colorDark: string,
  colorLight: string,
  backImage?: string
}
export interface background extends itemBase {
  image?: {
    width: number,
    height: number,
    top: number,
    left: number,
    src: string,
    blur: number
  },
  color?: string
}

export interface group {
  id: string,
  layerIds: string[],
  rotate: number,
  width: number,
  height: number,
  left: number,
  top: number,
  lock: boolean,
  type: string
}

export interface watermark {
  fontSize: number,
  opacity: number,
  rotate: number,
  space: number,
  text: string,
  cross: number

}

export interface canvas {
  width: number,
  height: number
}
export interface postInfo {
  canvas: canvas,
  images: image[],
  texts: text[],
  layers: operItem[],
  groups: group[]
  codes: code[],
  background: background
}
