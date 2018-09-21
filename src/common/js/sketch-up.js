class SketchUp {
  constructor (props) {
    this.ctx = props.ctx // canvas上下文
  }

  // 设置参数
  setParams (propCanvas, boardPos) {
    this.boardPos = boardPos // 画板信息
    this.rPos = {left: 0 - boardPos.left, top: 0 - boardPos.top} // 相对位置坐标差值
    this.prop = propCanvas // canvas画的倍数
    return this
  }

  // select 元素
  select (query, el) {
    query.select(el).boundingClientRect()
    // query.select(el).scrollOffset()
    return this
  }

  // select 多个元素
  selectAll (query, el) {
    query.selectAll(el).boundingClientRect()
    // query.selectAll(el).scrollOffset()
    return this
  }

  /**
   * canvas 每行的字
   * @param text 文本文件
   * @param sumLen 文字的总长度
   * @param lineLen 每行文字的长度
   * @returns {Array} return每行文字的数组
   * @private
   */
  _spliceTextLine2 (text, sumLen, lineLen) {
    let arr = []
    let line = sumLen / lineLen
    let textLen = text.length
    let everyLineNumber = Math.floor(textLen / line)
    for (let i = 0; i < line; i++) {
      arr.push(text.substring(i * everyLineNumber, everyLineNumber * (i + 1)))
    }
    return arr
  }

  _spliceTextLine (ctx, str, res) {
    let arr = []
    let lineWidth = 0
    let lastSubStrIndex = 0 // 每次开始截取的字符串的索引
    let canvasWidth = res.width
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width
      if (lineWidth > canvasWidth) {
        arr.push(str.substring(lastSubStrIndex, i))
        lineWidth = 0
        lastSubStrIndex = i
      }
      if (i === str.length - 1) { // 绘制剩余部分
        arr.push(str.substring(lastSubStrIndex, i + 1))
      }
    }
    return arr
  }

  // _checkTextLine() {
  // }
  /**
   * 文本对齐方式
   * @param align 排列方式
   * @param centerType 居中形式（相对画板居中，相对盒子居中）
   * @param xAdjust 可调整的偏移量x轴
   * @param res 盒子信息
   * @returns {number}
   * @private
   */
  _textAlignX (align, centerType, xAdjust, res) {
    let x = 0
    switch (align) {
      case 'center': {
        x = (this.boardPos.width + xAdjust) / 2 * this.prop
        if (centerType !== 'all') {
          x = ((res.left + this.rPos.left) + res.width / 2 + xAdjust) * this.prop
        }
        break
      }
      case 'left': {
        x = (res.left + this.rPos.left + xAdjust) * this.prop
        break
      }
      default: {
        break
      }
    }
    return x
  }

  /**
   * 绘制多行文本
   * @param text  文本内容
   * @param color 颜色
   * @param fontSize  字体大小
   * @param align 排列方式
   * @param res 盒子信息
   * @param textMargin  换行间距调整比例
   * @param textBaseline  文本基线
   * @param xAdjust 可调整的偏移量x轴
   * @param yAdjust 可调整的偏移量y轴
   * @private
   */
  drawMultiText (text, color, fontSize, align, res, textMargin = 1.6, textBaseline = 'top', centerType = 'all', xAdjust = 0, yAdjust = 0, lineTape = 1) {
    if (!text) return
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.setTextBaseline(textBaseline)
    this.ctx.setFillStyle(color)
    this.ctx.setFontSize(fontSize)
    this.ctx.setTextAlign(align)
    // 匹配换行符
    let newArr = text.split(/\n|\r/g)
    // 分割数组中所有的文字
    let newTextArr = []
    newArr.forEach(item => {
      let newText = item
      // let len = this.ctx.measureText(newText).width
      // newText = this._spliceTextLine(newText, len, res.width * this.prop * lineTape)
      item && (newText = this._spliceTextLine(this.ctx, newText, res)) // todo 修改文字换行的方式
      if (item) {
        newTextArr.push(...newText)
      } else {
        newTextArr.push('')
      }
    })
    // 开始绘制文字
    let baseY = res.top + this.rPos.top + yAdjust // 基础y轴位置
    newTextArr.forEach((item, index) => {
      this.ctx.setFontSize(fontSize)
      let y = (baseY + (index * fontSize * textMargin)) * this.prop
      let x = this._textAlignX(align, centerType, xAdjust, res)
      this.ctx.fillText(item, x, y)
    })
    this.ctx.restore()
  }

  /**
   * 绘制文本
   * @param text  文本内容
   * @param color 颜色
   * @param fontSize  字体
   * @param align 排列方式
   * @param res 盒子信息
   * @param textBaseline  文本基线方式
   * @param centerType  居中形式（相对画板居中，相对盒子居中）
   * @param xAdjust 可调整的偏移量x轴
   * @param yAdjust 可调整的偏移量y轴
   * @private
   */
  drawText (text, color, fontSize, align, res, textBaseline = 'top', centerType = 'all', xAdjust = 0, yAdjust = 0) {
    if (!text) return
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.setTextBaseline(textBaseline)
    this.ctx.setFillStyle(color)
    this.ctx.setFontSize(fontSize)
    this.ctx.setTextAlign(align)
    let x = this._textAlignX(align, centerType, xAdjust, res)
    let y = (res.top + this.rPos.top + yAdjust) * this.prop
    this.ctx.fillText(text, x, y)
    this.ctx.restore()
  }

  /**
   * 绘制圆形
   * @param r 半径
   * @param res 盒子的信息
   * @param xAdjust 可调整的偏移量x轴
   * @param yAdjust 可调整的偏移量y轴
   * @private
   */
  drawCircle (r, res, xAdjust = 0, yAdjust = 0) {
    let x = (res.left + this.rPos.left + res.width / 2 + xAdjust) * this.prop
    let y = (res.top + this.rPos.top + res.height / 2 + xAdjust) * this.prop
    this.ctx.arc(x, y, r, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  /**
   * 绘制图片
   * @param imgUrl  图片路径
   * @param res 盒子信息
   * @param xAdjust 可调整的偏移量x轴
   * @param yAdjust 可调整的偏移量y轴
   * @private
   */
  drawImg (imgUrl, res, xAdjust = 0, yAdjust = 0, mode, imgInfo, color = '#fff') {
    if (!imgUrl) return
    let x = (res.left + this.rPos.left + xAdjust) * this.prop
    let y = (res.top + this.rPos.top + yAdjust) * this.prop
    let w = res.width * this.prop
    let h = res.height * this.prop
    if (!mode) {
      this.ctx.drawImage(imgUrl, x, y, w, h)
      return
    }
    let sW = imgInfo.width
    let sH = imgInfo.height
    let sWH = sW / sH
    let nx, ny, nw, nh
    switch (mode) {
      case 'aspectFill': {
        if ((w <= h && sW <= sH) || (w > h && sW <= sH)) {
          nw = w
          nh = nw / sWH
          ny = y - (nh - h) / 2
          nx = x
        } else {
          nh = h
          nw = nh * sWH
          nx = x - (nw - w) / 2
          ny = y
        }
        break
      }
      case 'widthFix': {
        nw = w
        nh = nw / sWH
        ny = y
        nx = x
        break
      }
      default:
        break
    }
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.setStrokeStyle(color)
    this.ctx.setFillStyle(color)
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x, y)
    this.ctx.lineTo(x + w, y)
    this.ctx.lineTo(x + w, y + h)
    this.ctx.lineTo(x, y + h)
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
    // this.ctx.fillRect(x, y, w, h)
    this.ctx.closePath()
    this.ctx.clip()
    this.ctx.drawImage(imgUrl, nx, ny, nw, nh)
    this.ctx.restore()
  }

  /**
   * 填充矩形
   * @param color
   * @param res
   * @param xAdjust
   * @param yAdjust
   */
  fillRect (color = '#fff', res, xAdjust = 0, yAdjust = 0) {
    let x = (res.left + this.rPos.left + xAdjust) * this.prop
    let y = (res.top + this.rPos.top + yAdjust) * this.prop
    let w = res.width * this.prop
    let h = res.height * this.prop
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.setFillStyle(color)
    this.ctx.fillRect(x, y, w, h)
    this.ctx.restore()
  }

  /**
   * 填充画板
   * @param color
   * @param res
   */
  fullCanvas (color, res) {
    res.top = 0
    res.left = 0
    this.fillRect(color, res)
  }
}

export default SketchUp
