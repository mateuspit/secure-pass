import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { noteDTO } from './DTO/notes.DTO';
import { User } from "../decorators/user.decorator";
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Notes routes")
@Controller('notes')
@ApiBearerAuth()
export class NotesController {
    constructor(private readonly noteService: NotesService) { }

    @Get("health")
    @ApiOperation({ summary: "Check availability in route notes" })
    @ApiResponse({ status: HttpStatus.OK, description: "Notes route working!" })
    async getHealthNoteController(): Promise<string> {
        return await this.noteService.getHealthNoteService();
    }

    @Post()
    @ApiOperation({ summary: "Make a request to create a new note data" })
    async createNoteController(@Body() noteBody: noteDTO): Promise<void> {
        await this.noteService.createNoteService(noteBody)
    }

    @Get()
    @ApiOperation({ summary: "Make a request to get all note data by id" })
    //async getAllNoteController(@User() user: UserPrisma): Promise<noteDTO[]> {
    async getAllNoteController(@User() user: UserPrisma): Promise<noteDTO[]> {
        return await this.noteService.getAllNoteService(user.id);
    }

    @Get(":id")
    @ApiOperation({ summary: "Make a request to get a note data by id" })
    @ApiParam({ name: "id" })
    async getNoteByIdController(@Param("id", ParseIntPipe) id: number): Promise<noteDTO> {
        return await this.noteService.getNoteByIdService(id);
    }

    @Delete(":id")
    @ApiParam({ name: "id" })
    @ApiOperation({ summary: "Make a request to delete a note data by id" })
    //async deleteNoteByIdController(@Param("id", ParseIntPipe) id: number, @User() user: UserPrisma): Promise<void> {
    //    await this.noteService.deleteNoteByIdService(id, user);
    async deleteNoteByIdController(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.noteService.deleteNoteByIdService(id);
    }
}
