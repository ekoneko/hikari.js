class Vector.Line extends Vector

	__vectorType: 'line'
	__options:
		start:
			x: 0
			y: 0
		end:
			x: 0
			y: 0

	constructor: (start, end) ->
		@__options.start = start
		@__options.end = end

	isInside: (x, y) ->
		off

	move: (dx, dy) =>
		@__options.start.x += dx
		@__options.start.y += dy

		@__options.end.x += dx
		@__options.end.y += dy

	clone: =>
		new Vector.Line @__options.start, @__options.end
