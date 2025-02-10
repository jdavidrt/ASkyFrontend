import axios from 'axios';

const QUESTION_BASE_RES_API_URL = "https://askybackend.onrender.com/questions";

class QuestionService {

    // Obtener todas las preguntas
    getAllQuestions() {
        return axios.get(QUESTION_BASE_RES_API_URL);
    }

    createQuestion(question, userId) {
        return axios.post(`${QUESTION_BASE_RES_API_URL}?userId=${userId}`, 
            question, // Solo enviar la pregunta en el cuerpo
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    // Obtener pregunta por ID
    getQuestionById(questionId) {
        return axios.get(`${QUESTION_BASE_RES_API_URL}/${questionId}`);
    }

    // Eliminar una pregunta por ID
    deleteQuestionById(questionId) {
        return axios.delete(`${QUESTION_BASE_RES_API_URL}/${questionId}`);
    }

    // Asignar pregunta a un experto
    assignQuestionToExpert(questionId, expertId) {
        return axios.put(`${QUESTION_BASE_RES_API_URL}/${questionId}/assign-expert/${expertId}`);
    }

    // Buscar preguntas utilizando una palabra clave en el título o descripción 
    searchQuestions(params) {
        return axios.get(`${QUESTION_BASE_RES_API_URL}/search`, { params });
    }
}

// Exportar una instancia de QuestionService
const questionService = new QuestionService();
export default questionService;
