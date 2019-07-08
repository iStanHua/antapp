// my/canvas.js
const app = getApp()

Page({
  data: {
    showShareImg: false,
    shareImgSrc: '',
    ctxWidth: 0,
    ctxHeight: 0
  },
  onLoad() {
    const sys = my.getSystemInfoSync()
    this.setData({
      ctxWidth: sys.windowWidth,
      ctxHeight: sys.windowHeight
    })
    this.drawPoster()
  },
  drawPoster() {
    this.ctx = my.createCanvasContext('posterCanvas')

    let bgImgPath = '/images/bg.jpg'
    let logoImgPath = '/images/logo.jpg'
    let qrImgPath = '/images/qr.jpg'

    let halfHeight = this.data.ctxHeight / 2

    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.drawImage(bgImgPath, 0, 0, this.data.ctxWidth, halfHeight)

    this.ctx.setFillStyle('#f8f8f9')
    this.ctx.fillRect(0, halfHeight, this.data.ctxWidth, halfHeight)

    this.ctx.arc(45, halfHeight + 45, 25, 0, 2 * Math.PI)
    this.ctx.setFillStyle('#EEEEEE')
    // this.ctx.fill()
    this.ctx.clip()
    this.ctx.drawImage(logoImgPath, 20, halfHeight + 20, 50, 50)
    this.ctx.restore()

    this.ctx.setFontSize(20)
    this.ctx.setFillStyle('#333333')
    this.ctx.fillText('stanhua', 80, halfHeight + 45)

    this.ctx.setFontSize(22)
    this.ctx.setFillStyle('#000000')
    this.ctx.fillText('宠友们快来围观萌宠靓照', 20, halfHeight + 135)
    this.ctx.fillText('我在萌爪幼稚园', 20, halfHeight + 165)

    this.ctx.setFontSize(21)
    this.ctx.setFillStyle('#666666')
    this.ctx.fillText('长按识别小程序码', 20, this.data.ctxHeight - 20)

    this.ctx.drawImage(qrImgPath, this.data.ctxWidth - 100, this.data.ctxHeight - 140, 80, 80)

    this.ctx.draw()
  },
  showLayer() {
    let $this = this
    this.ctx.toTempFilePath({
      success(res) {
        console.log(res.apFilePath)
        $this.setData({
          showShareImg: true,
          shareImgSrc: res.apFilePath
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  savePoster() {
    my.saveImage({
      url: this.data.shareImgSrc,
      success() {
        my.showToast({
          type: 'none',
          content: '图片保存成功，快去分享到朋友圈吧~',
          duration: 2000
        })
      }
    })
  }
})
