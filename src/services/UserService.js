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
    updateUser(userId, userData) {
        const formData = new FormData();
        for (const key in userData) {
            formData.append(key, userData[key]);
        }

        return axios.put(`${USER_BASE_RES_API_URL}/profile/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    // Eliminar un usuario por ID
    deleteUserById(userId) {
        return axios.delete(`${USER_BASE_RES_API_URL}/${userId}`);
    }

}

export default new UserService();
