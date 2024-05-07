package com.itda.backend.csboard.service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itda.backend.csboard.entity.CSBoardEntity;
import com.itda.backend.csboard.repository.CSBoardRepository;

@Service
public class CSBoardService {
    @Autowired
    private CSBoardRepository csBoardRepository;

    public void boardWrite(CSBoardEntity csBoardEntity) {
        System.out.println("보드 저장 서비스 실행");
        csBoardEntity.setCreatedAt(LocalDateTime.now());
        csBoardRepository.save(csBoardEntity);

    }

    public List<CSBoardEntity> boardList() {
        return csBoardRepository.findAll();

    }

    public CSBoardEntity findByBoardNo(Long boardNo) {
        return csBoardRepository.findByBoardNo(boardNo);
    }

    public void editBoard(CSBoardEntity csBoardEntity) {

        System.out.println("정보 수정서비스 실행");

        System.out.println("내용:" + csBoardEntity.getBoardContent());
        System.out.println("제목:" + csBoardEntity.getBoardSubject());
        // 기존 정보 갖고오기
        CSBoardEntity entity = csBoardRepository.findByBoardNo(csBoardEntity.getBoardNo());
        entity.setUpdatedAt(LocalDateTime.now()); // 수정된 시간을 설정할 수 있도록 업데이트합니다.
        entity.setBoardContent(csBoardEntity.getBoardContent());
        entity.setBoardSubject(csBoardEntity.getBoardSubject());
        // 정보 다시저장
        csBoardRepository.save(entity);
    }
}
