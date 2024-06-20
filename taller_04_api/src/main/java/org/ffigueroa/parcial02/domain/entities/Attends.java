package org.ffigueroa.parcial02.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Attends")
public class Attends {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "doctors_attends",
            joinColumns = @JoinColumn(name = "attend_id"),
            inverseJoinColumns = @JoinColumn(name = "doc_user_id")
    )
    private List<User> medics;

    @ManyToOne(fetch = FetchType.LAZY)
    private Specialization specialization;

    @OneToOne(fetch = FetchType.EAGER)
    private MedicalAppointment medicalAppointments;
}
