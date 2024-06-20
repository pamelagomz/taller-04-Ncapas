package org.ffigueroa.parcial02.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "Specialization")
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private  String code;

    private String name;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "specialization")
    private List<Attends> attends;
}
