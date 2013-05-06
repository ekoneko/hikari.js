class HTML.BLOCK extends HTML

	__htmlType: 'block'
	__attribute:
		x: 0
		y: 0
		z: 1
		width: 0
		height: 0

	__style: (div)=>
		div.style.position = 'absolute'
		div.style.left = "#{@__attribute.x}px"
		div.style.top = "#{@__attribute.y}px"
		div.style.width = "#{@__attribute.width}px"
		div.style.height = "#{@__attribute.height}px"
		div.style.zIndex = @__attribute.z

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
			@__attribute[i] = options[i] if options[i]
		@__style @element

	constructor: (stage)->
		@__attribute = 
			x: 0
			y: 0
			z: 1
			width: 0
			height: 0
		@stage = null
		@stage = stage if stage and stage.type() is 'stage'