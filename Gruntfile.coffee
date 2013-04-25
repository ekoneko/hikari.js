module.exports = (grunt)->
	grunt.initConfig
		coffee:
			compileJoined:
				options:
					join: on
				files:
					"hikari.js" : "src/*.coffee"
					"test/test.js" : "test/test.coffee"
		watch:
			scripts:
				files: ['src/*.coffee', 'test/test.coffee']
				tasks: ['coffee']

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'

	grunt.registerTask 'default', ['coffee', 'watch']
