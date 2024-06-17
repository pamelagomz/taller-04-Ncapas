package org.ffigueroa.parcial02.services.implementations;

import org.ffigueroa.parcial02.domain.entities.History;
import org.ffigueroa.parcial02.domain.entities.User;
import org.ffigueroa.parcial02.repositories.HistoryRepository;
import org.ffigueroa.parcial02.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    public HistoryServiceImpl(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }


    @Override
    public void createHistory(User user, Date date, String reason) {
        History history = new History();
        history.setReason(reason);
        history.setDate(date);
        history.setUser(user);
        historyRepository.save(history);
    }

    @Override
    public List<History> getHistoryByDatesAndUser(User user, Date start, Date end) {
        List<History> notFiltered = historyRepository.findAllByUser(user);

        List<History> filtered = notFiltered.stream()
                .filter(history -> !history.getDate().before(start) && !history.getDate().after(end))
                .collect(Collectors.toList());

        return filtered;
    }

    @Override
    public List<History> getHistoryByUser(User user) {
        return historyRepository.findAllByUser(user);
    }


}
