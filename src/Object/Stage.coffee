class Stage extends Object

	list = []
	__type: 'stage'

	box: null
	canvas: null
	context: null
	width: 0
	height: 0
	needUpdate: off

	sort = (list)->
		list.sort (a,b)->
			a.z() > b.z()

	colorMix = (color1, alpha1, color2, alpha2)->
		(color1 * alpha1 * (255 - alpha2) + color2 * alpha2) / 255

	imageMix = (map, item, width, height)->
		image = item.update()
		return map unless image
		line = image.y
		row = image.x
		while line <= image.height + image.y
			row = image.x
			while row <= image.width + image.x
				# stage position
				sp = (row + line * width) * 4
				# image position
				ip = (row - image.x + (line - image.y) * image.width) * 4
				if image.map[ip + 3] > 0
					map[sp + 0] = colorMix map[sp + 0], map[sp + 3], image.map[ip + 0], image.map[ip + 3]
					map[sp + 1] = colorMix map[sp + 1], map[sp + 3], image.map[ip + 1], image.map[ip + 3]
					map[sp + 2] = colorMix map[sp + 2], map[sp + 3], image.map[ip + 2], image.map[ip + 3]
					map[sp + 3] = map[sp + 3] + image.map[ip + 3] - map[sp + 3] * image.map[ip + 3] / 255
				row += 1
			line++
		image = null
		map


	append: (o)=>
		unless o.type() is 'draw'
			console.log 'error: object cannt append to canvas', o
			return

		list.push o if ['bitmap', 'sprite', 'vector'].indexOf o.drawType() > -1
		o.draw this
		@needUpdate = on
		this

	update: ()=>
		return unless @needUpdate
		@needUpdate = off
		@context.restore()
		@context.save()
		@context.clearRect 0, 0, @width, @height
		list = sort list
		i = 0
		imageData = @context.getImageData 0, 0, @width, @height
		map = imageData.data
		while item = list[i] 
			if item and item.__isDisposed
				map = imageMix map, item, @width, @height
				i++				
			else
				list.splice i, 1
		imageData.data = map
		@context.putImageData imageData, 0, 0
		imageData = null

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