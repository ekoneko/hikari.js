class Animate.Blink extends Animate

	__animateType: 'blink'

	init = (self)->
		self.__timer = 0	# 计时器
		self.__frame = 0	# 当前帧
		self.__count = 0	# 总帧
		self.__start = off	# 是否开始动画
		self.__next = 0		# 下次刷新计时
		self.__orginTone = null
		self.__newTone = null

		self.entity = null	# 动画事体
		self.color = null	# 闪烁颜色{r,g,b}
		self.path = null
		self.delta = 1		# 时间增量/帧
		self.onFinish = null # 结束时回调

	start: (timer)=>
		return off if @__start
		@__timer = timer
		@__start = on

		if @entity.tone()
			@__orginTone = @entity.tone()
			@__newTone = orginTone.clone()
		else
			@__orginTone = null
			@__newTone = new DataType.Tone()
		@__count = @__timer / @delta
		on

	update: ()=>
		return off unless @__start

		return on if --@__next > 0
		@__next = @delta

		r = @color.r / @__count * @__frame
		g = @color.g / @__count * @__frame
		b = @color.b / @__count * @__frame
		@__newTone.red @__newTone.red() + r
		@__newTone.green @__newTone.green() + g
		@__newTone.blue @__newTone.blue() + b

		@entity.tone @__newTone

		@__frame += @delta
		@__timer -= @delta

		if @__timer < 1
			# animate finish
			@__timer = 0
			@__start = off
			@entity.tone @__orginTone
			@__newTone.destory()
			@onFinish() if @onFinish is 'function'

	constructor: (sprite, color, path)->
		super()
		init this
		@entity = sprite
		@path = path
		@color = color