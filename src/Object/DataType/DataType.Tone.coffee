class DataType.Tone extends DataType

	__dataType: 'tone'
	__options:
		r: 0
		g: 0
		b: 0
		alpha: 1
		gray: off
		opposite: off
		transparent: null	# Color

	noChange: on

	constructor: (options = new Object()) ->
		@red options.r
		@green options.g
		@blue options.b
		@alpha options.alpha
		@gray options.gray
		@opposite options.opposite
		@transparent options.transparent

	scope = (value, min, max) =>
		Math.max min, Math.min(value, max)

	red: (r) =>
		if typeof r is 'number'
			@__options.r = scope r, -255, 255
			@noChange = off
		@__options.r

	green: (g) =>
		if typeof g is 'number'
			@__options.g = scope g, -255, 255
			@noChange = off
		@__options.g

	blue: (b) =>
		if typeof b is 'number'
			@__options.b = scope b, -255, 255
			@noChange = off
		@__options.b

	alpha: (a) =>
		if typeof a is 'number'
			@__options.alpha = scope a, 0, 1
			@noChange = off
		@__options.alpha

	transparent: (t) =>
		if t and t.dataType and t.dataType() is 'color'
			@__options.transparent = t
			@noChange = off
		@__options.transparent

	rgb: (r, g, b) =>
		if typeof r is 'object'
			return @rgb r.r, r.g, r.b
		r: @red r
		g: @green g
		b: @blue b

	gray: (gray) =>
		if gray
			@__options.gray = !!gray
			@noChange = off
		@__options.gray

	opposite: (opposite) =>
		if opposite
			@_opposite = !!opposite
			@noChange = off
		@_opposite

	reset: =>
		@__options.r = @__options.g = @__options.b = 0
		@__options.gray = off
		@__options.opposite = off
		@__options.alpha = 1
		@__options.transparent = null
		@noChange = on

	mix: (r, g, b, a) =>
		if @__options.transparent and a > 0
			if r is @__options.transparent.red() and\
			g is @__options.transparent.green() and\
			b is @__options.transparent.blue()
				return [r, g, b, 0]

		if @__options.gray
			average = (r * 299 + g * 587 + b * 114 + 500) / 1000
			r = g = b = average

		r += @__options.r
		g += @__options.g
		b += @__options.b

		if @__options.opposite
			r = 255 - r
			g = 255 - g
			b = 255 - b

		a *= @__options.alpha
		[r, g, b, a]

	clone: =>
		options[i] = @__options[i] for i in ['r','g', 'b', 'alpha', 'gray', 'opposite', 'transparent']
		new DataType.Tone options
