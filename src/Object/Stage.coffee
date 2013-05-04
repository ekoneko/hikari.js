class Stage extends Object

	list = []
	__type: 'stage'

	box: null
	canvas: null
	context: null
	width: 0
	height: 0

	sort = (list)->
		list.sort (a,b)->
			a.z > b.z

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
		list = sort list
		i = 0
		while item = list[i] 
			if item and item.__isDisposed
				item.update()
				i++
			else
				list.splice i, 1

	constructor: (width, height, container)->
		list = []
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