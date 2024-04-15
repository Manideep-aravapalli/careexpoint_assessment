import axios from "axios";
import { GetUserData } from "../interface/GetUserData";

const baseUrl = 'https://jsonplaceholder.org';

export class ApiService {

    static async userData(): Promise<GetUserData[]> {
        try {
            const url = `${baseUrl}/posts`;
            const response = await axios.get<GetUserData[]>(url);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the API request:', error);
            throw error;
        }
    }

    static async addUserData(title: String, body: String) {
        try {
            const url = `${baseUrl}/posts`;
            const response = await axios.post(url, {
                title: title,
                body: body,
            });
            return response.status;
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    static async updateUserData(id: Number, title: String, body: String) {
        try {
            const url = `${baseUrl}/posts/${id}`;
            const response = await axios.put(url, {
                title: title,
                body: body,
            });
            return response.status;
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
}