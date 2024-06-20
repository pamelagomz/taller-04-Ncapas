package org.ffigueroa.parcial02.domain.dtos;

import lombok.Data;
import org.ffigueroa.parcial02.domain.entities.History;
import org.ffigueroa.parcial02.domain.entities.User;

import java.util.List;

@Data
public class SchedulePresentationDTO {

    List<User> medics;

    List<History> medicalHistories;

}
