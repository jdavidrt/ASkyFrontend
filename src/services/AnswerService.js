import axios from 'axios';

const ANSWER_BASE_RES_API_URL = "https://askybackend.onrender.com/answers";

class AnswerService {

    // Crear una nueva respuesta
    createAnswer(answerData) {
        return axios.post(ANSWER_BASE_RES_API_URL, answerData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    // Obtener todas las respuestas
    getAllAnswers() {
        return axios.get(ANSWER_BASE_RES_API_URL, {
            headers: {
                'Accept': 'application/json'
            }
        });
    }

}

const answerServiceInstance = new AnswerService();
export default answerServiceInstance;
