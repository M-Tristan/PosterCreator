
import * as QRCode from "qrcode";

interface color {
  dark: string,
  light: string,
}
interface codeParams {
  width: number,
  color: color,
  pointType: string
}
const createQrcode = {
  size: 0,
  color: {} as any,
  points: [] as any,
  canvas: null as unknown as HTMLCanvasElement,
  ctx: null as unknown as CanvasRenderingContext2D,
  pointType: 'rect',
  create(text: string, option: codeParams) {
    let qrcodeData = QRCode.create(text, {})
    this.color = option.color
    this.pointType = option.pointType
    let modules = qrcodeData.modules
    this.points = modules.data
    this.size = modules.size
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.canvas.width = option.width
    this.canvas.height = option.width
    this.canvas.style.position = 'fixed'
    this.canvas.style.zIndex = '9999'
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.render()

  },
  render() {
    let ctx = this.ctx
    ctx.fillStyle = this.color.light
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawPoints()
    document.body.appendChild(this.canvas)
  },
  drawPoints() {
    let pointIndex = 0
    let size = this.size
    let points = this.points
    let width = this.canvas.width / this.size
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let point = points[pointIndex++]
        if (point === 1) {
          switch (this.pointType) {
            case 'star':
              this.drawstar(width, col * width, row * width)
              break;
            case 'rect':
              this.drawrect(width, col * width, row * width)
              break;
            case 'circle':
              this.drawcircle(width, col * width, row * width)
              break;
          }
        }
      }
    }
  },
  drawstar(width, left, top) {
    let ctx = this.ctx
    let color = this.color.dark
    ctx.save()
    ctx.translate(left, top)
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.quadraticCurveTo(width / 2, width / 2, 0, width / 2);
    ctx.quadraticCurveTo(width / 2, width / 2, width / 2, width);
    ctx.quadraticCurveTo(width / 2, width / 2, width, width / 2);
    ctx.quadraticCurveTo(width / 2, width / 2, width / 2, 0);
    ctx.closePath();
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawrect(width, left, top) {
    let ctx = this.ctx
    let color = this.color.dark
    ctx.save()
    ctx.translate(left, top)
    ctx.beginPath();
    ctx.rect(width * 0.1, width * 0.1, width * 0.8, width * 0.8)
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawcircle(width, left, top) {
    let ctx = this.ctx
    let color = this.color.dark
    ctx.save()
    ctx.translate(left, top)
    ctx.beginPath();
    ctx.arc(width / 2, width / 2, width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  codeEye() {
    // ctx.beginPath();
    // ctx.moveTo(0,100);
    // ctx.bezierCurveTo(100,100,100,100,100,0);
    // ctx.bezierCurveTo(100,100,100,100,200,100);
    // ctx.bezierCurveTo(100,100,100,100,100,200);
    // ctx.bezierCurveTo(100,100,100,100,0,100);
    // // ctx.quadraticCurveTo(100,100,100,0);
    // // ctx.quadraticCurveTo(100,100,200,100);
    // // ctx.quadraticCurveTo(100,100,100,200);
    // // ctx.quadraticCurveTo(100,100,0,100);
    // ctx.closePath();
    // // ctx.stroke();
    // ctx.fillStyle="red";
    // ctx.fill()

    // ctx.beginPath();
    // ctx.arc(100,100,50,0,2*Math.PI);
    // ctx.lineWidth=10;
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc(100,100,25,0,2*Math.PI);
    // ctx.fillStyle='black'
    // ctx.fill()


    // ctx.beginPath();
    // ctx.arc(100,100,50,0,2*Math.PI);
    // ctx.lineWidth=10;
    // ctx.stroke();
    // ctx.beginPath();
    // let moveToX = 100-50*1.5/3.5
    // let moveToY = 100-50*1.5/3.5
    // ctx.moveTo(moveToX,moveToY);
    // ctx.quadraticCurveTo(100,100-10,moveToX+100*3/7,moveToY);
    // ctx.quadraticCurveTo(100+10,100,moveToX+100*3/7,moveToY+100*3/7);
    // ctx.quadraticCurveTo(100,100+10,moveToX,moveToY+100*3/7);
    // ctx.quadraticCurveTo(100-10,100,moveToX,moveToY);
    // ctx.fillStyle='black'
    // ctx.fill()

    // ctx.beginPath();
    // ctx.arc(100,100,50,0,2*Math.PI);
    // ctx.lineWidth=10;
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.lineWidth=1;
    // let moveToX = 100-50*1.5/3.5
    // let moveToY = 100-50*1.5/3.5
    // let r = 10
    // // ctx.rotate(20*Math.PI/180);
    // ctx.moveTo(moveToX+r,moveToY);
    // // ctx.lineTo(moveToX+100*3/7,moveToY);
    // ctx.arc(moveToX+100*3/7-r,moveToY+r,r,-Math.PI/2,0)
    // ctx.arc(moveToX+100*3/7-r,moveToY+100*3/7-r,r,0,Math.PI/2)
    // ctx.arc(moveToX+r,moveToY+100*3/7-r,r,Math.PI/2,Math.PI)
    // ctx.arc(moveToX+r,moveToY+r,r,Math.PI,Math.PI*3/2)
    // // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY);

    // ctx.stroke();

    // ctx.beginPath();
    // ctx.arc(100,100,50,0,2*Math.PI);
    // ctx.lineWidth=10;
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.lineWidth=1;
    // let moveToX = 100-50*1.5/3.5
    // let moveToY = 100-50*1.5/3.5
    // let r = 10
    // // ctx.rotate(20*Math.PI/180);
    // ctx.moveTo(moveToX+r,moveToY);
    // // ctx.lineTo(moveToX+100*3/7,moveToY);
    // ctx.arc(moveToX+100*3/7-r,moveToY+r,r,-Math.PI/2,0)
    // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // ctx.arc(moveToX+r,moveToY+100*3/7-r,r,Math.PI/2,Math.PI)
    // ctx.arc(moveToX+r,moveToY+r,r,Math.PI,Math.PI*3/2)
    // // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY);

    // ctx.stroke();

    // ctx.fillStyle='black'
    // ctx.fill()

    // ctx.beginPath();
    // ctx.arc(100,100,50,0,2*Math.PI);
    // ctx.lineWidth=10;
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.lineWidth=1;
    // let moveToX = 100-50*1.5/3.5
    // let moveToY = 100-50*1.5/3.5
    // let r = 10
    // // ctx.rotate(20*Math.PI/180);
    // ctx.moveTo(moveToX,moveToY);
    // // ctx.lineTo(moveToX+100*3/7,moveToY);
    // ctx.arc(moveToX+100*3/7-r,moveToY+r,r,-Math.PI/2,0)
    // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // ctx.arc(moveToX+r,moveToY+100*3/7-r,r,Math.PI/2,Math.PI)
    // ctx.lineTo(moveToX,moveToY);
    // // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY);

    // ctx.stroke();

    // ctx.fillStyle='black'
    // ctx.fill()

    // ctx.beginPath();
    // ctx.arc(100,100,50,0,2*Math.PI);
    // ctx.lineWidth=10;
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.lineWidth=1;
    // let moveToX = 100-50*1.5/3.5
    // let moveToY = 100-50*1.5/3.5
    // let r = 10
    // // ctx.rotate(20*Math.PI/180);
    // ctx.moveTo(moveToX+r,moveToY);
    // ctx.lineTo(moveToX+100*3/7,moveToY);
    // // ctx.arc(moveToX+100*3/7-r,moveToY+r,r,-Math.PI/2,0)
    // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // ctx.lineTo(moveToX,moveToY+100*3/7);
    // ctx.arc(moveToX+r,moveToY+r,r,Math.PI,Math.PI*3/2)
    // // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY);

    // ctx.stroke();

    // ctx.fillStyle='black'
    // ctx.fill()


    //   let canvas = document.getElementById("mycanvas");
    //   let ctx = canvas.getContext("2d");
    //   ctx.translate(100, 100);
    //   ctx.beginPath();
    //   ctx.arc(0, 0, 50, 0, 2 * Math.PI);
    //   ctx.lineWidth = 10;
    //   ctx.stroke();
    //   ctx.beginPath();
    //   ctx.lineWidth = 1;
    //   let moveToX = -(50 * 1.5) / 3.5;
    //   let moveToY = -(50 * 1.5) / 3.5;
    //   let r = 10;
    //   ctx.rotate((45 * Math.PI) / 180);
    //   ctx.moveTo(moveToX + r, moveToY);
    //   ctx.lineTo(moveToX + (100 * 3) / 7, moveToY);
    //   // ctx.arc(moveToX+100*3/7-r,moveToY+r,r,-Math.PI/2,0)
    //   ctx.lineTo(moveToX + (100 * 3) / 7, moveToY + (100 * 3) / 7);
    //   ctx.lineTo(moveToX, moveToY + (100 * 3) / 7);
    //   ctx.arc(moveToX + r, moveToY + r, r, Math.PI, (Math.PI * 3) / 2);
    //   // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    //   // ctx.lineTo(moveToX,moveToY+100*3/7);
    //   // ctx.lineTo(moveToX,moveToY);

    //   ctx.stroke();

    //   ctx.fillStyle = "black";
    //   ctx.fill();




    // let outR = 20;
    // ctx.translate(100, 100);
    // ctx.beginPath();
    // ctx.moveTo(-50 + outR, -50);
    // ctx.arc(50 - outR, -50 + outR, outR, -Math.PI / 2, 0);
    // ctx.arc(50 - outR, 50 - outR, outR, 0, Math.PI / 2);
    // ctx.arc(-50 + outR, 50 - outR, outR, Math.PI / 2, Math.PI);
    // ctx.arc(-50 + outR, -50 + outR, outR, Math.PI, (Math.PI * 3) / 2);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.save();
    // ctx.beginPath();
    // ctx.scale(0.7, 0.7);
    // ctx.moveTo(-50, -50);
    // ctx.arc(50 - outR, -50 + outR, outR, -Math.PI / 2, 0);
    // ctx.arc(50 - outR, 50 - outR, outR, 0, Math.PI / 2);
    // ctx.arc(-50 + outR, 50 - outR, outR, Math.PI / 2, Math.PI);
    // ctx.arc(-50 + outR, -50 + outR, outR, Math.PI, (Math.PI * 3) / 2);
    // ctx.globalCompositeOperation = "destination-out";
    // ctx.fillStyle = "blue";
    // ctx.fill();
    // ctx.restore();
    // ctx.beginPath();
    // ctx.lineWidth = 1;
    // let moveToX = -(50 * 1.5) / 3.5;
    // let moveToY = -(50 * 1.5) / 3.5;
    // let r = 10;
    // ctx.rotate((45 * Math.PI) / 180);
    // ctx.moveTo(moveToX + r, moveToY);
    // ctx.lineTo(moveToX + (100 * 3) / 7, moveToY);
    // // ctx.arc(moveToX+100*3/7-r,moveToY+r,r,-Math.PI/2,0)
    // ctx.lineTo(moveToX + (100 * 3) / 7, moveToY + (100 * 3) / 7);
    // ctx.lineTo(moveToX, moveToY + (100 * 3) / 7);
    // ctx.arc(moveToX + r, moveToY + r, r, Math.PI, (Math.PI * 3) / 2);
    // // ctx.lineTo(moveToX+100*3/7,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY+100*3/7);
    // // ctx.lineTo(moveToX,moveToY);

    // ctx.stroke();

    // ctx.fillStyle = "black";
    // ctx.fill();
  },
  liquid() {
    //     ctx.save()
    // ctx.translate(100,100)
    // ctx.beginPath();
    // ctx.arc(0,0,50,0,Math.PI*2)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
    // ctx.save()
    // ctx.translate(200,200)
    // ctx.beginPath();
    // ctx.arc(0,0,50,0,Math.PI*2)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
    // ctx.save()
    // ctx.translate(100,100)
    // ctx.beginPath();
    // ctx.moveTo(0,0)
    // ctx.lineTo(100,100)
    // ctx.lineTo(100,50)
    // ctx.arc(100,0,50,Math.PI/2,Math.PI)
    // ctx.lineTo(0,0)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
    // ctx.save()
    // ctx.translate(100,100)
    // ctx.beginPath();
    // ctx.moveTo(0,0)
    // ctx.lineTo(100,100)
    // ctx.lineTo(50,100)
    // ctx.arc(0,100,50,0,-Math.PI/2,true)
    // ctx.lineTo(0,0)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
  }

}

export default createQrcode