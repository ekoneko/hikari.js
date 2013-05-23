class Input.Keyboard extends Input

	init = (self)->
		self.press = null

	constructor:(dom)->
		init this

		textarea = document.createElement 'textarea'
		textarea.style.position = 'fixed'
		textarea.style.left = '-500px'
		dom.appendChild textarea
		dom.addEventListener 'click', ()->
			textarea.focus()

		document.body.addEventListener 'keydown', (event)=>
			identity = parseInt event.keyCode, 10
			identity += 256 if event.altKey		# 1 >> 8
			identity += 512 if event.ctrlKey	# 1 >> 9
			identity += 1024 if event.shiftKey	# 1 >> 10
			@press =
				altKey: event.altKey
				ctrlKey: event.ctrlKey
				shiftKey: event.shiftKey
				keyCode: event.keyCode
				identity: identity