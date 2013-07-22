class Animate.Marquee extends Animate

	__animateType: 'marquee'
	init = (self)->
		self.__timer = 0	# 计时器
		self.__start = off	# 是否开始动画
		self.__next = 0		# 下次刷新计时
		self.__initial = null # 初始状态
		self.__bx = 0
		self.__by = 0

		self.entity = null	# 动画事体
		self.dx = 0
		self.dy = 0
		self.direct = 0
		self.width = 0
		self.height = 0
		self.delta = 1		# 时间增量/帧
		self.onFinish = null # 结束时回调

	start: (timer)=>
		return off if @__start
		@__timer = timer
		@__start = on
		@__bx = @entity.options().bx
		@__by = @entity.options().by
		@__initial =
			bx: @__bx
			by: @__by
		on

	renew: ()=>
		@entity.options @__initial
		@entity.__imageChanged = on

	update: ()=>
		return off unless @__start

		return on if --@__next > 0
		@__next = @delta

		unless @direct is 1
			# 水平偏移
			d = parseInt @dx / @width, 10
			dx = @dx - d * @width
			dy = 0
			if (@__bx + dx) >= @width
				dx -= @width
				dy = ++d * @dy
			@entity.offset dx, dy
		else
			# 竖直偏移
			d = parseInt @dy / @height, 10
			dy = @dy - d * @height
			dx = 0
			if (-@__by + dy) >= @height
				dy -= @height
				dx = ++d * @dx
			@entity.offset dx, dy
		opt = @entity.options()
		@__bx = opt.bx
		@__by = opt.by

		@__timer -= @delta

		if @__timer < 1
			# animate finish
			@__timer = 0
			@__start = off
			@onFinish() if typeof @onFinish is 'function'

	# options
	# 	sprite
	# 	dx (数值 or %)
	# 	dy (数值 or %)
	# 	direct (0 or 1)
	# 	width
	# 	height
	constructor: (options)->
		super()
		init this

		@entity = options.sprite
		@direct = if options.direct is 1 then 1 else 0
		@width = options.width
		@height = options.height
		@width ?= @entity.bitmap().width()
		@height ?= @entity.bitmap().height()
		@dx = options.dx
		@dy = options.dy
		# 若小于1则视为按百分比偏移
		@dx = @width() * @dx if Math.abs(@dx) < 1
		@dy = @height() * @dy if Math.abs(@dy) < 1