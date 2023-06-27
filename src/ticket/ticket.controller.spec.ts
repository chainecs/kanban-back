import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { CreateTicketDto, UpdateTicketDto } from '../dto';
import { Ticket } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

jest.mock('./ticket.service');
jest.mock('../prisma/prisma.service');

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [TicketService, PrismaService],
    }).compile();

    ticketService = app.get<TicketService>(TicketService);
    ticketController = app.get<TicketController>(TicketController);
  });

  describe('getCount', () => {
    it('should return number of tickets', async () => {
      const result = 10;
      jest.spyOn(ticketService, 'getTicketCount').mockResolvedValue(result);

      expect(await ticketController.getCount()).toBe(result);
    });
  });

  describe('getTickets', () => {
    it('should return array of tickets', async () => {
      const result: Ticket[] = [
        {
          id: 1,
          title: 'Test Ticket',
          description: 'Test description',
          email: 'test@test.com',
          phone: '1234567890',
          lineId: null,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdTimestamp: Math.floor(Date.now() / 1000),
          updatedTimestamp: Math.floor(Date.now() / 1000),
        },
      ];
      jest.spyOn(ticketService, 'getTickets').mockResolvedValue(result);

      expect(await ticketController.getTickets(null, null, null, null)).toEqual(
        result,
      );
    });
  });

  describe('createTicket', () => {
    it('should return created ticket', async () => {
      const createTicketDto: CreateTicketDto = {
        title: 'Test Ticket',
        description: 'Test description',
        email: 'test@test.com',
        phone: '1234567890',
        status: 'pending',
        lineId: null,
      };
      const result: Ticket = {
        id: 1,
        ...createTicketDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdTimestamp: Math.floor(Date.now() / 1000),
        updatedTimestamp: Math.floor(Date.now() / 1000),
      };
      jest.spyOn(ticketService, 'createTicket').mockResolvedValue(result);

      expect(await ticketController.createTicket(createTicketDto)).toEqual(
        result,
      );
    });
  });

  describe('updateTicket', () => {
    it('should return updated ticket', async () => {
      const updateTicketDto: UpdateTicketDto = {
        title: 'Updated Ticket',
        description: 'Updated description',
        email: 'updated@test.com',
        phone: '0987654321',
        status: 'resolved',
        lineId: 'line1234',
      };
      const result: Ticket = {
        id: 1,
        ...updateTicketDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdTimestamp: Math.floor(Date.now() / 1000),
        updatedTimestamp: Math.floor(Date.now() / 1000),
      };
      jest.spyOn(ticketService, 'updateTicket').mockResolvedValue(result);

      expect(await ticketController.updateTicket(1, updateTicketDto)).toEqual(
        result,
      );
    });
  });

  describe('deleteAll', () => {
    it('should throw an exception', async () => {
      try {
        await ticketController.deleteAll();
      } catch (e) {
        expect(e.status).toEqual(403);
        expect(e.message).toEqual('Deleting tickets is not allowed.');
      }
    });
  });
});
