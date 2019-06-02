package <%= package %>.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

<%_ if (hasLocalDateField) { _%>
import java.time.LocalDate;
<%_ } _%>
import java.time.LocalDateTime;
<%_ if (hasZonedDateTimeField) { _%>
import java.time.ZonedDateTime;
<%_ } _%>
<%_ if (hasBigDecimalField) { _%>
import java.math.BigDecimal;
<%_ } _%>

@Document(collection = "<%= collection %>")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id", callSuper = false)
public class <%= entity %> extends AggregateRoot implements Persistable<String> {
    @Id
    private String id;
    <%_ for (field of fields) { _%>
    private <%= field.type %> <%= field.name %>;
    <%_ } _%>

    @Version
    private Long version;
    private String createdBy;
    private String lastModifiedBy;
    @CreatedDate
    private LocalDateTime createdDate;
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
