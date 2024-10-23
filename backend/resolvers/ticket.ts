import TicketModel from '../models/ticket.model';

const ticketResolvers = {
  Query: {
    getTickets: async () => {
      return await TicketModel.find({});
    },
  },
  Mutation: {
    createTicket: async (_: any, args: { content: string }) => {
      const { content } = args;
      const newTicket = new TicketModel({ content });
      return await newTicket.save();
    },

    deleteTicket: async (_: any, args: { id: string }) => {
      const { id } = args;
      const deleted = await TicketModel.findByIdAndDelete(id);
      return !!deleted;
    },
  },
};

export default ticketResolvers;
