import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Ticket } from '@prisma/client';
import { CreateTicketDto, UpdateTicketDto } from 'src/dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async getTicketById(id: number) {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id: Number(id) },
      });
      if (ticket) return ticket;
      else return 'id not found';
    } catch (error) {
      throw error;
    }
  }

  async getTicketCount(): Promise<number> {
    return this.prisma.ticket.count();
  }

  async getTickets(
    id: number,
    status?: string,
    sortByStatus?: 'asc' | 'desc',
    sortByLatestUpdate?: 'asc' | 'desc',
  ): Promise<Ticket[]> {
    const query: Prisma.TicketFindManyArgs = {};
    if (id) {
      query.where = { id: Number(id) };
    }
    if (status) {
      query.where = { status };
    }
    if (sortByStatus) {
      query.orderBy = { status: sortByStatus };
    } else if (sortByLatestUpdate) {
      query.orderBy = { updatedAt: sortByLatestUpdate };
    }
    const tickets = await this.prisma.ticket.findMany(query);
    return tickets;
  }

  async createTicket(data: CreateTicketDto): Promise<Ticket> {
    try {
      const createdTicket = await this.prisma.ticket.create({
        data: {
          ...data,
          createdTimestamp: Math.floor(Date.now() / 1000),
          updatedTimestamp: Math.floor(Date.now() / 1000),
        },
      });
      return createdTicket;
    } catch (error) {
      throw error;
    }
  }

  async createMockTickets(tickets: any[]) {
    const formattedTickets = tickets.map((ticket) => ({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      email: ticket.email,
      phone: ticket.phone,
      lineId: ticket.lineId,
      createdTimestamp: Math.floor(Date.now() / 1000),
      updatedTimestamp: Math.floor(Date.now() / 1000),
    }));
    const createdTickets = await this.prisma.ticket.createMany({
      data: formattedTickets,
    });

    return createdTickets;
  }

  async updateTicket(id: number, data: UpdateTicketDto) {
    try {
      const ticket = await this.prisma.ticket.update({
        where: { id: Number(id) },
        data: {
          ...data,
          updatedTimestamp: Math.floor(Date.now() / 1000),
        },
      });
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}
