class Animate.Marquee extends Animate

	__animateType: 'marquee'

	__timer: 0	# 计时器
	__start: off	# 是否开始动画
	__next: 0		# 下次刷新计时
	__initial: null # 初始状态
	__bx: 0
	__by: 0

	entity: null	# 动画实体
	dx: 0
	dy: 0
	direct: 0
	width: 0
	height: 0
	delta: 1		# 时间增量/帧
	onFinish: null # 结束时回调

	# options
	# 	sprite
	# 	dx (数值 or %)
	# 	dy (数值 or %)
	# 	direct (0 or 1)
	# 	width
	# 	height
	constructor: (options) ->
		super()

		@entity = options.sprite
		@direct = if options.direct is 1 then 1 else 0
		@width = options.width or @entity.bitmap().width()
		@height = options.height or @entity.bitmap().height()
		@dx = options.dx
		@dy = options.dy
		# 若小于1则视为按百分比偏移
		@dx = @width() * @dx if Math.abs(@dx) < 1
		@dy = @height() * @dy if Math.abs(@dy) < 1

	start: (timer) =>
		return off if @__start
		@__timer = timer
		@__start = on
		@__bx = @entity.options().bx
		@__by = @entity.options().by
		@__initial =
			bx: @__bx
			by: @__by
		on

	renew: =>
		@entity.options @__initial
		@entity.__imageChanged = on

	update: =>
		return off unless @__start
		return on if --@__next > 0
		@__next = @delta

		if @direct is 1
			# 竖直偏移
			d = parseInt @dy / @height, 10
			dy = @dy - d * @height
			dx = 0
			if (-@__by + dy) >= @height
				dy -= @height
				dx = ++d * @dx
			@entity.offset dx, dy
		else
			# 水平偏移
			d = parseInt @dx / @width, 10
			dx = @dx - d * @width
			dy = 0
			if (@__bx + dx) >= @width
				dx -= @width
				dy = ++d * @dy
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
