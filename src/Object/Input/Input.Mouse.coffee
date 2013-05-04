class Input.Mouse extends Input

	click: null
	position: null

	constructor: (dom)->
		@click = null
		@position = null
		dom.addEventListener 'mousedown', (event)=>
			@click =
				button: event.button	# 0-left| 1-right
				x: event.offsetX
				y: event.offsetY

		dom.addEventListener 'mouseover', (event)=>
			@position =
				x: event.offsetX
				y: event.offsetY