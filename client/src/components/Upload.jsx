import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import app from '../firebase';
import axios from 'axios';

const Container = styled.div`
  top:0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  top: 10px;
  right: 16px;
  cursor: pointer;
  font-size: 24px;
  line-height: 24px;
  position: absolute;
`

const Title = styled.h2`
  margin: 24px 0;
  text-align: center;
`
const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  background-color: transparent;
  color: ${({theme}) => theme.text};
  border: 1px solid ${({theme}) => theme.soft};
`
const Desc = styled.textarea`
  padding: 10px;
  border-radius: 4px;
  background-color: transparent;
  color: ${({theme}) => theme.text};
  border: 1px solid ${({theme}) => theme.soft};
`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({setOpen}) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPercent, setImgPercent] = useState(0);
  const [videoPercent, setVideoPercent] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value};
    })
  }

  const handleTags = e => {
    setTags(e.target.value.split(","))
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      urlType === "imgUrl" ? setImgPercent(Math.round(progress)) : setVideoPercent(Math.round(progress));
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    error => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setInputs(prev => {
          return {...prev, [urlType]: downloadUrl};
        })
      })
    }
    )
  }

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video])
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img])

  const handleUpload = async e => {
    e.preventDefault();
    const res = await axios.post("/videos", {...inputs, tags}).then(res => {
      setOpen(false)
      res.status === 200 && navigate(`/videos/${res.data._id}`)
    });
  }

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>&times;</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPercent > 0 ? "Uploading: " + videoPercent + "%" : <Input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />}
        <Input type="text" placeholder="Title" name="title" onChange={handleChange} />
        <Desc placeholder="Description" rows="8" name="description" onChange={handleChange} />
        <Input type="text" placeholder="Comma separated tags" onChange={handleTags} />
        <Label>Image:</Label>
        {imgPercent > 0 ? "Uploading: " + imgPercent + "%" : <Input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} />}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  )
}

export default Upload
