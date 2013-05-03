class HTML.IMG extends HTML
	
	__htmlType: 'img'
	__attribute:
		x: 0
		y: 0
		z: 1
		width: 0
		height: 0

	__style: (img)=>
		img.style.position = 'absolute'
		img.style.left = "#{@__attribute.x}px"
		img.style.top = "#{@__attribute.y}px"
		img.style.zIndex = @__attribute.z
		img.width = @__attribute.width
		img.height = @__attribute.height

	build: (options, callback)=>
		@element = new Image()
		@element.onload = ()->
			callback() if typeof callback is 'function'

		for i in ['x', 'y', 'z', 'width', 'height']
			@__attribute[i] = options[i]

		@__style @element
		@element.src = options.src

	destroy: ()=>
		@remove()
		super()

	set: (options)=>
		for i in ['x', 'y', 'z', 'width', 'height']
			@__attribute[i] = options[i] if options[i]
		@__style @element

	constructor: (stage)->
		@stage = null
		@stage = stage if stage and stage.type() is 'stage'