package com.itda.backend.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itda.backend.dto.LocationSelectedDTO;
import com.itda.backend.mapper.LocationMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LocationSelectedService {

    @Autowired
    private LocationMapper locationMapper;

    @Transactional
    public void selected(LocationSelectedDTO dto) throws Exception {

        locationMapper.selected(dto);

    }

}
