class Vector.Line extends Vector

	__vectorType: 'line'

	init = (self)->
		self.__options =
			start:
				x: 0
				y: 0
			end:
				x: 0
				y: 0

	isInside: (x, y)->
		off

	move: (dx, dy)=>
		@__options.start.x += dx
		@__options.start.y += dy

		@__options.end.x += dx
		@__options.end.y += dy

	constructor: (start, end) ->
		init this

		@__options.start = start
		@__options.end = end