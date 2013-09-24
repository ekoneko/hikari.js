class Animate.Tone extends Animate

	__animateType: 'blink'

	__timer: 0		# 计时器
	__frame:0		# 当前帧
	__count: 0		# 总帧
	__start: off	# 是否开始动画
	__next: 0		# 下次刷新计时
	__orginTone: null
	__newTone: null

	entity: null	# 动画实体
	tone: null		# 变化色调
	delta: 1		# 时间增量/帧
	onFinish: null	# 结束时回调

	constructor: (sprite, tone) ->
		super()
		@entity = sprite
		@tone = tone

	start: (timer) =>
		return off if @__start
		@__timer = timer
		@__start = on

		if @entity.tone()
			@__orginTone = @entity.tone()
			@__newTone = @__orginTone.clone()
		else
			@__orginTone = new Hikari.DataType.Tone()
			@__newTone = @__orginTone.clone()
		@__count = @__timer / @delta
		on

	renew: =>
		@entity.__imageChanged = on
		@entity.tone @__orginTone

	update: =>
		return off unless @__start
		return on if --@__next > 0

		@__next = @delta
		r = (@tone.red() - @__orginTone.red()) / @__count * @__frame
		g = (@tone.green() - @__orginTone.green()) / @__count * @__frame
		b = (@tone.blue() - @__orginTone.blue()) / @__count * @__frame
		@__newTone.red Math.min 255, Math.max(0, r)
		@__newTone.green Math.min 255, Math.max(0, g)
		@__newTone.blue Math.min 255, Math.max(0, b)

		@entity.tone @__newTone

		@__frame += @delta
		@__timer -= @delta

		if @__timer < 1
			# animate finish
			@__timer = 0
			@__start = off
			@entity.tone @__orginTone
			@__newTone.destroy()
			@onFinish() if typeof @onFinish is 'function'
