import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Query,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from '@prisma/client';
import { CreateTicketDto, UpdateTicketDto } from '../dto';

@Controller('ticket')
export class TicketController {
  private readonly logger = new Logger(TicketController.name);
  constructor(private ticketService: TicketService) {}

  @Get('count')
  async getCount(): Promise<number> {
    this.logger.log('Handling getCount request');
    return this.ticketService.getTicketCount();
  }

  @Get()
  getTickets(
    @Query('id') id: number,
    @Query('status') status?: string,
    @Query('sortByStatus') sortByStatus?: 'asc' | 'desc',
    @Query('sortByLatestUpdate') sortByLatestUpdate?: 'asc' | 'desc',
  ): Promise<Ticket[]> {
    this.logger.log('Handling getTickets request');
    return this.ticketService.getTickets(
      id,
      status,
      sortByStatus,
      sortByLatestUpdate,
    );
  }

  @Post('create')
  async createTicket(
    @Body() createTicketData: CreateTicketDto,
  ): Promise<Ticket> {
    this.logger.log('Handling createTicket request');
    const ticket = await this.ticketService.createTicket(createTicketData);
    return ticket;
  }

  @Post('mockdata')
  async createMockTickets(@Body() mockTicketsData: any[]) {
    this.logger.log('Handling createTickets request');
    const createdTickets = await this.ticketService.createMockTickets(
      mockTicketsData,
    );
    return createdTickets;
  }

  @Put(':id')
  async updateTicket(
    @Param('id') id: number,
    @Body()
    updateData: UpdateTicketDto,
  ) {
    this.logger.log('Handling updateTicket request');
    const updatedTicket = await this.ticketService.updateTicket(id, updateData);
    return updatedTicket;
  }

  @Delete('*')
  async deleteAll(): Promise<string> {
    this.logger.log('Handling deleteAll request');
    throw new HttpException(
      'Deleting tickets is not allowed.',
      HttpStatus.FORBIDDEN,
    );
  }
}
