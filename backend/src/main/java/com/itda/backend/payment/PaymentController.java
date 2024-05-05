package com.itda.backend.payment;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Random;
import java.util.HashMap;

import java.util.List;

import java.io.InputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.itda.backend.dto.CartDTO;
import com.itda.backend.dto.ChatDTO;
import com.itda.backend.dto.PayDTO;
import com.itda.backend.dto.PaymentDTO;
import com.itda.backend.dto.TestDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class PaymentController {

    @Resource
    private TranService tranService;

    @Autowired
    private FileManager fileManager;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping(value = "/")
    public String HOME() {

        System.out.println("여기로오나?");

        return "12312312312321";

    }

    @PostMapping("/api/add")
    public String postMethodName(@ModelAttribute TestDTO dto, HttpSession session) throws Exception {

        MultipartFile file = dto.getUpload();

        if (file == null || file.isEmpty()) {
            return "error: No file uploaded";
        } else {

            InputStream is = file.getInputStream();

            String savePath = "C:\\VSCode\\itda\\demo\\src\\main\\resources\\static\\image";

            String originalFileName = file.getOriginalFilename();

            String newFileName = fileManager.doFileUpload(is, originalFileName, savePath); // 핵심

            dto.setOriginalFileName(originalFileName);
            dto.setSaveFileName(newFileName);
            dto.setLogChk("false");

            tranService.insertDate(dto);
        }

        return "success";
    }

    @GetMapping("/api/getList")
    public Map<String, Object> getList(HttpSession session) throws Exception {

        List<TestDTO> lists = tranService.getList();

        String savePath = "C:\\VSCode\\itda\\demo\\src\\main\\resources\\static\\image";

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("lists", lists);
        responseData.put("imagePath", savePath);

        return responseData;

    }

    @PostMapping("/api/login")
    public Map<String, Object> login(@RequestBody TestDTO dto, HttpServletResponse response, HttpSession session)
            throws Exception {

        String id = dto.getId();
        String pwd = dto.getPassword();

        TestDTO dto2 = tranService.idCheck(id);

        Map<String, Object> res = new HashMap<>();

        if (dto2 == null || !dto2.getPassword().equals(pwd)) {
            res.put("error", "아이디 또는 비밀번호가 잘못되었습니다.");
            return res;

        } else {

            String userId = dto2.getId();
            String name = dto2.getName();

            res.put("user", dto2);
            res.put("success", true);

            session.setAttribute("userId", userId);
            session.setAttribute("name", name);

            return res;
        }

    }

    @GetMapping("/api/logout")
    public Map<String, Object> logout(HttpSession session) {

        session.invalidate(); // 세션 무효화

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Logged out successfully");
        return res;
    }

    @PostMapping("/api/messages")
    public String sendMessage(@RequestBody ChatDTO dto) throws Exception {

        int maxNum = 0;

        maxNum = tranService.maxNum();

        dto.setChatNum(maxNum + 1);

        tranService.insertChat(dto);

        // 메시지를 수신자의 전용 채널로 전송
        String receiverId = dto.getReceiverId();
        messagingTemplate.convertAndSend("/topic/messages/" + receiverId, dto);

        return "succese";
    }

    // 메시지 로딩
    @GetMapping("/api/messages/{senderId}/{receiverId}")
    public List<ChatDTO> fetchMessages(@PathVariable String senderId, @PathVariable String receiverId)
            throws Exception {

        ChatDTO dto = new ChatDTO();

        dto.setSenderId(senderId);
        dto.setReceiverId(receiverId);

        return tranService.chatList(dto);

    }

    @PostMapping("/api/ranMessages")
    public String ranMessage(@RequestBody ChatDTO dto) throws Exception {

        int maxNum = 0;

        maxNum = tranService.ranMaxNum();

        dto.setChatNum(maxNum + 1);

        tranService.insertRanChat(dto);

        // 메시지를 수신자의 전용 채널로 전송
        String receiverId = dto.getReceiverId();
        messagingTemplate.convertAndSend("/topic/ranMessages/" + receiverId, dto);

        return "succese";
    }

    @PostMapping("/api/setChatStatus")
    public String status(@RequestBody TestDTO dto) throws Exception {

        if (dto.getId() == null) {
            throw new Exception("User not logged in");
        }

        // tranService.updateLog(dto);

        return "sucess";

    }

    // 랜덤채팅 인원 찾기
    @PostMapping("/api/findUser")
    public ResponseEntity<?> find(@RequestBody TestDTO dto) throws Exception {

        if (dto.getId() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: User not logged in");
        }

        List<TestDTO> users = tranService.ranList(dto.getId());

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: No users available");
        }

        Random random = new Random();
        TestDTO randomUser = users.get(random.nextInt(users.size())); // 랜덤 유저 선택

        return ResponseEntity.ok(randomUser);
    }

    @GetMapping("/api/ranChatList/{senderId}")
    public List<ChatDTO> ranChatList(@PathVariable String senderId) throws Exception {

        if (senderId == null) {

            System.out.println("데이터없음");

            return null;
        }

        List<ChatDTO> lists = tranService.ranChatList(senderId);

        System.out.println(lists);

        return lists;
    }

    // 메시지 로딩
    @GetMapping("/api/ranMessages/{senderId}/{receiverId}")
    public List<ChatDTO> ranhMessages(@PathVariable String senderId, @PathVariable String receiverId) throws Exception {

        ChatDTO dto = new ChatDTO();

        dto.setSenderId(senderId);
        dto.setReceiverId(receiverId);

        return tranService.ranDomChatList(dto);

    }

    @PostMapping("api/addToCart")
    public String postMethodName(@RequestBody CartDTO dto) throws Exception {

        int maxNum = tranService.basketMaxNum();

        dto.setBasketNumber(maxNum + 1);

        tranService.insertBasket(dto);

        return "success";
    }

    @GetMapping("api/basketList")
    public List<CartDTO> baskeList(HttpSession session) throws Exception {

        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return null;
        }

        List<CartDTO> lists = tranService.basketList(userId);

        return lists;

    }

    @PostMapping("api/paymentReady")
    public String paymentReady(@RequestBody PayDTO dto) throws Exception {

        int maxNum = tranService.payMaxNum();

        dto.setOrderNumber(maxNum + 1);

        tranService.paymentInsert(dto);

        return "success";
    }

    @PostMapping("/api/processPayments")
    public ResponseEntity<String> processPayments(@RequestBody PaymentDTO dto) throws Exception {

        if (dto == null || dto.getLists() == null) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        try {

            for (PayDTO item : dto.getLists()) {

                int maxNum = tranService.payMaxNum();

                item.setOrderNumber(maxNum + 1);

                tranService.paymentInsert(item); // 각 결제 정보를 데이터베이스에 저장
            }

            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing payments: " + e.getMessage());
        }

    }

    @GetMapping("/api/payList")
    public ResponseEntity<?> payList(HttpSession session) throws Exception {

        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.badRequest().body("사용자 ID가 제공되지 않았습니다.");
        }
        try {
            List<PayDTO> lists = tranService.payList(userId);
            if (lists.isEmpty()) {
                return ResponseEntity.notFound().build(); // 아무 것도 찾지 못했을 때
            }
            return ResponseEntity.ok(lists); // 정상적인 경우, 데이터와 함께 200 OK 응답

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류가 발생했습니다: " + e.getMessage());
        }
    }

}
