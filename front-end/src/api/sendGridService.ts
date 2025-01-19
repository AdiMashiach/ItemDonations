import axios from "axios";

export interface IEmail {
    reciever: string;
    subject: string;
    message: string;
}

export const sendEmail = async (email: IEmail) => {
    const { data: response } = await axios.post(
        `localhost://3000/sendEmail`, email
    )

    return response
}