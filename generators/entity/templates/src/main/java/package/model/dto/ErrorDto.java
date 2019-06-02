package <%= package %>.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class ErrorDto {
    private Integer code;
    private String message;
    private List<ErrorDetailDto> errors;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ErrorDetailDto {
        private String name;
        private String message;
    }
}
