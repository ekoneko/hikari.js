module.exports = (grunt)->
	grunt.initConfig
		coffee:
			default:
				options:
					join: on
					sourceMap: on
				files:
					"hikari.js" : ['src/*.coffee', 'src/Object/Object.coffee', 'src/**/*.coffee', '!src/**/*.*.coffee', 'src/**/*.*.coffee']
					"test/test.js" : "test/*.coffee"
		uglify:
			package:
				files:
					"hikari.min.js": ["hikari.js"]
		concat:
			package:
				src: ["node_modules/socket.io-client/socket.io-client.js", "hikari.min.js"]
				dest: "hikari.pkg.js"
		copy:
			default:
				files:[
					expand: on
					src: 'hikari.js'
					dest: 'test'
				]
		watch:
			default:
				files: ['src/*.coffee', 'src/**/*.coffee', 'test/test.coffee']
				tasks: ['coffee', 'copy']

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-uglify'

	grunt.registerTask 'default', ['coffee', 'copy', 'watch']
	grunt.registerTask 'nw', ['coffee', 'copy']
	grunt.registerTask 'package', ['coffee', 'uglify:package', 'concat:package']
