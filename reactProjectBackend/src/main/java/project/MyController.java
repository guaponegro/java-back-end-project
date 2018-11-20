package project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class MyController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/user")
    public User createUser(@RequestBody User user){
        System.out.println("here 21");
        return userService.saveUser(user);
    }

    // Delete Route
    @DeleteMapping("/user/{id}/delete")
    public String deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
        return "Deleting user number " + id.toString();
    }

//    // Edit Route
//    @GetMapping("/user/{id}/edit")
//    public String editUsers(){
//        return "edit users";
//    }

    // Update Route
    @PutMapping("/user/edit")
    public String updateUser(@PathVariable Long id){
        return "Updating user number " + id.toString();
    }

    @PostMapping("/login")
    public User login(@RequestBody User login, HttpSession session) throws IOException {
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        User user = userRepository.findByUsername(login.getUsername());
        if(user ==  null){
            throw new IOException("Invalid Credentials");
        }
        boolean valid = bCryptPasswordEncoder.matches(login.getPassword(), user.getPassword());
        if(valid){
            session.setAttribute("username", user.getUsername());
            System.out.println(user);
            return user;
        }else{
            throw new IOException("Invalid Credentials");
        }
    }

}
