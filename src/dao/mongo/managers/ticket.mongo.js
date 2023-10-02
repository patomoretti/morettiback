import { ticketsModel } from "../models/ticket.model.js";

export class TicketsMongo{
    constructor(){
        this.model = ticketsModel;
    };

    async createTicket(ticketInfo){
        try {
            const result = await ticketsModel(ticketInfo);
            return result;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}