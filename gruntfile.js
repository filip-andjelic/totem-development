module.exports = function ( grunt ) {
	
	// project config
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			options: {
				livereload: true,
				spawn: false
			},
			style: {
				files: ["src/**/*.scss"],
				tasks: ["sass:dist", "cssmin"]
			},
			styleDev: {
				files: ["src/**/*.scss"],
				tasks: ["sass:distDev"]
			},
			script: {
				files: ["app/modules/**/*.js"],
				tasks: ["concat:script", "uglify:script"]
			},
			scriptDev: {
				files: ["app/modules/**/*.js"],
				tasks: ["concat:scriptDev"]
			}
		},
		sass: {
			dist: {
				options: {
					style: "compact"
				},
				update: true,
				files: {
					'src/stylesheet/css/main.css' : 'src/stylesheet/sass/main.scss'
				}	
			},
			distDev: {
				options: {
					style: "expanded"
				},
				update: true,
				files: {
					'src/stylesheet/css/main.min.css' : 'src/stylesheet/sass/main.scss'
				}
			}
		},
		concat: {
	    options: {
	      separator: '',
	    },
	    script: {
	      src: ["app/modules/*.module.js",
	      			"app/modules/**/*.js"],
	      dest: "app/dist/app.js"
	    },
	    scriptDev: {
	    	options: {
		      separator: '\n',
		    },
	    	src: ["app/modules/*.module.js",
	      			"app/modules/**/*.js"],
	      dest: "app/dist/app.min.js"
	    }
	  },
	  cssmin: {
	  	target: {
	  		files: { "src/stylesheet/css/main.min.css" : ['src/stylesheet/css/main.css'] }
	  	}
	  },
	  uglify: {
	    script: {
	      files: {
	        'app/dist/app.min.js': ['app/dist/app.js']
	      }
	    }
	  }
	});

  // project tree structure config
	grunt.config.set('tree-prepare', {
    tree: {
    	'full': ['second'],
      'tree': {
      	branch: 'first',
      	clean: true
      }
    }
  });

	// load existing tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// load new tasks with dependencies
	grunt.registerTask( 'default', []);
	grunt.registerTask( 'dev', [ 'sass:distDev', 'concat:scriptDev', 'watch:styleDev', 'watch:scriptDev' ]);
	grunt.registerTask( 'prod', [ 'sass:dist', 'cssmin', 'concat:script', 'uglify:script', 'watch:style', 'watch:script' ]);

};