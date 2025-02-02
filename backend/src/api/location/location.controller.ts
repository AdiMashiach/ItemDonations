import { Controller, Get } from "@nestjs/common";
import { LocationService } from "./location.service";

@Controller('api/location')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    @Get('')
    async getLocation() {
        return await this.locationService.getLocation()
    }
}