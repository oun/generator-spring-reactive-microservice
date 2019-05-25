const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    initializing() {
        this.props = {};
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Project name',
                default: this.appname
            },
            {
                type: 'input',
                name: 'group',
                message: 'Group'
            },
            {
                type: 'input',
                name: 'version',
                message: 'Version',
                default: '0.0.1-SNAPSHOT'
            },
            {
                type: 'input',
                name: 'port',
                message: 'Server port',
                default: '9080'
            },
            {
                type: 'input',
                name: 'dbname',
                message: 'Database name',
                default: this.appname
            }
        ]);
    }

    configuring() {
        this.config.set('package', this.props.group + '.' + this.props.name.toLowerCase());
    }

    writing() {
        this.props.package = this.props.group + '.' + this.props.name.toLowerCase();
        const packageDir = this.props.package.replace('.', '/');

        this.fs.copyTpl(
            this.templatePath('build.gradle'),
            this.destinationPath('build.gradle'),
            {
                group: this.props.group,
                version: this.props.version,
                springBootVersion: '2.1.5.RELEASE'
            }
        );
        this.fs.copyTpl(
            this.templatePath('settings.gradle'),
            this.destinationPath('settings.gradle'),
            {
                name: this.props.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/resources/application.yml'),
            this.destinationPath('src/main/resources/application.yml'),
            {
                name: this.props.name,
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

        this.fs.copy(
            this.templatePath('gradlew'),
            this.destinationPath('gradlew')
        );
        this.fs.copy(
            this.templatePath('gradlew.bat'),
            this.destinationPath('gradlew.bat')
        );
        this.fs.copy(
            this.templatePath('gradle/wrapper/gradle-wrapper.jar'),
            this.destinationPath('gradle/wrapper/gradle-wrapper.jar')
        );
        this.fs.copy(
            this.templatePath('gradle/wrapper/gradle-wrapper.properties'),
            this.destinationPath('gradle/wrapper/gradle-wrapper.properties')
        );
    }
};