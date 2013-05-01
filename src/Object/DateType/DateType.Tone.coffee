class DateType.Tone extends DateType

	dataType: 'tone'
	
	options:
		r: 0
		g: 0
		b: 0
		alpha: 1
		gray: off
		opposite: off
		transparent: null	# Color

	noChange: on

	scope = (value, min, max)=>
		Math.max min, Math.min(value, max)

	red: (r)=>
		if typeof r is 'number'
			@options.r = scope r, -255, 255
			@noChange = off
		@options.r

	green: (g)=>
		if typeof g is 'number'
			@options.g = scope g, -255, 255
			@noChange = off
		@options.g

	blue: (b)=>
		if typeof b is 'number'
			@options.b = scope b, -255, 255
			@noChange = off
		@options.b

	alpha: (a)=>
		if typeof a is 'number'
			@options.alpha = scope a, 0, 1
			@noChange = off
		@options.alpha

	transparent: (t)=>
		if t and t.dataType and t.dataType is 'color'
			@options.transparent = t
			@noChange = off
		@options.transparent

	rgb: (r, g, b)=>
		if typeof r is 'object'
			return @rgb r.r, r.g, r.b
		r: @red r
		g: @green g
		b: @blue b

	gray: (gray)=>
		if gray
			@options.gray = !!gray
			@noChange = off
		@options.gray

	opposite: (opposite)=>
		if opposite
			@_opposite = !!opposite
			@noChange = off
		@_opposite

	reset: ()=>
		@options.r = @options.g = @options.b = 0
		@options.gray = off
		@options.opposite = off
		@options.alpha = 1
		@options.transparent = null
		@noChange = on

	mix: (r, g, b, a)=>
		if @options.transparent and a > 0
			if r is @options.transparent.red() and
			g is @options.transparent.green() and
			b is @options.transparent.blue()
				return [r, g, b, 0]

		if @options.gray
			average = (r * 299 + g * 587 + b * 114 + 500) / 1000
			r = g = b = average

		r += @options.r
		g += @options.g
		b += @options.b

		if @options.opposite
			r = 255 - r
			g = 255 - g
			b = 255 - b

		a *= @options.alpha
		[r, g, b, a]

	clone: ()=>
		new DateType.Tone @options

	constructor: (options)->
		@options = {}
		@reset()
		options = options or {}
		@red options.r
		@green options.g
		@blue options.b
		@alpha options.alpha
		@gray options.gray
		@opposite options.opposite
		@transparent options.transparent