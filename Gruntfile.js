'use strict()';

module.exports = function(grunt) {
	var jsCore= [
		'./src/static/lib/js/jquery-3.2.1.min.js',
		'./src/static/materialize-src/js/velocity.min.js',
		'./src/static/materialize-src/js/global.js',
		 './src/static/materialize-src/js/tabs.js',
		 ];
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
		    my_target: {
		      options: {
		        sourceMap: true
		      },
		      files: {
				'./public/js/scripts.min.js':[jsCore,
												'./src/static/custom/js/app.js'
										    ]
										                
		      }
		    }
		},
		sass: {
			options: {
	            sourceMap: true,
	            outputStyle:'compressed'
	        },
			dist: {
				files: {
					'./public/style/style-new.css': './src/static/sass/materialize-src/sass/materialize.scss',
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			scripts: {
				files: './src/static/custom/**/*.js',
				tasks: ['uglify']
			}
		}
	});
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
}

