const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.props = {};
  }

  async prompting() {
    this.props = await this.prompt([
      {
        type: 'input',
        name: 'appname',
        message: 'What is the name of your application?',
        default: _.kebabCase(this.appname.toLowerCase()),
        validate: value => !!value
      },
      {
        type: 'input',
        name: 'group',
        message: 'What is your java package name?',
        default: 'com.company.project',
        filter: value => value.toLowerCase(),
        validate: value => !!value
      },
      {
        type: 'input',
        name: 'version',
        message: 'What is your application version?',
        default: '0.0.1-SNAPSHOT',
        validate: value => !!value
      },
      {
        type: 'input',
        name: 'port',
        message: 'Which port would you like server to run?',
        default: '9080',
        validate: value => !!value
      },
      {
        type: 'input',
        name: 'dbname',
        message: 'What is the name of your database?',
        default: props => _.snakeCase(props.appname),
        validate: value => !!value
      },
      {
        type: 'confirm',
        name: 'scaffold',
        message: 'Do you want to add an entity?',
        default: true
      },
      {
        type: 'input',
        name: 'entity',
        message: 'What is the java class name of entity?',
        default: 'Book',
        validate: value => !!value,
        when: props => props.scaffold
      },
    ]);
  }

  configuring() {
    this.config.set('package', this.props.group + '.' + _.camelCase(this.props.appname).toLowerCase());
  }

  writing() {
    this.props.package = this.props.group + '.' + _.camelCase(this.props.appname).toLowerCase();
    const packageDir = this.props.package.replace(/\./g, '/');
    const appname = this.props.appname;

    this.fs.copyTpl(
      this.templatePath('build.gradle'),
      this.destinationPath(`build.gradle`),
      {
        group: this.props.group,
        version: this.props.version,
        springBootVersion: '2.1.5.RELEASE'
      }
    );
    this.fs.copyTpl(
      this.templatePath('settings.gradle'),
      this.destinationPath(`settings.gradle`),
      {
        appname: appname
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/resources/application.yml'),
      this.destinationPath(`src/main/resources/application.yml`),
      {
        name: appname,
        port: this.props.port,
        dbname: this.props.dbname
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/Application.java'),
      this.destinationPath(`src/main/java/${packageDir}/Application.java`),
      {
        package: this.props.package
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/config/AuditingConfig.java'),
      this.destinationPath(`src/main/java/${packageDir}/config/AuditingConfig.java`),
      {
        package: this.props.package
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/config/SwaggerConfig.java'),
      this.destinationPath(`src/main/java/${packageDir}/config/SwaggerConfig.java`),
      {
        package: this.props.package
      }
    );
    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'),
      {
        appname: appname,
        version: this.props.version
      }
    );
    this.fs.copyTpl(
      this.templatePath('k8s/deployment.yaml'),
      this.destinationPath('k8s/deployment.yaml'),
      {
        servicename: appname,
        image: `${this.props.group}/${appname}`,
        dbname: this.props.dbname
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        appname: appname,
        port: this.props.port
      }
    );

    this.fs.copy(
      this.templatePath('gradlew'),
      this.destinationPath(`gradlew`)
    );
    this.fs.copy(
      this.templatePath('gradlew.bat'),
      this.destinationPath(`gradlew.bat`)
    );
    this.fs.copy(
      this.templatePath('gradle/wrapper/gradle-wrapper.jar'),
      this.destinationPath(`gradle/wrapper/gradle-wrapper.jar`)
    );
    this.fs.copy(
      this.templatePath('gradle/wrapper/gradle-wrapper.properties'),
      this.destinationPath(`gradle/wrapper/gradle-wrapper.properties`)
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    if (this.props.scaffold) {
      this.composeWith(require.resolve('../entity'), {arguments: [this.props.entity]});
    }
  }
};