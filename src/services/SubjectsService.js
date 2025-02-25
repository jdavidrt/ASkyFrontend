import axios from 'axios';

const SUBJECT_BASE_RES_API_URL = "https://askybackend.onrender.com/subjects";

class SubjectService {

    // Obtener todos los subjects
    getAllSubjects() {
        return axios.get(SUBJECT_BASE_RES_API_URL);
    }

    // Crear un nuevo subject
    createSubject(subjectData) {
        return axios.post(SUBJECT_BASE_RES_API_URL, subjectData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Eliminar un subject por ID
    deleteSubjectById(subjectId) {
        return axios.delete(`${SUBJECT_BASE_RES_API_URL}/${subjectId}`);
    }

}

export default new SubjectService();
