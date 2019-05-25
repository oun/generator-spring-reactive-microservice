const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
    initializing() {
        this.props = {
            package: this.config.get('package')
        };
    }

    async prompting() {
        const answer = await this.prompt([
            {
                type: 'input',
                name: 'entity',
                message: 'Entity class'
            },
            {
                type: 'input',
                name: 'dto',
                message: 'Dto class',
                default: props => `${props.entity}Dto`
            },
            {
                type: 'input',
                name: 'path',
                message: 'Api path',
                default: props => `/${_.kebabCase(props.entity)}s`
            },
            {
                type: 'input',
                name: 'collection',
                message: 'DB collection',
                default: props => `${_.snakeCase(props.entity)}s`
            }
        ]);
        this.props = Object.assign(this.props, answer);
    }

    writing() {
        const packageDir = this.props.package.replace('.', '/');
        const repository = `${this.props.entity}Repository`;
        const mapper = `${this.props.entity}Mapper`;
        const service = `${this.props.entity}Service`;
        const controller = `${this.props.entity}Controller`;

        this.fs.copyTpl(
            this.templatePath('src/main/java/package/controller/_Controller.java'),
            this.destinationPath(`src/main/java/${packageDir}/controller/${controller}.java`),
            {
                package: this.props.package,
                controller: controller,
                service: service,
                path: this.props.path,
                entity: this.props.entity,
                dto: this.props.dto
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/controller/ErrorHandler.java'),
            this.destinationPath(`src/main/java/${packageDir}/controller/ErrorHandler.java`),
            {
                package: this.props.package
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/service/_Service.java'),
            this.destinationPath(`src/main/java/${packageDir}/service/${service}.java`),
            {
                package: this.props.package,
                service: service,
                repository: repository,
                mapper: mapper,
                entity: this.props.entity,
                dto: this.props.dto
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/repository/_Repository.java'),
            this.destinationPath(`src/main/java/${packageDir}/repository/${repository}.java`),
            {
                package: this.props.package,
                repository: repository,
                entity: this.props.entity
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/mapper/_Mapper.java'),
            this.destinationPath(`src/main/java/${packageDir}/mapper/${mapper}.java`),
            {
                package: this.props.package,
                mapper: mapper,
                entity: this.props.entity,
                dto: this.props.dto
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/model/dto/_Dto.java'),
            this.destinationPath(`src/main/java/${packageDir}/model/dto/${this.props.dto}.java`),
            {
                package: this.props.package,
                dto: this.props.dto
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/model/dto/ErrorDto.java'),
            this.destinationPath(`src/main/java/${packageDir}/model/dto/ErrorDto.java`),
            {
                package: this.props.package
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/model/entity/_Entity.java'),
            this.destinationPath(`src/main/java/${packageDir}/model/entity/${this.props.entity}.java`),
            {
                package: this.props.package,
                entity: this.props.entity,
                collection: this.props.collection
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/model/entity/AggregateRoot.java'),
            this.destinationPath(`src/main/java/${packageDir}/model/entity/AggregateRoot.java`),
            {
                package: this.props.package
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/model/event/DomainEvent.java'),
            this.destinationPath(`src/main/java/${packageDir}/model/event/DomainEvent.java`),
            {
                package: this.props.package
            }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/java/package/exception/EntityNotFoundException.java'),
            this.destinationPath(`src/main/java/${packageDir}/exception/EntityNotFoundException.java`),
            {
                package: this.props.package
            }
        );
    }
};