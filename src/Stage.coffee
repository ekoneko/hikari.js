class Stage extends Object
	list = []
	canvas: null
	context: null
	width: 0
	height: 0
	is: 'stage'

	append: (o)=>
		unless typeof o.draw is 'function'
			console.log 'error: object cannt append to canvas'
			return
		list.push o
		o.draw @context

	update: ()=>
		context.clearRect 0, 0, @width, @height
		item.update() for item in list

	constructor: (width, height, container)->
		@width = width
		@height = height
		@canvas = document.createElement 'canvas'
		@canvas.width = width
		@canvas.height = height
		@context = @canvas.getContext '2d'
		container.appendChild @canvas