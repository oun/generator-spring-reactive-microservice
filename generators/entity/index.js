const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('entity', {type: String, required: true})
  }

  initializing() {
    this.props = {
      package: this.config.get('package')
    };
  }

  async prompting() {
    const fields = [];
    while (true) {
      const answer = await this.prompt([
        {
          type: 'confirm',
          name: 'addField',
          message: 'Do you want to add a field to your entity?',
          default: true
        },
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your field?',
          when: props => props.addField
        },
        {
          type: 'list',
          name: 'type',
          message: 'What is the type of your field?',
          choices: [
            {
              name: 'String',
              value: 'String'
            },
            {
              name: 'Boolean',
              value: 'Boolean'
            },
            {
              name: 'Integer',
              value: 'Integer'
            },
            {
              name: 'Long',
              value: 'Long'
            },
            {
              name: 'Double',
              value: 'Double'
            },
            {
              name: 'Float',
              value: 'Float'
            },
            {
              name: 'BigDecimal',
              value: 'BigDecimal'
            },
            {
              name: 'LocalDateTime',
              value: 'LocalDateTime'
            },
            {
              name: 'ZonedDateTime',
              value: 'ZonedDateTime'
            },
            {
              name: 'LocalDate',
              value: 'LocalDate'
            }
          ],
          when: props => props.addField
        }
      ]);
      if (!answer.addField) {
        break;
      }
      fields.push({
        name: answer.name,
        type: answer.type
      });
      this.log(`${this.options.entity} fields:`);
      for (const field of fields) {
        this.log(`${field.name} (${field.type})`);
      }
    }
    this.props = Object.assign(this.props, {fields: fields});
  }

  writing() {
    const packageDir = this.props.package.replace(/\./g, '/');
    const packageName = this.props.package;
    const entity = this.options.entity;
    const repository = `${entity}Repository`;
    const mapper = `${entity}Mapper`;
    const service = `${entity}Service`;
    const controller = `${entity}Controller`;
    const dto = `${entity}Dto`;
    const path = `/${_.kebabCase(entity)}s`;
    const collection = `${_.snakeCase(entity)}s`;

    const fieldTypes = _.map(this.props.fields, 'type');
    const hasBigDecimalField = fieldTypes.includes('BigDecimal');
    const hasLocalDateTimeField = fieldTypes.includes('LocalDateTime');
    const hasZonedDateTimeField = fieldTypes.includes('ZonedDateTime');
    const hasLocalDateField = fieldTypes.includes('LocalDate');

    this.fs.copyTpl(
      this.templatePath('src/main/java/package/controller/_Controller.java'),
      this.destinationPath(`src/main/java/${packageDir}/controller/${controller}.java`),
      {
        package: packageName,
        controller: controller,
        service: service,
        path: path,
        entity: entity,
        dto: dto
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/controller/ErrorHandler.java'),
      this.destinationPath(`src/main/java/${packageDir}/controller/ErrorHandler.java`),
      {
        package: packageName
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/service/_Service.java'),
      this.destinationPath(`src/main/java/${packageDir}/service/${service}.java`),
      {
        package: packageName,
        service: service,
        repository: repository,
        mapper: mapper,
        entity: entity,
        dto: dto
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/repository/_Repository.java'),
      this.destinationPath(`src/main/java/${packageDir}/repository/${repository}.java`),
      {
        package: packageName,
        repository: repository,
        entity: entity
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/mapper/_Mapper.java'),
      this.destinationPath(`src/main/java/${packageDir}/mapper/${mapper}.java`),
      {
        package: packageName,
        mapper: mapper,
        entity: entity,
        dto: dto
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/model/dto/_Dto.java'),
      this.destinationPath(`src/main/java/${packageDir}/model/dto/${dto}.java`),
      {
        package: packageName,
        dto: dto,
        fields: this.props.fields,
        hasBigDecimalField: hasBigDecimalField,
        hasLocalDateTimeField: hasLocalDateTimeField,
        hasZonedDateTimeField: hasZonedDateTimeField,
        hasLocalDateField: hasLocalDateField
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/model/dto/ErrorDto.java'),
      this.destinationPath(`src/main/java/${packageDir}/model/dto/ErrorDto.java`),
      {
        package: packageName
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/model/entity/_Entity.java'),
      this.destinationPath(`src/main/java/${packageDir}/model/entity/${entity}.java`),
      {
        package: packageName,
        entity: entity,
        collection: collection,
        fields: this.props.fields,
        hasBigDecimalField: hasBigDecimalField,
        hasLocalDateTimeField: hasLocalDateTimeField,
        hasZonedDateTimeField: hasZonedDateTimeField,
        hasLocalDateField: hasLocalDateField
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/model/entity/AggregateRoot.java'),
      this.destinationPath(`src/main/java/${packageDir}/model/entity/AggregateRoot.java`),
      {
        package: packageName
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/model/event/DomainEvent.java'),
      this.destinationPath(`src/main/java/${packageDir}/model/event/DomainEvent.java`),
      {
        package: packageName
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/main/java/package/exception/EntityNotFoundException.java'),
      this.destinationPath(`src/main/java/${packageDir}/exception/EntityNotFoundException.java`),
      {
        package: packageName
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/test/java/package/controller/_ControllerIT.java'),
      this.destinationPath(`src/test/java/${packageDir}/controller/${controller}IT.java`),
      {
        package: packageName,
        controller: controller,
        repository: repository,
        path: path,
        entity: entity,
        dto: dto
      }
    );
  }
};