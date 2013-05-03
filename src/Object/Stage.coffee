class Stage extends Object

	list = []
	__type: 'stage'

	box: null
	canvas: null
	context: null
	width: 0
	height: 0

	append: (o)=>
		unless o.type() is 'draw'
			console.log 'error: object cannt append to canvas', o
			return
		list.push o if ['bitmap', 'sprite'].indexOf o.drawType() > -1
		o.draw this

	update: ()=>
		@context.restore()
		@context.save()
		@context.clearRect 0, 0, @width, @height
		item.update() for item in list

	constructor: (width, height, container, callback)->
		@width = width
		@height = height
		@canvas = document.createElement 'canvas'
		@canvas.width = width
		@canvas.height = height
		@context = @canvas.getContext '2d'
		@context.save()

		@box = document.createElement 'div'
		@box.style.width = width
		@box.style.height = height
		@box.style.position = 'relative'
		@box.style.overflow = 'hidden'
		@canvas.style.position = 'absolute'
		@canvas.style.zIndex = 100
		container.appendChild @box
		@box.appendChild @canvas
		
		this