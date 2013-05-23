class HTML.BLOCK extends HTML

	__htmlType: 'block'

	init = (self)->
		self.__options =
			x: 0
			y: 0
			z: 1
			width: 0
			height: 0

		self.stage = null

	__style: (div)=>
		div.style.position = 'absolute'
		div.style.left = "#{@__options.x}px"
		div.style.top = "#{@__options.y}px"
		div.style.width = "#{@__options.width}px"
		div.style.height = "#{@__options.height}px"
		div.style.zIndex = @__options.z

	build: (options, callback)=>
		@element = document.createElement 'div'
		@options options

		@__style @element
		if typeof options.content is 'string'
			@element.innerHTML = @options.content
		else if typeof options.content is 'object'
			@element.appendChild @options.content

		callback() if typeof callback is 'function'

	destroy: ()=>
		@remove()
		super()

	options: (options)=>
		for i in ['x', 'y', 'z', 'width', 'height']
			@__options[i] = options[i] if options[i]
		@__style @element

	constructor: (stage)->
		init this

		@stage = stage if stage and stage.type() is 'stage'