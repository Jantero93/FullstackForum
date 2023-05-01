package com.example.fullstackforum.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String homeController() {
        return "This is root/home routesrewrew";
    }
}
