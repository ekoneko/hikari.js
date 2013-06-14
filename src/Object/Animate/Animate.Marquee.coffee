class Animate.Marquee extends Animate

	__animateType: 'marquee'
	init = (self)->
		self.__timer = 0	# 计时器
		self.__start = off	# 是否开始动画
		self.__next = 0		# 下次刷新计时

		self.entity = null	# 动画事体
		self.dx = 0
		self.dy = 0
		self.delta = 1		# 时间增量/帧
		self.onFinish = null # 结束时回调

	start: (timer)=>
		return off if @__start
		@__timer = timer
		@__start = on
		on

	update: ()=>
		return off unless @__start

		return on if --@__next > 0
		@__next = @delta

		@entity.offset dx, dy
		@__timer -= @delta

		if @__timer < 1
			# animate finish
			@__timer = 0
			@__start = off
			@onFinish() if @onFinish is 'function'

	constructor: (sprite, dx, dy)->
		super()
		init this

		@entity = sprite
		@dx = dx
		@dy = dy
