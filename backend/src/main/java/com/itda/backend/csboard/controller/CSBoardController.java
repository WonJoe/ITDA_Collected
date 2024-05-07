package com.itda.backend.csboard.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.csboard.entity.CSBoardEntity;
import com.itda.backend.csboard.service.CSBoardService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
public class CSBoardController {

    private final CSBoardService boardService;

    @PostMapping("/board/write")
    public ResponseEntity<Void> boardWrite(@RequestBody CSBoardEntity entity, HttpSession session) {

        System.out.println("보드 컨트롤러 실행");
        System.out.println("넘어온 제목:" + entity.getBoardSubject() + "넘어온 아이디" + entity.getBoardWriteId());
        boardService.boardWrite(entity);
        return ResponseEntity.ok().build();

    }

    @GetMapping("/board/list")
    public ResponseEntity<List<CSBoardEntity>> boardList() {
        List<CSBoardEntity> boardList = boardService.boardList();
        return ResponseEntity.ok(boardList);
    }

    @GetMapping("/boardDetail")
    public ResponseEntity<CSBoardEntity> getBoardDetail(@RequestParam String boardNo) {
        Long number = Long.parseLong(boardNo);
        CSBoardEntity board = boardService.findByBoardNo(number);
        return ResponseEntity.ok(board);
    }

    @PostMapping("/board/edit")
    public ResponseEntity<Void> editBoard(@RequestBody CSBoardEntity entity) {
        boardService.editBoard(entity);
        return ResponseEntity.ok().build();
    }
}