Component({
  props: {
    fillText: '侵权必究' // 水印文本，默认值
  },
  didMount() {
    this.ctx = my.createCanvasContext('canvas');
    this.drawWater();
  },
  didUpdate() {
    this.drawWater();
  },
  methods: {
    /**
     * @name drawWater
     * @description 填充水印
     */
    drawWater() {
      const { fillText } = this.props;
      this.ctx.rotate(18 * Math.PI / 180);// 设置文字的旋转角度，角度为30°
      // 对斜对角线以左部分进行文字的填充
      for (let j = 1; j < 10; j++) { // 用for循环达到重复输出文字的效果，这个for循环代表纵向循环
        this.fill(fillText, 0, 90 * j);
        for (let i = 1; i < 10; i++) { // 这个for循环代表横向循环，
          this.fill(fillText, 130 * i, 80 * j);
        }
      }// 两个for循环的配合，使得文字充满斜对角线的左下部分

      // 对斜对角线以右部分进行文字的填充逻辑同上
      for (let j = 0; j < 10; j++) {
        this.fill(fillText, 0, -80 * j);
        for (let i = 1; i < 10; i++) {
          this.fill(fillText, 130 * i, -80 * j);
        }
      }
      this.ctx.draw();
    },
    /**
     * @name fill
     * @description 绘画水印
     */
    fill(text, x, y) {
      this.ctx.beginPath();
      this.ctx.setFontSize(20);
      this.ctx.setFillStyle('rgba(169,169,169,.2)');
      this.ctx.fillText(text, x, y);
    }

  }
});
