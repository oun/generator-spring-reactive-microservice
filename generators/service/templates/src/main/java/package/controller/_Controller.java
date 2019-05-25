package <%= package %>.controller;

import <%= package %>.model.dto.<%= dto %>;
import <%= package %>.service.<%= entity %>Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequestMapping("<%= path %>")
@RequiredArgsConstructor
@Slf4j
public class <%= controller %> {
    private final <%= service %> service;

    @GetMapping("/{id}")
    public Mono<<%= dto %>> findById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public Mono<<%= dto %>> create(@RequestBody @Valid <%= dto %> dto) {
        return service.create(dto);
    }

    @PatchMapping("/{id}")
    public Mono<<%= dto %>> update(@PathVariable String id, @RequestBody @Valid <%= dto %> dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public Mono<Void> deleteById(@PathVariable String id) {
        return service.deleteById(id);
    }
}
