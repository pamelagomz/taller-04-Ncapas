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
@Table(name = "MedicalAppointment")
public class MedicalAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String reason;

    private Date F_realizacion;
    
    private Date F_finalizacion;

    private Date F_solicitada;

    private Date f_estimada_finalizacion;

    private String state; // aprobacion, ejecucionen ejecucion, finalizada, rechazado, cancelado

    @OneToMany(fetch = FetchType.EAGER)
    private List<Prescription> prescriptions;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "medicalAppointments")
    private Attends attend;
}
