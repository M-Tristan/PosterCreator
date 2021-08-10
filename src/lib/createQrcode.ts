import { number } from "echarts";
import * as QRCode from "qrcode";
const createQrcode = {
    size: number,
    create(text) {
        let qrcodeData = QRCode.create(text, {})
        let modules = qrcodeData.modules
        let points = modules.data
        let size = modules.size
        this.size = size
        let canvas = document.createElement('canvas')
        canvas.width = size * 10
        canvas.height = size * 10
        canvas.style.position = 'fixed'
        canvas.style.zIndex = '9999'
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        let pointIndex = 0
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                let point = points[pointIndex++]
                if (point === 1) {

                    // ctx.arc(row * 10 + 5, col * 10 + 5, 5, 0, 2 * Math.PI);
                    // this.rect(ctx, row, col)
                    // this.circle(ctx, row, col)
                    this.star(ctx, row, col)
                    ctx.fillStyle = 'red'
                    ctx.fill()
                }

            }
        }
        document.body.appendChild(canvas)
    },
    star(ctx, row, col) {
        if ((row <= 6 && col <= 6) || (row >= (Number(this.size) - 7) && col <= 6) || (row <= 6 && col >= (Number(this.size) - 7))) {
            ctx.beginPath();
            ctx.rect(row * 10, col * 10, 10, 10)
            ctx.fillStyle = 'red'
            ctx.fill()
            return
        }
        ctx.beginPath();
        ctx.moveTo(row * 10 + 5, col * 10);
        // ctx.bezierCurveTo(100, 100, 100, 100, 100, 0);
        // ctx.bezierCurveTo(100, 100, 100, 100, 200, 100);
        // ctx.bezierCurveTo(100, 100, 100, 100, 100, 200);
        // ctx.bezierCurveTo(100, 100, 100, 100, 0, 100);
        // ctx.bezierCurveTo(row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10 + 5, row * 10, col * 10 + 5);
        // ctx.bezierCurveTo(row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10 + 10);
        // ctx.bezierCurveTo(row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10 + 5, row * 10 + 10, col * 10 + 5);
        // ctx.bezierCurveTo(row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10);

        ctx.quadraticCurveTo(row * 10 + 5, col * 10 + 5, row * 10, col * 10 + 5);
        ctx.quadraticCurveTo(row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10 + 10);
        ctx.quadraticCurveTo(row * 10 + 5, col * 10 + 5, row * 10 + 10, col * 10 + 5);
        ctx.quadraticCurveTo(row * 10 + 5, col * 10 + 5, row * 10 + 5, col * 10);
        ctx.closePath();
        // ctx.stroke();
        ctx.fillStyle = "red";
        ctx.fill()
    },
    rect(ctx, row, col) {

        if ((row <= 6 && col <= 6) || (row >= (Number(this.size) - 7) && col <= 6) || (row <= 6 && col >= (Number(this.size) - 7))) {
            ctx.beginPath();
            ctx.rect(row * 10, col * 10, 10, 10)
            ctx.fillStyle = 'red'
            ctx.fill()
            return
        }
        ctx.beginPath();
        ctx.rect(row * 10 + 1.5, col * 10 + 1.5, 8, 8)
        ctx.fillStyle = 'red'
        ctx.fill()
    },
    circle(ctx, row, col) {
        if ((row <= 6 && col <= 6) || (row >= (Number(this.size) - 7) && col <= 6) || (row <= 6 && col >= (Number(this.size) - 7))) {
            ctx.beginPath();
            ctx.rect(row * 10, col * 10, 10, 10)
            ctx.fillStyle = 'red'
            ctx.fill()
            return
        }
        ctx.beginPath();
        ctx.arc(row * 10 + 5.5, col * 10 + 5.5, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'red'
        ctx.fill()
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
    }

}

export default createQrcode