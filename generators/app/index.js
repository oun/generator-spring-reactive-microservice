const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', { type: String, required: true, desc: 'Application name' });
    }

    initializing() {
        this.props = {};
    }

    async prompting() {
        this.props = await this.prompt([
            {
                type: 'input',
                name: 'group',
                message: 'Group',
                default: 'com.company.project'
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
                default: this.options.appname
            }
        ]);
    }

    configuring() {
        this.config.set('package', this.props.group + '.' + this.options.appname.toLowerCase());
        this.config.set('application', this.options.appname);
    }

    writing() {
        this.props.package = this.props.group + '.' + this.options.appname.toLowerCase();
        const packageDir = this.props.package.replace('.', '/');
        const application = this.options.appname;

        this.fs.copyTpl(
            this.templatePath('build.gradle'),
            this.destinationPath(`${application}/build.gradle`),
            {
                group: this.props.group,
                version: this.props.version,
                springBootVersion: '2.1.5.RELEASE'
            }
        );
        this.fs.copyTpl(
            this.templatePath('settings.gradle'),
            this.destinationPath(`${application}/settings.gradle`),
            {
                name: application
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/resources/application.yml'),
            this.destinationPath(`${application}/src/main/resources/application.yml`),
            {
                name: application,
                port: this.props.port,
                dbname: this.props.dbname
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/Application.java'),
            this.destinationPath(`${application}/src/main/java/${packageDir}/Application.java`),
            {
                package: this.props.package
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/config/AuditingConfig.java'),
            this.destinationPath(`${application}/src/main/java/${packageDir}/config/AuditingConfig.java`),
            {
                package: this.props.package
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/config/SwaggerConfig.java'),
            this.destinationPath(`${application}/src/main/java/${packageDir}/config/SwaggerConfig.java`),
            {
                package: this.props.package
            }
        );

        this.fs.copy(
            this.templatePath('gradlew'),
            this.destinationPath(`${application}/gradlew`)
        );
        this.fs.copy(
            this.templatePath('gradlew.bat'),
            this.destinationPath(`${application}/gradlew.bat`)
        );
        this.fs.copy(
            this.templatePath('gradle/wrapper/gradle-wrapper.jar'),
            this.destinationPath(`${application}/gradle/wrapper/gradle-wrapper.jar`)
        );
        this.fs.copy(
            this.templatePath('gradle/wrapper/gradle-wrapper.properties'),
            this.destinationPath(`${application}/gradle/wrapper/gradle-wrapper.properties`)
        );
    }
};