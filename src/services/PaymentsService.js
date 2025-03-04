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
        return axios.get(`${EXPERT_BASE_RES_API_URL}/withdraw`, {
        });
    }
    //payments/recharge
    rechargePayments() {
        return axios.get(`${EXPERT_BASE_RES_API_URL}/recharge`, {
        });
    }
    //payments/expert
    expertPayout() {
        return axios.get(`${EXPERT_BASE_RES_API_URL}/expert/payout`, {
        });
    }

}

// Asigna la instancia a una variable antes de exportarla
const paymentsService = new PaymentsService();
export default paymentsService;
