import axios from 'axios';

const EXPERT_BASE_RES_API_URL = "https://askybackend.onrender.com/experts";

class ExpertService {
    
    // Obtener la lista de expertos con filtros opcionales
    searchExperts(filters) {
        return axios.get(`${EXPERT_BASE_RES_API_URL}/search`, {
            params: filters
        });
    }
}

// Asigna la instancia a una variable antes de exportarla
const expertService = new ExpertService();
export default expertService;
