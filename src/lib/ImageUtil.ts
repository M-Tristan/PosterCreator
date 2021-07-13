class ImageUtil {
  static toBase64(src) {
    return new Promise((res, rej) => {
      src = src.replace("https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com", "https://lp-canvas-1304910572.file.myqcloud.com/")
      let image = new Image()
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = src
      image.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
        let ctx = canvas.getContext("2d")
        ctx?.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
        res(canvas.toDataURL())
      }
    })
  }

}

export default ImageUtil