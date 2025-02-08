import axios from 'axios';


const TOPIC_BASE_RES_API_URL = "https://askybackend.onrender.com/topics";

class TopicService {

    // Obtener todas los topics
    getAllTopics() {
        return axios.get(TOPIC_BASE_RES_API_URL);
    }

    // Crear un nuevo topic
    createTopic(topic) {
        return axios.post(TOPIC_BASE_RES_API_URL, topic, {
            headers: {
                'Accept': 'application/json' 
            }
        });
    }

    // Eliminar un topic por id
    deleteTopicById(topicId) {
        return axios.delete(`${TOPIC_BASE_RES_API_URL}/${topicId}`);
    }
    
}

export default new TopicService();