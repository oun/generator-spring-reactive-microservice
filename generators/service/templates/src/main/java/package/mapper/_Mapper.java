package <%= package %>.mapper;

import <%= package %>.model.dto.<%= dto %>;
import <%= package %>.model.entity.<%= entity %>;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface <%= entity %>Mapper {
    <%= entity %>Mapper INSTANCE = Mappers.getMapper(<%= entity %>Mapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdBy", source = "creator")
    @Mapping(target = "lastModifiedBy", source = "creator")
    <%= entity %> mapTo<%= entity %>(<%= dto %> dto, String creator);
    <%= dto %> mapTo<%= dto %>(<%= entity %> entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "lastModifiedBy", source = "updater")
    void mapTo<%= entity %>(<%= dto %> shop, String updater, @MappingTarget <%= entity %> entity);
}
