package <%= package %>.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

<%_ if (hasLocalDateField) { _%>
import java.time.LocalDate;
<%_ } _%>
<%_ if (hasZonedDateTimeField) { _%>
import java.time.ZonedDateTime;
<%_ } _%>
<%_ if (hasBigDecimalField) { _%>
import java.math.BigDecimal;
<%_ } _%>

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class <%= dto %> {
    private String id;
    <%_ for (field of fields) { _%>
    private <%= field.type %> <%= field.name %>;
    <%_ } _%>

    @Min(0)
    private Long version;
}
