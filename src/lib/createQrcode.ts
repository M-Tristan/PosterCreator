
import * as QRCode from "qrcode";

interface color {
    dark: string,
    light: string,
}
interface codeParams {
    width: number,
    color: color,
    pointType: string,
    eyeType: string
}
const createQrcode = {
    size: 0,
    color: {} as any,
    points: [] as any,
    canvas: null as unknown as HTMLCanvasElement,
    ctx: null as unknown as CanvasRenderingContext2D,
    pointType: 'rect',
    eyeType: 'N-A',
    create(text: string, option: codeParams) {
        let qrcodeData = QRCode.create(text, {})
        this.color = option.color
        this.eyeType = option.eyeType
        this.pointType = option.pointType
        let modules = qrcodeData.modules
        this.points = modules.data
        this.size = modules.size
        this.canvas = document.createElement('canvas') as HTMLCanvasElement
        this.canvas.width = option.width
        this.canvas.height = option.width
        this.canvas.style.position = 'fixed'
        this.canvas.style.zIndex = '9999'
        this.canvas.style.left = '400px'
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.render()

    },
    render() {
        this.drawPoints()
        this.drawCodeEye()
        let ctx = this.ctx
        ctx.save()
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = this.color.light
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.restore()
        document.body.appendChild(this.canvas)
    },
    drawPoints() {
        let pointIndex = 0
        let size = this.size
        let points = this.points
        let width = this.canvas.width / this.size
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                pointIndex++

                if ((row < 7 && col < 7) || (row < 7 && col > this.size - 8) || (row > this.size - 8 && col < 7)) {
                    continue
                }
                let point = points[pointIndex - 1]
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
    drawCodeEye() {
        switch (this.eyeType) {
            case 'N-A':
                this.drawEyeBorder('A')
                break
            case 'N-B':
                this.drawEyeBorder('B')
                break
        }


    },
    drawEyeBorder(type: string) {
        let width = this.canvas.width / this.size
        let pozitionList = [] as Array<any>
        pozitionList.push({
            left: 0,
            top: 0
        })
        pozitionList.push({
            left: width * (this.size - 7),
            top: 0
        })
        pozitionList.push({
            top: width * (this.size - 7),
            left: 0
        })
        pozitionList.forEach(item => {
            switch (type) {
                case 'A':
                    this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width })
                    this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
                    break
                case 'B':
                    this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width, borderRadius: width * 2 })
                    this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
                    break;
            }
        });

    },
    drawSquare(option) {
        let ctx = this.ctx
        let left = option.left
        let top = option.top
        let width = option.width
        let borderWidth = option.borderWidth ? option.borderWidth : width / 7
        let color = this.color.dark
        let fill = option.fill
        let borderRadius = option.borderRadius ? option.borderRadius : 0
        console.log(borderRadius)
        ctx.save()
        ctx.translate(left + width / 2, top + width / 2)
        ctx.beginPath()
        ctx.moveTo(-width / 2 + borderRadius, -width / 2)
        ctx.arc(width / 2 - borderRadius, -width / 2 + borderRadius, borderRadius, -Math.PI / 2, 0)
        ctx.arc(width / 2 - borderRadius, width / 2 - borderRadius, borderRadius, 0, Math.PI / 2)
        ctx.arc(-width / 2 + borderRadius, width / 2 - borderRadius, borderRadius, Math.PI / 2, Math.PI)
        ctx.arc(-width / 2 + borderRadius, -width / 2 + borderRadius, borderRadius, Math.PI, Math.PI * 3 / 2)
        // ctx.arc(0, 0, 50, 0, Math.PI * 2)
        // ctx.arc(0, 0, 50, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
        if (!fill) {
            let scale = (width - 2 * borderWidth) / width
            ctx.beginPath()
            ctx.scale(scale, scale)
            ctx.moveTo(-width / 2 + borderRadius, -width / 2)
            ctx.arc(width / 2 - borderRadius, -width / 2 + borderRadius, borderRadius, -Math.PI / 2, 0)
            ctx.arc(width / 2 - borderRadius, width / 2 - borderRadius, borderRadius, 0, Math.PI / 2)
            ctx.arc(-width / 2 + borderRadius, width / 2 - borderRadius, borderRadius, Math.PI / 2, Math.PI)
            ctx.arc(-width / 2 + borderRadius, -width / 2 + borderRadius, borderRadius, Math.PI, Math.PI * 3 / 2)
            ctx.closePath()
            ctx.globalCompositeOperation = 'destination-out'
            ctx.fillStyle = 'white'
            ctx.fill()
        }

        ctx.restore()
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