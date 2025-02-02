import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { translate } from "@vitalets/google-translate-api";
import axios from 'axios';

@Injectable()
export class LocationService {
    private apiKey: string;

    constructor(private configService: ConfigService) {
        this.apiKey = configService.get('IPSTACK_API_KEY')
     }
    
    async getLocation() {
        try {
            const { data: { ip } } = await axios.get('http://api.ipify.org?format=json')
            const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${this.apiKey}`);

            return (await translate(response.data.city, { to: 'he' })).text
        } catch (error) {
            throw new HttpException('Failed to get location', HttpStatus.BAD_REQUEST)
        }
    }
}