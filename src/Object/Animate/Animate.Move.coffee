class Animate.Move extends Animate

	__animateType: 'move'

	init = (self)->
		self.__timer = 0	# 计时器
		self.__frame = 0	# 当前帧
		self.__start = off	# 是否开始动画
		self.__next = 0		# 下次刷新计时

		self.entity = null	# 动画事体
		self.path = null	# function(t) return {x, y}
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

		point = @path @__frame
		@entity.x point.x
		@entity.y point.y
		@__frame += @delta
		@__timer -= @delta

		if @__timer < 1
			# animate finish
			@__timer = @__frame = 0
			@__start = off
			@onFinish() if @onFinish is 'function'

	constructor: (sprite, path)->
		super()
		init this

		@entity = sprite
		@path = path
