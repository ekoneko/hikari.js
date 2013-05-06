class Draw extends Object

	__type: 'draw'

	__x: 0
	__y: 0
	__z: 0
	__width: 0
	__height: 0
	__stage: null
	__options: {}

	drawType: ()=>
		@__drawType

	x: (x)=>
		if typeof x is 'number'
			@__x = x
			@__stage.needUpdate = on if @__stage
		@__x

	y: (y)=>
		if typeof y is 'number'
			@__y = y
			@__stage.needUpdate = on if @__stage
		@__y

	z: (z)=>
		if typeof z is 'number'
			@__z = Math.min 200, Math.max(0, z)
			@__stage.needUpdate = on if @__stage
		@__z

	width: (width)=>
		if typeof width is 'number'
			@__width = width
			@__stage.needUpdate = on if @__stage
		@__width

	height: (height)=>
		if typeof height is 'number'
			@__height = height
			@__stage.needUpdate = on if @__stage
		@__height

	draw: (stage)=>

	update: ()=>

	options: (o)=>
		if typeof o is 'object'
			for key of o
				unless typeof @__options[key] is 'undefined'
					@__options[key] = o[key]
			@__stage.needUpdate = on if @__stage
		@__options

	clone: (dest, src)=>
		for key in ['options', 'x', 'y', 'z', 'width', 'height']
			dest["__#{key}"] = src["__#{key}"]
		dest

	destroy: ()=>
		@isDisposed = off
		@__stage.needUpdate = on if @__stage
		super()