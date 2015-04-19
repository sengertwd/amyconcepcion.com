module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    assemble: {
      options: {
        layout: 'page.hbs',
        layoutdir: './src/bonnet/layouts/',
        partials: './src/bonnet/partials/**/*.hbs'
      },
      posts: {
        files: [{
          cwd: './src/content/',
          dest: './dest/',
          expand: true,
          src: ['**/*.hbs', '!_pages/**/*.hbs']
        }, {
          cwd: './src/content/_pages/',
          dest: './dest/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },
    connect: {
      dev: {
        options: {
          port: 8000,
          base: './dest/',
          keepalive: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dest/js/main.min.js': ['src/js/main.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'src/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 versions']
        },
        src: 'src/css/main.css',
        dest: 'src/css/main.pref.css'
      }
    },
    cssmin: {
      dist: {
        files: {
          'dest/css/main.min.css': ['src/css/main.pref.css']
        }
      }
    },
    svgstore: {
      options: {
        prefix: 'icon-',
        svg: {
          viewBox: '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg',
          style: 'display:none;'
        }
      },
      default: {
        files: {
          'src/bonnet/partials/site-svg.hbs': ['src/svg/**/*.svg']
        }
      }
    },
    concurrent: {
      target: {
        tasks: ['connect','watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      styles: {
        tasks: ['sass','autoprefixer', 'cssmin'],
        files: ['src/scss/**/*.scss'],
        options: {
          atBegin: true,
          spawn: false
        }
      },
      js: {
        tasks: ['uglify'],
        files: ['src/js/main.js'],
        options: {
          atBegin: true,
          spawn: false
        }
      },
      svg: {
        tasks: ['svgstore'],
        files: ['src/svg/**/*.svg'],
        options: {
          atBegin: true,
          spawn: false
        }
      },
      assemble: {
        tasks: ['assemble'],
        files: ['src/**/*.hbs'],
        options: {
          atBegin: true,
          spawn: false
        }
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('assemble');

  /* grunt tasks */
  grunt.registerTask('default', ['concurrent']);

};