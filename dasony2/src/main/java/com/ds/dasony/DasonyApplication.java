package com.ds.dasony;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

//@ServletComponentScan
@EnableScheduling
@SpringBootApplication
public class DasonyApplication {

	public static void main(String[] args) {
		SpringApplication.run(DasonyApplication.class, args);
	}

}
