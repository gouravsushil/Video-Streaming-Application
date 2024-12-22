package com.stream.app.spring_stream_backend.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
//import java.util.UUID;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


//import java.util.Random;  // to generate a random integer for videoId

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import com.stream.app.spring_stream_backend.AppConstants;
import com.stream.app.spring_stream_backend.entities.Video;
import com.stream.app.spring_stream_backend.payload.CustomMessage;
import com.stream.app.spring_stream_backend.services.VideoService;

@RestController
@RequestMapping("/api/v1/videos")
@CrossOrigin("*")
public class VideoController {

	@Autowired
	private VideoService videoService;
	
//	public VideoController(VideoService videoService) {
//		this.videoService = videoService;
//	}
	
	
	// video upload
	@PostMapping
	public ResponseEntity<?> create(
			@RequestParam("file")MultipartFile file,
			@RequestParam("title")String title,
			@RequestParam("description")String description
			){
		Video video = new Video();
		video.setTitle(title);
		video.setDescription(description);
//		video.setVideoId(UUID.randomUUID());
//		video.setVideoId(new Random().nextInt());  // Generates a random integer
		Video savedVideo = videoService.save(video, file);
		
		if(savedVideo != null) {
			return ResponseEntity.status(HttpStatus.OK).body(video);
		}
		return null;
	}
	
	
	// get all videos
	@GetMapping
	public List<Video> getAll(){
		
		List<Video> videos = videoService.getAll();
		System.out.println(videos);
		return videos;
	}
	
	// stream video
    // http://localhost:8080/api/v1/videos/stream/{videoId}
	@GetMapping("/stream/{videoId}")
	public ResponseEntity<Resource> stream(
			@PathVariable int videoId
	){
		Video video = videoService.get(videoId);
		String contentType = video.getContentType();
		String filePath = video.getPath();
		
		Resource resource = new FileSystemResource(filePath);
		
		if(contentType == null) {
			contentType = "application/octet-stream";
		}
		
		return (ResponseEntity
				.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.body(resource));		
	}


    // stream video in chunks
    @GetMapping("/stream/range/{videoId}")
    public ResponseEntity<Resource> streamVideoRange(@PathVariable int videoId, @RequestHeader(value = "Range", required = false) String range) {
        System.out.println(range);
        //

        Video video = videoService.get(videoId);
        Path path = Paths.get(video.getPath());

        Resource resource = new FileSystemResource(path);

        String contentType = video.getContentType();

        if (contentType == null) {
            contentType = "application/octet-stream";

        }

        // length of the file
        long fileLength = path.toFile().length();


        // if there is no range requirement from the client then the earlier concept is only used
        if (range == null) {
            return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
        }

        //calculating start and end range

        long rangeStart;

        long rangeEnd;

        String[] ranges = range.replace("bytes=", "").split("-");
        rangeStart = Long.parseLong(ranges[0]);

//        rangeEnd = rangeStart + AppConstants.CHUNK_SIZE - 1;
//
//        if (rangeEnd >= fileLength) {
//            rangeEnd = fileLength - 1;
//        }

        if (ranges.length > 1) {
            rangeEnd = Long.parseLong(ranges[1]);
        } else {
            rangeEnd = fileLength - 1;
        }

        if (rangeEnd > fileLength - 1) {
            rangeEnd = fileLength - 1;
        }


        System.out.println("range start : " + rangeStart);
        System.out.println("range end : " + rangeEnd);
        InputStream inputStream;

        try {

            inputStream = Files.newInputStream(path);
            inputStream.skip(rangeStart);
            


        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        
        long contentLength = rangeEnd - rangeStart + 1;
//      byte[] data = new byte[(int) contentLength];
//      int read = inputStream.read(data, 0, data.length);
//      System.out.println("read(number of bytes) : " + read);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Range", "bytes " + rangeStart + "-" + rangeEnd + "/" + fileLength);
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.add("X-Content-Type-Options", "nosniff");
        headers.setContentLength(contentLength);

        return ResponseEntity
              .status(HttpStatus.PARTIAL_CONTENT)
              .headers(headers)
              .contentType(MediaType.parseMediaType(contentType))
              .body(new InputStreamResource(inputStream));

    }	

}

	

