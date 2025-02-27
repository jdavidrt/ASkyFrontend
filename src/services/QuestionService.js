import axios from 'axios';

const QUESTION_BASE_RES_API_URL = "https://askybackend.onrender.com/questions";

class QuestionService {

    // Obtener todas las preguntas
    getAllQuestions() {
        return axios.get(QUESTION_BASE_RES_API_URL);
    }

    createQuestion(questionData, userId) {
        const formData = new FormData();
        formData.append('title', questionData.title);
        formData.append('body', questionData.body);
        formData.append('price', questionData.price);
        formData.append('topicId', questionData.topicId);
        formData.append('userId', userId);
        formData.append('expertId', questionData.expertId);
        formData.append('deadline', questionData.deadline);
        if (questionData.imageUrl) {
            formData.append('imageUrl', questionData.imageUrl);
        }

        return axios.post(`${QUESTION_BASE_RES_API_URL}?userId=${userId}`, 
            formData, 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }

    // Eliminar una pregunta por ID
    deleteQuestionById(questionId) {
        return axios.delete(`${QUESTION_BASE_RES_API_URL}/${questionId}`);
    }

    // Filtrar preguntas basadas en varios parámetros
    filterQuestions(filters) {
        const queryParams = new URLSearchParams(filters).toString();
        return axios.get(`${QUESTION_BASE_RES_API_URL}/filter?${queryParams}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
    }

}

// Exportar una instancia de QuestionService
const questionService = new QuestionService();
export default questionService;
