const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('App generator', () => {
  describe('generate a project', () => {

    before(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          appname: 'test-app',
          group: 'com.logicdee.sample',
          version: '0.0.1-SNAPSHOT',
          port: '9080',
          dbname: 'test',
          scaffold: true
        })
        .withGenerators([
          [helpers.createDummyGenerator(), 'spring-reactive-microservice:service']
        ])
    });

    it('generated common files', () => {
      assert.file(['build.gradle', 'settings.gradle', 'gradlew', 'gradlew.bat', 'Dockerfile', 'README.md', '.gitignore']);
      assert.file(['gradle/wrapper/gradle-wrapper.jar', 'gradle/wrapper/gradle-wrapper.properties']);
    });

    it('generated java source files', () => {
      assert.file([`src/main/java/com/logicdee/sample/testapp/Application.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/config/AuditingConfig.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/config/SwaggerConfig.java`]);
    });

    it('generated resource files', () => {
      assert.file([`src/main/resources/application.yml`]);
    });
  });
});