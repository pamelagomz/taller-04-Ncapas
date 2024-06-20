package org.ffigueroa.parcial02.services;

import org.ffigueroa.parcial02.domain.entities.History;
import org.ffigueroa.parcial02.domain.entities.User;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface HistoryService {


    //Crear un nuevo historial a partir de un identificado
    public void createHistory(User user,Date date, String reason);

    public List<History> getHistoryByDatesAndUser(User user, Date start, Date end);

    public List<History> getHistoryByUser(User user);

}
