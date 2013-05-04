class Input extends Object

	update: ()=>
		if @mouse.click
			@eventMap.trigger 'click', @mouse.click
			@mouse.click = null

		if @mouse.position
			@eventMap.trigger 'hover', @mouse.position

		if @keyboard.press
			@eventMap.trigger 'keyPress', @keyboard.press
			@keyboard.press = null

	constructor: (stage, eventMap)->
		@eventMap = eventMap

		@keyboard = new Input.Keyboard stage.box
		@mouse = new Input.Mouse stage.box