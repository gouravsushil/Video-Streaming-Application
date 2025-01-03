package com.stream.app.spring_stream_backend.Dto;

public class UserDto {

    private int userid;
    private String username;
    private String password;
    private String email;

    
    public UserDto(){
    }


    public UserDto(int userid, String username, String password, String email) {
        this.userid = userid;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public int getUserid() {
        return userid;
    }
    public void setUserid(int userid) {
        this.userid = userid;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "UserDto [userid=" + userid + ", username=" + username + ", password=" + password + ", email=" + email
                + "]";
    }

    
    
}
