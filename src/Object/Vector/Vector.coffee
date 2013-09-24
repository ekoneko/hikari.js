class Vector extends Object

	__type: 'vector'
	__vectorType: ''
	__options: new Object()

	vectorType: =>
		@__vectorType

	isInside: (x, y) =>

	move: (dx, dy) =>

	options: (options) =>
		if options
			@__options[key] = options[key] for key of options when typeof @__options[key] isnt 'undefined'
		@__options

	clone: =>