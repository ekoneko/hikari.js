module.exports = (grunt)->
	grunt.initConfig
		coffee:
			compileJoined:
				options:
					join: on
				files:
					"hikari.js" : ['src/*.coffee', 'src/Object/Object.coffee', 'src/**/*.coffee', '!src/**/*.*.coffee', 'src/**/*.*.coffee']
					"test/test.js" : "test/*.coffee"
		copy:
			main:
				files:[
					expand: on
					src: 'hikari.js'
					dest: 'test'
				]
		watch:
			scripts:
				files: ['src/*.coffee', 'src/**/*.coffee', 'test/test.coffee']
				tasks: ['coffee', 'copy']

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-copy'

	grunt.registerTask 'default', ['coffee', 'copy', 'watch']
