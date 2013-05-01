class DateType.Color extends DateType

	dataType: 'color'

	options:
		r: 0
		g: 0
		b: 0
		alpha: 1	# 0% ~ 100%

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
		"(#{@options.r}, #{@options.g}, #{@options.b})"

	getRGBA: ()=>
		"(#{@options.r}, #{@options.g}, #{options.b}, #{options.alpha})"

	red: (r)=>
		if typeof r is 'number'
			@options.r = scope r, 0, 255
		@options.r

	green: (g)=>
		if typeof g is 'number'
			@options.g = scope g, 0, 255
		@options.g

	blue: (b)=>
		if typeof b is 'number'
			@options.b = scope b, 0, 255
		@options.b

	hex: (hex)=>
		if hex and /#[0-9A-Fa-f]{6}/.test(hex)
			@set hex
			return hex
		dec2hex @options.r, @options.g, @options.b

	alpha: (a)=>
		if typeof a is 'number'
			@options.alpha = scope a, 0, 1
		@options.alpha

	set: (color, value)=>
		if typeof color is 'object'
			@red(color.r or color.R)
			@green(color.g or color.G)
			@blue(color.b or color.B)
			@alpha color.alpha
		else
			color = color.toLocaleLowerCase()
			if ['r', 'g', 'b', 'alpha'].indexOf(color) isnt -1
				this[color] value
			else if color is '#' and /#[0-9A-Fa-f]{6}/.test(color)
				rgb = hex2dec color
				this[i] rgb[i] for i in ['r', 'g', 'b']
		this

	clone: ()=>
		new DateType.Color @options

	constructor: (r, g, b, a) ->
		@options =
			r: 0
			g: 0
			b: 0
			alpha: 1

		if r[0] is '#'
			@set r
		else
			@set
				r: r
				g: g
				b: b
			@alpha = a if typeof a is 'number'