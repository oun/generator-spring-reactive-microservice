package <%= package %>.service;

import <%= package %>.exception.EntityNotFoundException;
import <%= package %>.mapper.<%= mapper %>;
import <%= package %>.model.dto.<%= dto %>;
import <%= package %>.model.entity.<%= entity %>;
import <%= package %>.repository.<%= repository %>;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class <%= entity %>Service {
    private final <%= repository %> repository;

    public Mono<<%= dto %>> create(<%= dto %> dto) {
        return Mono.just(<%= mapper %>.INSTANCE.mapTo<%= entity %>(dto))
                .flatMap(repository::save)
                .map(<%= mapper %>.INSTANCE::mapTo<%= dto %>);
    }

    public Mono<<%= dto %>> update(String id, <%= dto %> dto) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(<%= entity %>.class, id)))
                .flatMap(entity -> {
                    <%= mapper %>.INSTANCE.mapTo<%= entity %>(dto, entity);
                    return repository.save(entity);
                })
                .map(<%= mapper %>.INSTANCE::mapTo<%= dto %>);
    }

    public Mono<<%= dto %>> findById(String id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(<%= entity %>.class, id)))
                .map(<%= mapper %>.INSTANCE::mapTo<%= dto %>);
    }

    public Mono<Void> deleteById(String id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new EntityNotFoundException(<%= entity %>.class, id)))
                .then(repository.deleteById(id));
    }
}
