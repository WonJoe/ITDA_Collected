package com.itda.backend.dto;

import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TestDTO {

    private String id;
    private String name;
    private String password;
    private String gender;
    private String logChk;

    private int tall;
    private int weight;
    private int distance;

    private String saveFileName;
    private String originalFileName;

    private String urlFile;

    private InputStream inputStream;

    private MultipartFile upload;

}
