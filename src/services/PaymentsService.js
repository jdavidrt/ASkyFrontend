import axios from 'axios';

const EXPERT_BASE_RES_API_URL = "https://askybackend.onrender.com/payments";

class PaymentsService {

    // payments/expert/payout/status/{payoutID}
    getPaymentsByPayoutID(payoutId) {
        return axios.get(`${EXPERT_BASE_RES_API_URL}/expert/payout/status/${payoutId}`, {
        });
    }
    //payments/withdraw
    withdrawPayments() {
        return axios.post(`${EXPERT_BASE_RES_API_URL}/withdraw`, {
        });
    }
    //payments/expert
    expertPayout(expertId, rechargeData) {
        const formData = new FormData();
        for (const key in rechargeData) {
            formData.append(key, rechargeData[key]);
        }

        return axios.post(`${EXPERT_BASE_RES_API_URL}/expert/payout?expertId=${expertId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    rechargePayments(userId, rechargeData) {
        /*const formData = new FormData();
        for (const key in rechargeData) {
            formData.append(key, rechargeData[key]);
        }*/

        return axios.post(`${EXPERT_BASE_RES_API_URL}/recharge?userId=${userId}`, rechargeData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}

// Asigna la instancia a una variable antes de exportarla
const paymentsService = new PaymentsService();
export default paymentsService;
