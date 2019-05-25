package <%= package %>.controller;

import <%= package %>.exception.EntityNotFoundException;
import <%= package %>.model.dto.ErrorDto;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.ServerWebInputException;

import javax.validation.ConstraintViolationException;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestControllerAdvice
@Slf4j
public class ErrorHandler {
    @ExceptionHandler(WebExchangeBindException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorDto handle(WebExchangeBindException exception) {
        return ErrorDto.builder()
                .code(BAD_REQUEST.value())
                .message(exception.getReason())
                .errors(exception.getFieldErrors()
                        .stream()
                        .map(error -> ErrorDto.ErrorDetailDto.builder()
                                .name(error.getField())
                                .message(error.getDefaultMessage())
                                .build())
                        .collect(Collectors.toList())
                )
                .build();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorDto handle(ConstraintViolationException exception) {
        return ErrorDto.builder()
                .code(BAD_REQUEST.value())
                .message("Validation failure")
                .errors(exception.getConstraintViolations()
                        .stream()
                        .map(error -> ErrorDto.ErrorDetailDto.builder()
                                .name(((PathImpl)error.getPropertyPath()).getLeafNode().toString())
                                .message(error.getMessage())
                                .build())
                        .collect(Collectors.toList())
                )
                .build();
    }

    @ExceptionHandler(ServerWebInputException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorDto handle(ServerWebInputException exception) {
        return ErrorDto.builder()
                .code(exception.getStatus().value())
                .message(exception.getReason())
                .build();
    }

    @ExceptionHandler(DuplicateKeyException.class)
    @ResponseStatus(BAD_REQUEST)
    public ErrorDto handle(DuplicateKeyException exception) {
        return ErrorDto.builder()
                .code(BAD_REQUEST.value())
                .message("Unique constraint violation")
                .build();
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(NOT_FOUND)
    public ErrorDto handle(EntityNotFoundException exception) {
        return ErrorDto.builder()
                .code(NOT_FOUND.value())
                .message(exception.getMessage())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(INTERNAL_SERVER_ERROR)
    public ErrorDto handle(Exception exception) {
        log.error("Unhandled exception", exception);
        return ErrorDto.builder()
                .code(INTERNAL_SERVER_ERROR.value())
                .message("Internal server error")
                .build();
    }
}
