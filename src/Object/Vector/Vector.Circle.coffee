class Vector.Circle extends Vector

	__vectorType: 'circle'
	options:
		origin:
			x: 0
			y: 0
		radius: 0

	constructor: (origin, radius) ->
		@options = {}
		@options.origin = origin
		@options.radius = radius