package org.ffigueroa.parcial02.repositories;

import org.ffigueroa.parcial02.domain.entities.History;
import org.ffigueroa.parcial02.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HistoryRepository extends JpaRepository<History, UUID> {
    List<History> findAllByUser(User user);
}
