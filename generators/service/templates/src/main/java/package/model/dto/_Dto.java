package <%= package %>.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class <%= dto %> {
    private String id;
    @Min(0)
    private Long version;
}
