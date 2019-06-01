const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Service generator', () => {
  describe('generate scaffold service', () => {

    before(() => {
      return helpers.run(path.join(__dirname, '../generators/service'))
        .withPrompts({
          entity: 'User',
          path: '/users',
          collection: 'users'
        })
        .withLocalConfig({
          package: 'com.logicdee.sample.testapp'
        })
    });

    it('generated java source files', () => {
      assert.file([`src/main/java/com/logicdee/sample/testapp/controller/UserController.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/controller/ErrorHandler.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/exception/EntityNotFoundException.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/exception/EntityNotFoundException.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/mapper/UserMapper.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/model/dto/UserDto.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/model/dto/ErrorDto.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/model/entity/User.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/model/entity/AggregateRoot.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/model/event/DomainEvent.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/repository/UserRepository.java`]);
      assert.file([`src/main/java/com/logicdee/sample/testapp/service/UserService.java`]);
    });

    it('generated java test files', () => {
      assert.file([`src/test/java/com/logicdee/sample/testapp/controller/UserControllerIT.java`]);
    });
  });
});