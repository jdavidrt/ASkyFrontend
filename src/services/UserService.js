import axios from 'axios';

const USER_BASE_RES_API_URL = "https://askybackend.onrender.com/users";

class UserService {

    // Obtener la lista de usuarios
    getAllUsers() {
        return axios.get(USER_BASE_RES_API_URL);
    }

    // Obtener un usuario por ID
    getUserById(userId) {
        return axios.get(`${USER_BASE_RES_API_URL}/${userId}`);
    }

    // Crear un nuevo usuario
    createUser(userData) {
        return axios.post(`${USER_BASE_RES_API_URL}/register`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Actualizar un usuario
    updateUser(userData) {
        return axios.put(`${USER_BASE_RES_API_URL}/profile`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Eliminar un usuario por ID
    deleteUserById(userId) {
        return axios.delete(`${USER_BASE_RES_API_URL}/${userId}`);
    }
    
}

export default new UserService();
