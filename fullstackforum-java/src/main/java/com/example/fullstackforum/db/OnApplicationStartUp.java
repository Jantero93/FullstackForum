package com.example.fullstackforum.db;

import com.example.fullstackforum.board.Board;
import com.example.fullstackforum.board.BoardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class OnApplicationStartUp {

    private final BoardRepository boardRepository;

    private static final Logger logger = LoggerFactory.getLogger(OnApplicationStartUp.class);


    public OnApplicationStartUp(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
        
        if (!boardRepository.findAll().isEmpty()) {
            logger.info("Board repository not empty, skipping data initialization");
            return;
        }

        logger.info("Board repository empty, initializing with test data...");

        var board1 = new Board();
        board1.setBoard("Car");
        board1.setAdjective("Cars are funny");

        var board2 = new Board();
        board2.setBoard("Coding");
        board2.setAdjective("Cat cat cat cat");

        List<Board> boards = Arrays.asList(board1, board2);

        boardRepository.saveAll(boards);
    }
}
