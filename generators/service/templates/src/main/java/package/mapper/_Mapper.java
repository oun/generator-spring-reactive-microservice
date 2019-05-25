package <%= package %>.mapper;

import <%= package %>.model.dto.<%= dto %>;
import <%= package %>.model.entity.<%= entity %>;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface <%= mapper %> {
    <%= entity %>Mapper INSTANCE = Mappers.getMapper(<%= entity %>Mapper.class);

    @Mapping(target = "id", ignore = true)
    <%= entity %> mapTo<%= entity %>(<%= dto %> dto);
    <%= dto %> mapTo<%= dto %>(<%= entity %> entity);

    @Mapping(target = "id", ignore = true)
    void mapTo<%= entity %>(<%= dto %> dto, @MappingTarget <%= entity %> entity);
}
