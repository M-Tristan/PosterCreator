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
                    this.circle(ctx, row, col)
                    ctx.fillStyle = 'red'
                    ctx.fill()
                }

            }
        }
        document.body.appendChild(canvas)
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
    }

}

export default createQrcode