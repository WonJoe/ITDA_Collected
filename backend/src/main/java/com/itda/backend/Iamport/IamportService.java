package com.itda.backend.Iamport;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class IamportService {

    @Autowired
    private IamportRepository iamportRepository;

    @Transactional
    public Iamport save(Iamport iamport){
        return iamportRepository.save(iamport);
    }
    
}
