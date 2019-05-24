package <%= package %>.controller;

import <%= package %>.model.dto.<%= dto %>;
import <%= package %>.service.<%= entity %>Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("<%= path %>")
@RequiredArgsConstructor
@Slf4j
public class <%= entity %>Controller extends BaseController {
    private final <%= entity %>Service service;

    @GetMapping("/{id}")
    public Mono<<%= dto %>> findById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public Mono<<%= dto %>> create(@RequestBody @Valid <%= dto %> dto, @RequestHeader @ApiIgnore Map<String, String> headers) {
        return service.create(dto, requestUser(headers));
    }

    @PatchMapping("/{id}")
    public Mono<<%= dto %>> update(@PathVariable String id, @RequestBody @Valid <%= dto %> dto, @RequestHeader @ApiIgnore Map<String, String> headers) {
        return service.update(id, dto, requestUser(headers));
    }
}
