module.exports = (grunt)->
	grunt.initConfig
		coffee:
			compileJoined:
				options:
					join: on
				files:
					"hikari.js" : ['src/*.coffee', 'src/*/*.coffee']
					"test/test.js" : "test/*.coffee"
		watch:
			scripts:
				files: ['src/*', 'src/*/*', 'test/test.coffee']
				tasks: ['coffee']

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-concat'

	grunt.registerTask 'default', ['coffee', 'watch', 'concat']
