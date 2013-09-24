class Animate.Move extends Animate

	__animateType: 'move'

	__timer: 0		# 计时器
	__frame: 0		# 当前帧
	__start: off	# 是否开始动画
	__next: 0		# 下次刷新计时

	entity: null	# 动画事体
	path: null		# function(t) return {x, y}
	delta: 1		# 时间增量/帧
	onFinish: null	# 结束时回调

	constructor: (sprite, path) ->
		super()
		@entity = sprite
		@path = path

	start: (timer) =>
		return off if @__start
		@__timer = timer
		@__start = on
		on

	update: =>
		return off unless @__start
		return on if --@__next > 0

		@__next = @delta
		@__frame += @delta
		@__timer -= @delta
		point = @path @__frame
		@entity.x point.x
		@entity.y point.y

		if @__timer < 1
			# animate finish
			@__timer = @__frame = 0
			@__start = off
			@onFinish() if @onFinish is 'function'
