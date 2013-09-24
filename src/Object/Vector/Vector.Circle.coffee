class Vector.Circle extends Vector

	__vectorType: 'circle'
	__options =
		origin:
			x: 0
			y: 0
		radius: 0

	constructor: (origin, radius) ->
		@__options.origin = origin
		@__options.radius = radius

	isInside: (x, y)=>
		Math.pow((@__options.x - x), 2) + Math.pow((@__options.y - y), 2) <= options.radius * options.radius

	move: (dx, dy)=>
		@__options.origin.x += dx
		@__options.origin.y += dy

	clone: =>
		new Vector.Circle @__options.origin, @__options.radius