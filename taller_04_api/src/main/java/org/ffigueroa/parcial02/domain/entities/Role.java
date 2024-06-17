package org.ffigueroa.parcial02.domain.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Rol")
public class Role {
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
    @Id
    private String code;

    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private List<User> users;
}
