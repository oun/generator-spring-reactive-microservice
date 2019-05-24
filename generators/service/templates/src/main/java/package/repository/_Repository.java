package <%= package %>.repository;

import <%= package %>.model.entity.<%= entity %>;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface <%= entity %>Repository extends ReactiveCrudRepository<<%= entity %>, String> {
}
