const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    async prompting() {
        this.props = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Project name'
            },
            {
                type: 'input',
                name: 'group',
                message: 'Group'
            },
            {
                type: 'input',
                name: 'version',
                message: 'version',
                default: '0.0.1-SNAPSHOT'
            }
        ]);
    }

    writing() {
        this.log('Props: ', this.props);
        this.fs.copyTpl(this.templatePath('build.gradle'), this.destinationPath('build.gradle'), this.props);
        this.fs.copyTpl(this.templatePath('gradlew'), this.destinationPath('gradlew'), this.props);
        this.fs.copyTpl(this.templatePath('gradlew.bat'), this.destinationPath('gradlew.bat'), this.props);
        this.fs.copyTpl(this.templatePath('settings.gradle'), this.destinationPath('settings.gradle'), this.props);
    }
};