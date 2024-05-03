package com.itda.backend.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.dto.LocationSelectedDTO;

@RestController
public class LocationController {

	@Autowired
	private LocationService locationService;

	// 거리 순 매칭
	@CrossOrigin
	@PostMapping("/testonelist")
	public ResponseEntity<?> matching(@RequestBody Location location) throws Exception {
		System.out.println("왔어?");
		Long userNo = location.getUserNo();
		System.out.println("왔어2");

		ResponseEntity<?> testentity = new ResponseEntity<>(locationService.getMatchingDistance(userNo), HttpStatus.OK);
		System.out.println("왔어?3");

		LocationSelectedDTO dto = new LocationSelectedDTO();
		dto.setUserNo(userNo);
		locationService.selected(dto);

		return testentity;
	}

}
