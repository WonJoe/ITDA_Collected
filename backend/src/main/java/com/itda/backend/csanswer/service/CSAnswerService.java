package com.itda.backend.csanswer.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itda.backend.csanswer.entity.CSAnswerEntity;
import com.itda.backend.csanswer.repository.CSAnswerRepository;

@Service
public class CSAnswerService {
    @Autowired
    private CSAnswerRepository csAnswerRepository;

    public void answerWrite(CSAnswerEntity csAnswerEntity) {
        System.out.println("답변 저장 서비스 실행");
        csAnswerEntity.setCreatedAt(LocalDateTime.now());
        csAnswerRepository.save(csAnswerEntity);
    }

    public List<CSAnswerEntity> answerList() {
        System.out.println("앤써 리스트 반환 서비스 실행");
        try {
            return csAnswerRepository.findAll();
        } catch (Exception e) {
            System.out.println("앤써 리스트 조회 중 오류 발생: " + e.getMessage());
            // 여기서 예외 처리 또는 로깅을 수행할 수 있습니다.
            return null; // 또는 적절한 처리를 위해 비어있는 리스트를 반환합니다.
        }
    }

    public CSAnswerEntity findByAnswerNo(Long answerNo) {
        return csAnswerRepository.findByAnswerNo(answerNo);
    }

    public void editAnswer(CSAnswerEntity csAnswerEntity) {

        System.out.println("정보 수정서비스 실행");

        System.out.println("내용:" + csAnswerEntity.getAnswerContent());
        System.out.println("제목:" + csAnswerEntity.getAnswerSubject());
        // 기존 정보 갖고오기
        CSAnswerEntity entity = csAnswerRepository.findByAnswerNo(csAnswerEntity.getAnswerNo());
        entity.setUpdatedAt(LocalDateTime.now()); // 수정된 시간을 설정할 수 있도록 업데이트합니다.
        entity.setAnswerContent(csAnswerEntity.getAnswerContent());
        entity.setAnswerSubject(csAnswerEntity.getAnswerSubject());
        // 정보 다시저장
        csAnswerRepository.save(entity);
    }

}
