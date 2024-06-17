package org.ffigueroa.parcial02.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Prescription")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String dosis;

    private Date finalDate;

    private  String medicine;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private MedicalAppointment medicalAppointment;
}
