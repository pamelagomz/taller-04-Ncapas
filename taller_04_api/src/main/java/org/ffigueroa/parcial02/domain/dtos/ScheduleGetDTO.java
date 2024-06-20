package org.ffigueroa.parcial02.domain.dtos;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class ScheduleGetDTO {

    private Date date;
}
