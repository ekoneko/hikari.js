class HTML.IMG extends HTML
	
	__htmlType: 'img'
	__options:
		x: 0
		y: 0
		z: 1
		width: 0
		height: 0

	stage: null

	constructor: (stage) ->
		@stage = stage if stage and stage.type() is 'stage'

	__style: (img) =>
		img.style.position = 'absolute'
		img.style.left = "#{@__options.x}px"
		img.style.top = "#{@__options.y}px"
		img.style.zIndex = @__options.z
		img.width = @__options.width
		img.height = @__options.height

	build: (options, callback) =>
		@element = new Image()
		@element.onload = ->
			callback() if typeof callback is 'function'

		for i in ['x', 'y', 'z', 'width', 'height']
			@__options[i] = options[i]

		@__style @element
		@element.src = options.src

	destroy: =>
		@remove()
		super()

	set: (options) =>
		for i in ['x', 'y', 'z', 'width', 'height']
			@__options[i] = options[i] if options[i]
		@__style @element
