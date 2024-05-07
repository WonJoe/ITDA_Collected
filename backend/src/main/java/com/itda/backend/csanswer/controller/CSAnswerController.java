package com.itda.backend.csanswer.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.csanswer.entity.CSAnswerEntity;
import com.itda.backend.csanswer.service.CSAnswerService;

@RestController
@RequiredArgsConstructor
public class CSAnswerController {

    private final CSAnswerService csAnswerService;

    @PostMapping("/answer/write")
    public ResponseEntity<Void> answerWrite(@RequestBody CSAnswerEntity entity) {
        System.out.println("보드 컨트롤러 실행");
        System.out.println("넘어온 제목:" + entity.getAnswerSubject());
        csAnswerService.answerWrite(entity);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/answer/list")
    public ResponseEntity<List<CSAnswerEntity>> answerList() {
        System.out.println("엔써 리스트 요청 실행");
        List<CSAnswerEntity> answerList = csAnswerService.answerList();
        return ResponseEntity.ok(answerList);
    }

    @GetMapping("/answerDetail")
    public ResponseEntity<CSAnswerEntity> getAnswerDetail(@RequestParam String answerNo) {
        Long number = Long.parseLong(answerNo);
        CSAnswerEntity answer = csAnswerService.findByAnswerNo(number);
        return ResponseEntity.ok(answer);
    }

    @PostMapping("/answerEdit")
    public ResponseEntity<Void> editAnswer(@RequestBody CSAnswerEntity entity) {
        System.out.println("컨트롤러 시작");
        csAnswerService.editAnswer(entity);
        return ResponseEntity.ok().build();
    }
}
