class HTML.IMG extends HTML
	htmlType: 'img'
	attribute:
		x: 0
		y: 0
		z: 1
		width: 0
		height: 0

	style = (img, attribute)->
		img.style.position = 'absolute'
		img.style.left = "#{attribute.x}px"
		img.style.top = "#{attribute.y}px"
		img.style.zIndex = attribute.z
		img.width = attribute.width
		img.height = attribute.height

	build: (options, callback)=>
		@element = new Image()
		@element.onload = ()->
			callback() if typeof callback is 'function'

		for i in ['x', 'y', 'z', 'width', 'height']
			@attribute[i] = options[i]

		style @element, @attribute
		@element.src = options.src

	destroy: ()=>
		@remove()
		super()

	set: (options)=>
		for i in ['x', 'y', 'z', 'width', 'height']
			@attribute[i] = options[i] if options[i]
		style @element

	constructor: (stage)->
		@stage = stage if stage and stage.type is 'stage'