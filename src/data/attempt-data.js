import axios from 'axios';
import { server } from '../environment';

async function getAttemptReport(id) {
    try {
        const response = await axios.get(`${server}/attempt/${id}/report`);


        return response.data.data.report;

    } catch (error) {
        console.error(error);
    }
}

async function postAttempt(payload) {
    try {
        const response = await axios.post(`${server}/attempt`, payload);

        return response.data.data.result;

    } catch (error) {
        console.error(error);
    }
}



export {
    postAttempt, getAttemptReport
}