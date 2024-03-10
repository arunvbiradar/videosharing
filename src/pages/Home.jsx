import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const result = await axios.get(`/videos/${type}`);
      setVideos(result.data);
    }
    fetchVideos();
  }, [type])

  return (
    <Container>
      {(videos && videos.length > 0) && videos.map(video => <Card key={video._id} video={video} />)}
    </Container>
  );
};

export default Home;
