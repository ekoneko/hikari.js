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
		@Keyboard	= Keyboard
		@Mouse		= Mouse
		@NetWork	= Network

	__init: =>
		global()
		@__delay = (callback)->
			setTimeout ()->
				callback()
			, @times

	__loadResources: =>
		# TODO

	update: ()=>
		@stage.update()
		@__delay @update
			

	constructor: (container, width, height, callback)->
		@__delay = null
		@fps = 30
		@times = 1000 / 30

		@__init()

		# Draw Stage
		@stage = new Stage width, height, container

		# load resources
		@__loadResources()

		@update()

		callback this if typeof callback is 'function'