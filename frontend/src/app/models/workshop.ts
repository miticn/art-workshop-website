export class Workshop{
    name: string;
    description: string;
    date: Date;
    mainPicture: string;
    gallery: string[];
    availableSeats: number;
    totalSeats: number;
    descriptionLong: string;
    cordinates: {
        lat: number;
        lng: number;
    };
    location: string;
}