package com.itda.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itda.backend.dto.CreateUserRequest;
import com.itda.backend.location.Location;
import com.itda.backend.location.LocationService;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private LocationService locationService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Users>> findAll() {
        List<Users> users = usersService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/logged-in")
    public ResponseEntity<Users> findLoggedInUser() {
        String loggedInUserId = (String) httpSession.getAttribute("userId");

        Users loggedInUser = usersService.findByUserId(loggedInUserId);

        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
    }
    
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<Object> craeteUser(@RequestBody CreateUserRequest request) {
        Users users = request.getUsers();
        Location location = request.getLocation();
        
        //회원가입하면서 userNo 기반으로 동시에 테이블 생성(회원탈퇴하면 한번에 다 지워야함)
        usersService.save(users);

        return new ResponseEntity<>(locationService.save(users, location), HttpStatus.OK);
    }
}
