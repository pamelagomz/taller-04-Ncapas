package org.ffigueroa.parcial02.domain.dtos.history;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Data
public class GetRecordDTO {
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private Date start;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")
    private Date end;

    @NotNull
    private UUID user;
}
