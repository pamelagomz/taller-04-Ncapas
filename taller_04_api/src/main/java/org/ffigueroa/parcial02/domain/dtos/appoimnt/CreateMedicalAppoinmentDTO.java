package org.ffigueroa.parcial02.domain.dtos.appoimnt;

import lombok.Data;
import org.ffigueroa.parcial02.domain.entities.Prescription;

import java.util.Date;
import java.util.List;

@Data
public class CreateMedicalAppoinmentDTO {
    Date realizacionDate;
    Date finalizationDate;
    Date solicitadaDate;
    Date estimadaFelinzationDate;
    String reason;
    String state;
    List<Prescription> prescriptions;
}
