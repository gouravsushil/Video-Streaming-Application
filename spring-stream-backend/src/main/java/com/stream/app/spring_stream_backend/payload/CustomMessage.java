package com.stream.app.spring_stream_backend.payload;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CustomMessage {

	private String message;
	
	private boolean success = false;

	public static Object builder() {
		// TODO Auto-generated method stub
		return null;
	}

	
}