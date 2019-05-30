package <%= package %>.controller;

import <%= package %>.model.dto.<%= dto %>;
import <%= package %>.model.entity.<%= entity %>;
import <%= package %>.repository.<%= repository %>;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;
import reactor.core.publisher.Mono;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
public class <%= controller %>IT {
    @Autowired
    private WebTestClient client;
    @Autowired
    private <%= repository %> repository;

    @Test
    public void findById_ShouldSuccess() {
        <%= entity %> entity = repository.save(<%= entity %>.builder().build()).block();

        client.get().uri(String.format("<%= path %>/%s", entity.getId()))
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(APPLICATION_JSON_UTF8)
                .expectBody()
                .jsonPath("$.id").isEqualTo(entity.getId());
    }

    @Test
    public void findById_Given<%= entity %>NotExist_ShouldErrorNotFound() {
        String id = "5ce5ee6835809d491c1a868b";

        client.get().uri(String.format("<%= path %>/%s", id))
                .exchange()
                .expectStatus().isNotFound()
                .expectHeader().contentType(APPLICATION_JSON_UTF8)
                .expectBody()
                .jsonPath("$.code").isEqualTo("404")
                .jsonPath("$.message").isEqualTo(String.format("<%= entity %> %s not found", id));
    }

    @Test
    public void create_ShouldSuccess() {
        <%= dto %> dto = <%= dto %>.builder().build();

        client.post().uri("<%= path %>")
                .contentType(APPLICATION_JSON_UTF8)
                .body(BodyInserters.fromObject(dto))
                .exchange()
                .expectStatus().isCreated()
                .expectHeader().contentType(APPLICATION_JSON_UTF8)
                .expectBody()
                .jsonPath("$.id").exists();
    }

    @Test
    public void update_ShouldSuccess() {
        <%= dto %> dto = <%= dto %>.builder().version(0L).build();
        <%= entity %> entity = repository.save(<%= entity %>.builder().build()).block();

        client.patch().uri(String.format("<%= path %>/%s", entity.getId()))
                .contentType(APPLICATION_JSON_UTF8)
                .body(BodyInserters.fromPublisher(Mono.just(dto), <%= dto %>.class))
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(APPLICATION_JSON_UTF8)
                .expectBody()
                .jsonPath("$.id").isEqualTo(entity.getId());
    }

    @Test
    public void update_Given<%= entity %>NotExist_ShouldErrorNotFound() {
        String id = "5ce5ee6835809d491c1a868b";
        <%= dto %> dto = <%= dto %>.builder().build();

        client.patch().uri(String.format("<%= path %>/%s", id))
                .contentType(APPLICATION_JSON_UTF8)
                .body(BodyInserters.fromPublisher(Mono.just(dto), <%= dto %>.class))
                .exchange()
                .expectStatus().isNotFound()
                .expectHeader().contentType(APPLICATION_JSON_UTF8)
                .expectBody()
                .jsonPath("$.code").isEqualTo("404")
                .jsonPath("$.message").isEqualTo(String.format("<%= entity %> %s not found", id));
    }

    @Test
    public void delete_ShouldSuccess() {
        <%= entity %> entity = repository.save(<%= entity %>.builder().build()).block();

        client.delete().uri(String.format("<%= path %>/%s", entity.getId()))
                .exchange()
                .expectStatus().isNoContent()
                .expectBody()
                .isEmpty();
    }

    @Test
    public void delete_Given<%= entity %>NotExist_ShouldErrorNotFound() {
        String id = "5ce5ee6835809d491c1a868b";

        client.delete().uri(String.format("<%= path %>/%s", id))
                .exchange()
                .expectStatus().isNotFound()
                .expectHeader().contentType(APPLICATION_JSON_UTF8)
                .expectBody()
                .jsonPath("$.code").isEqualTo("404")
                .jsonPath("$.message").isEqualTo(String.format("<%= entity %> %s not found", id));
    }
}
