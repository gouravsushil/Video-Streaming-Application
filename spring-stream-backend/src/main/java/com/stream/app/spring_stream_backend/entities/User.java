package com.stream.app.spring_stream_backend.entities;

// import jakarta.annotation.Generated;
// import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userid;
    private String username;
    private String password;
    private String email;

    // public User(){
    // }
    
    // public User(int userid, String username, String password, String email) {
    //     this.userid = userid;
    //     this.username = username;
    //     this.password = password;
    //     this.email = email;
    // }
    
    // public int getUserid() {
    //     return userid;
    // }
    // public void setUserid(int userid) {
    //     this.userid = userid;
    // }
    // public String getUsername() {
    //     return username;
    // }
    // public void setUsername(String username) {
    //     this.username = username;
    // }
    // public String getPassword() {
    //     return password;
    // }
    // public void setPassword(String password) {
    //     this.password = password;
    // }
    // public String getEmail() {
    //     return email;
    // }
    // public void setEmail(String email) {
    //     this.email = email;
    // }

    // @Override
    // public String toString() {
    //     return "User [userid=" + userid + ", username=" + username + ", password=" + password + ", email=" + email
    //             + "]";
    // }
    

    
}
