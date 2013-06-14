class @Hikari

	__type: 'hikari'
	__delay: null
	
	times: 0
	fps: 0

	# global variable initialization
	global = =>
		@Audio		= Audio
		@Draw		= Draw
		@HTML		= HTML
		@DataType	= DataType
		@Vector		= Vector
		@Event		= Event
		@Const		= Const
		@NetWork	= Network
		@Animate	= Animate

	__init: =>
		global()
		window.requestAnimationFrame ?= window.requestAnimationFrame or
		window.mozRequestAnimationFrame or
		window.webkitRequestAnimationFrame or
		window.msRequestAnimationFrame
		@__delay = (callback)->
			setTimeout ()->
				window.requestAnimationFrame callback
			, @times

	__loadResources: =>
		# TODO

	__update: ()=>
		Animate.update()
		@stage.update()
		@input.update()
		@update() if typeof @update is 'function'
		@__delay @__update

	constructor: (container, width, height, callback)->
		@__delay = @update = null
		@fps = 30
		@times = 1000 / 30

		@__init()

		# Draw Stage
		@stage = new Stage width, height, container

		@eventMap = new EventMap width, height
		@input = new Input @stage, @eventMap

		# load resources
		@__loadResources()

		@__update()

		callback this if typeof callback is 'function'