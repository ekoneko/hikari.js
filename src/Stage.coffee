class Stage
	canvas: null
	context: null

	append: (o)=>
		if ['bitmap', 'sprite', 'window'].indexOf(o.isA) is -1
			console.log 'error: object cannt append to canvas'
			return
		@context.drawImage o.entity, o.x, o.y, o.width, o.height
	constructor: (width, height, container)->
		@canvas = document.createElement 'canvas'
		@canvas.width = width
		@canvas.height = height
		@context = @canvas.getContext '2d'
		container.appendChild @canvas