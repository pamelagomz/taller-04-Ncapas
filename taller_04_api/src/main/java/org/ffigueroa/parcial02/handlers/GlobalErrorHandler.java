package org.ffigueroa.parcial02.handlers;
import lombok.extern.slf4j.Slf4j;
import org.ffigueroa.parcial02.domain.dtos.GeneralResponse;
import org.ffigueroa.parcial02.utils.ErrorsTools;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
@Slf4j
public class GlobalErrorHandler {

    private final ErrorsTools errorsTools;

    public GlobalErrorHandler(ErrorsTools errorsTools) {
        this.errorsTools = errorsTools;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralResponse> GeneralHandler(Exception e){
        //log.error("Error: ", e);
        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("error: " + e.getMessage())
                        .build(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );// "Error interno en el servidor"
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<GeneralResponse> ResourceNotFoundHandler(NoResourceFoundException e){
        //log.error("Error: ", e);
        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("No se encontro el recurso solicitado")
                        .build(),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<GeneralResponse> BadRequestHandler(MethodArgumentNotValidException ex){
        //log.error("Error: ", ex);
        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Error en los datos enviados")
                        .data(errorsTools.mapErrors(ex.getBindingResult().getFieldErrors()))
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<GeneralResponse> IllegalArgumentHandler(IllegalArgumentException e){
        //log.error("Error: ", e);
        return new ResponseEntity<>(
                new GeneralResponse.Builder()
                        .message("Error en los datos enviados")
                        .data(e.getMessage())
                        .build(),
                HttpStatus.BAD_REQUEST
        );

    }
}
