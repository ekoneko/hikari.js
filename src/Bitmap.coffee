class Bitmap
	isA: 'bitmap'
	entity: null
	x: 0
	y: 0
	width: 0
	height: 0
	scaleX: 1
	scaleY: 1
	alpha: 1
	visible: off
	rotate: 0

	load: (src, callback)=>
		@entity = new Image @width, @height
		@entity.onload = ()->
			callback()
		@entity.src = src

	constructor: (width, height)->
		@width = width
		@height = height