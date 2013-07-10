class Animate.Tone extends Animate

	__animateType: 'blink'

	init = (self)->
		self.__timer = 0	# 计时器
		self.__frame = 0	# 当前帧
		self.__count = 0	# 总帧
		self.__start = off	# 是否开始动画
		self.__next = 0		# 下次刷新计时
		self.__orginTone = null
		self.__newTone = null

		self.entity = null	# 动画实体
		self.tone = null	# 变化色调
		self.delta = 1		# 时间增量/帧
		self.onFinish = null # 结束时回调

	start: (timer)=>
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

	renew: ()=>
		@entity.__imageChanged = on
		@entity.tone @__orginTone

	update: ()=>
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

	constructor: (sprite, tone)->
		super()
		init this
		@entity = sprite
		@tone = tone