package com.ssafy.jobtalkbackend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/kakao")
public class KakaoController {
    @PostMapping("/callback")
    public Boolean test(@RequestBody Map<String, String> code) {
        log.info(code.get("code"));
        return true;
    }
}
