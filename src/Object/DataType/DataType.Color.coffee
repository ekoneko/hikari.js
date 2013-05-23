class DataType.Color extends DataType

	__dataType: 'color'

	init = (self)->
		self.__options =
			r: 0
			g: 0
			b: 0

	hex2dec = (hex)=>
		r = parseInt hex.substr(1, 2), 16
		g = parseInt hex.substr(3, 4), 16
		b = parseInt hex.substr(5, 6), 16
		ret =
			r: r
			g: g
			b: b

	dec2hex = (r, g, b)=>
		ret = '#'
		ret += r.toString 16
		ret += g.toString 16
		ret += b.toString 16
		ret

	scope = (value, min, max)=>
		Math.max min, Math.min(value, max)

	getRGB: ()=>
		"(#{@__options.r}, #{@__options.g}, #{@__options.b})"

	red: (r)=>
		if typeof r is 'number'
			@__options.r = scope r, 0, 255
		@__options.r

	green: (g)=>
		if typeof g is 'number'
			@__options.g = scope g, 0, 255
		@__options.g

	blue: (b)=>
		if typeof b is 'number'
			@__options.b = scope b, 0, 255
		@__options.b

	hex: (hex)=>
		if hex and /#[0-9A-Fa-f]{6}/.test(hex)
			@set hex
			return hex
		dec2hex @__options.r, @__options.g, @__options.b

	set: (color, value)=>
		if typeof color is 'object'
			@red(color.r or color.R)
			@green(color.g or color.G)
			@blue(color.b or color.B)
		else
			color = color.toLocaleLowerCase()
			if ['r', 'g', 'b'].indexOf(color) isnt -1
				this[color] value
			else if color is '#' and /#[0-9A-Fa-f]{6}/.test(color)
				rgb = hex2dec color
				this[i] rgb[i] for i in ['r', 'g', 'b']
		this

	clone: ()=>
		new DataType.Color @__options

	constructor: (r, g, b) ->
		init this

		if r[0] is '#'
			@set r
		else
			@set
				r: r
				g: g
				b: b