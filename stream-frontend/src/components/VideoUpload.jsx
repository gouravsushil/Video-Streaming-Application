import { useState } from "react";
import videoLogo from "../assets/video-posting.png";
import {
    Button,
    Card,
    Label,
    TextInput,
    Textarea,
    Progress,
    Alert,
} from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";


function VideoUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [meta, setMeta] = useState({
        title: "",
        description: "",
    });
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);


    function handleFileChange(event) {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    }

    function formFieldChange(event) {
        // console.log(event.target.name);
        // console.log(event.target.value);
        setMeta({
            ...meta,
            [event.target.name]: event.target.value,
        });
    }

    function handleForm(formEvent) {
        formEvent.preventDefault();
        if (!selectedFile) {
            alert("Select File !!");
            return;
        }
        //submit the file to server:
        saveVideoToServer(selectedFile, meta);
    }

    function resetForm() {
        setMeta({
            title: "",
            description: "",
        });
        setSelectedFile(null);
        setUploading(false);
        // setMessage("");
    }

    //submit file to server
    async function saveVideoToServer(video, videoMetaData) {
        setUploading(true);

        //api call

        try {
            let formData = new FormData();
            formData.append("title", videoMetaData.title);
            formData.append("description", videoMetaData.description);
            formData.append("file", selectedFile);

            // const credentials = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0NSIsImlhdCI6MTczNDg4NjU1NywiZXhwIjoxNzM0ODg2NjY1fQ.JIdm2w2zFJkTGaOOaCCNeClTNrAL2-uLYEkA7ggbMRo";
            // const credentials = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0NSIsImlhdCI6MTczNDg4ODg1NiwiZXhwIjoxNzM0ODg4OTY0fQ.ShQRse1FRm1dq5SM6Gr55W7qaEXjFqvWXbzEHGLmWj8";
            const token = localStorage.getItem("token");
            console.log();
            let response = await axios.post(
                `http://localhost:8080/api/v1/videos`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );

                        console.log(progress);
                        setProgress(progress);
                    },
                }
            );

            console.log(response);
            setProgress(0);

            setMessage("File uploaded " + response.data.videoId);
            // console.log(response);
            // console.log(response.data);
            setUploading(false);
            toast.success("File uploaded successfully !!");
            setIsError(false);
            resetForm();
        } catch (error) {
            console.log(error);
            setMessage("Error in uplaoding File");
            setIsError(true);
            setUploading(false);
            toast.error("File not uploaded !!");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 my-5">
            <Card className="w-full max-w-3xl bg-gray-800 shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-white text-center mb-6">Upload Videos</h1>

                <form
                    noValidate
                    className="space-y-6"
                    onSubmit={handleForm}
                >
                    {/* Video Title Input */}
                    <div>
                        <Label htmlFor="file-upload" className="block text-white mb-2" value="Video Title" />
                        <TextInput
                            value={meta.title}
                            onChange={formFieldChange}
                            name="title"
                            placeholder="Enter title"
                            className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Video Description Input */}
                    <div>
                        <Label htmlFor="comment" className="block text-white mb-2" value="Video Description" />
                        <Textarea
                            value={meta.description}
                            onChange={formFieldChange}
                            name="description"
                            id="comment"
                            placeholder="Write video description..."
                            required
                            rows={4}
                            className="w-full p-3 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Video Upload Input */}
                    <div className="flex items-center space-x-5 justify-center">
                        <div className="shrink-0">
                            <img
                                className="h-16 w-16 object-cover rounded-full border border-gray-500"
                                src={videoLogo}
                                alt="Current profile photo"
                            />
                        </div>
                        <label className="block w-full">
                            <span className="sr-only">Choose video file</span>
                            <input
                                name="file"
                                onChange={handleFileChange}
                                type="file"
                                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700"
                            />
                        </label>
                    </div>

                    {/* Upload Progress */}
                    {uploading && (
                        <Progress
                            color="green"
                            progress={progress}
                            textLabel="Uploading"
                            size="lg"
                            labelProgress
                            labelText
                            className="mt-4"
                        />
                    )}

                    {/* Success Alert */}
                    {message && (
                        <Alert
                            color={isError ? "danger" : "success"} // Conditionally set color based on success or error
                            rounded
                            withBorderAccent
                            onDismiss={() => setMessage("")}
                            className="mt-4"
                        >
                            <span className="font-medium">
                                {isError ? "Error alert!" : "Success alert!"}
                            </span>
                            {message}
                        </Alert>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <Button
                            disabled={uploading}
                            type="submit"
                            className="w-full bg-cyan-700 py-3 rounded-md text-white font-semibold hover:bg-cyan-800 transition-all"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default VideoUpload;