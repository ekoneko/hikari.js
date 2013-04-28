class Vector.Rect extends Vector
	vectorType = 'rect'
	options:
		start:
			x: 0
			y: 0
		width: 0
		height: 0
	constructor: (start, width, height) ->
		@options.start = start
		@options.width = width
		@options.height = height