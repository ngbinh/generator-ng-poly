/*global describe, before, it */
'use strict';
var assert = require('yeoman-generator').assert
  , helpers = require('yeoman-generator').test
  , join = require('path').join
  , os = require('os');

describe('Factory generator', function () {
  before(function (done) {
    helpers.run(join(__dirname, '../app'))
      .inDir(join(os.tmpDir(), 'temp-factory'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        appName: 'temp-factory',
        markup: 'html',
        appScript: 'js',
        controllerAs: false,
        passFunc: true,
        namedFunc: true,
        testScript: 'js',
        testDir: 'app',
        style: 'less',
        bower: []
      })
      .withGenerators([
        join(__dirname, '../module'),
        join(__dirname, '../route'),
        join(__dirname, '../controller'),
        join(__dirname, '../view')
      ])
      .on('end', done);
  });

  describe('with JS app and JS test', function () {
    before(function (done) {
      helpers.run(join(__dirname, '../factory'))
        .withArguments(['test'])
        .withOptions({
          module: 'home'
        })
        .on('end', done);
    });

    it('should create factory files', function () {
      assert.file([
        'app/home/test-factory.js',
        'app/home/test-factory_test.js'
      ]);
    });

  });

  describe('with Coffee app and Coffee test', function () {
    before(function (done) {
      helpers.run(join(__dirname, '../factory'))
        .withArguments(['test1'])
        .withOptions({
          module: 'home',
          markup: 'jade',
          'app-script': 'coffee',
          'test-script': 'coffee'
        })
        .on('end', done);
    });

    it('should create factory files', function () {
      assert.file([
        'app/home/test1-factory.coffee',
        'app/home/test1-factory_test.coffee'
      ]);
    });

  });

});
