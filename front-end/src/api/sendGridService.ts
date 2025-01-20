import axios from "axios";

export interface IEmail {
    reciever: string;
    subject: string;
    message: string;
}

export const sendEmail = async (email: IEmail) => {
    const { data: response } = await axios.post(
        `http://localhost:3000/api/sendEmail`, email
    )

    return response
}