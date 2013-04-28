class HTML.BLOCK extends HTML
	htmlType: 'block'
	attribute =
		x: 0
		y: 0
		z: 1
		width: 0
		height: 0

	style = (div)->
		div.style.position = 'absolute'
		div.style.left = "#{attribute.x}px"
		div.style.top = "#{attribute.y}px"
		div.style.width = "#{attribute.width}px"
		div.style.height = "#{attribute.height}px"
		div.style.zIndex = attribute.z

	build: (options, callback)=>
		@element = document.createElement 'div'
		for i in ['x', 'y', 'z', 'width', 'height']
			attribute[i] = options[i]

		style @element
		if typeof options.content is 'string'
			@element.innerHTML = @options.content
		else
			@element.appendChild @options.content

		callback() if typeof callback is 'function'

	destroy: ()=>
		@remove()
		super()

	set: (options)=>
		for i in ['x', 'y', 'z', 'width', 'height']
			attribute[i] = options[i] if options[i]
		style @element

	constructor: (stage)->
		@stage = stage if stage and stage.type is 'stage'