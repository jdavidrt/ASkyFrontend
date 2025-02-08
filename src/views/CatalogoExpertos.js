import React, { useEffect, useState } from 'react';
import topicService from '../services/TopicService';

const TopicTest = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        topicService.getAllTopics()
            .then(response => setTopics(response.data))
            .catch(error => console.error("Error al obtener topics:", error));
    }, []);

    return (
        <div>
            <h2>Lista de Topics</h2>
            <ul>
                {topics.map((topic, index) => (
                    <li key={index}>{topic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TopicTest;
