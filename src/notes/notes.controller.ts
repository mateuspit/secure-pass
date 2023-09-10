import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDTO } from './DTO/notes.DTO';
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
    @ApiResponse({ status: HttpStatus.CREATED, description: "Created note info data" })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: "Title in note info already in use!" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Some user notes input data invalid!" })
    async createNoteController(@Body() noteBody: NoteDTO): Promise<void> {
        await this.noteService.createNoteService(noteBody)
    }

    @Get()
    @ApiOperation({ summary: "Make a request to get all note data by id" })
    @ApiResponse({ status: HttpStatus.OK, description: "All user notes info data returned!" })
    //async getAllNoteController(@User() user: UserPrisma): Promise<noteDTO[]> {
    async getAllNoteController(@User() user: UserPrisma): Promise<NoteDTO[]> {
        return await this.noteService.getAllNoteService(user.id);
    }

    @Get(":id")
    @ApiOperation({ summary: "Make a request to get a note data by id" })
    @ApiParam({ name: "id", description: `Given what id note must be picked`, example: 1 })
    @ApiResponse({ status: HttpStatus.OK, description: "Specific user notes data info returned!" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Specific user notes data info not found!" })
    async getNoteByIdController(@Param("id", ParseIntPipe) id: number): Promise<NoteDTO> {
        return await this.noteService.getNoteByIdService(id);
    }

    @Delete(":id")
    @ApiParam({ name: "id", description: `Given what id note must be deleted`, example: 1 })
    @ApiOperation({ summary: "Make a request to delete a note data by id" })
    @ApiResponse({ status: HttpStatus.OK, description: "Specific user note data info deleted!" })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Specific user note data info not found" })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: "Specific user note data info belongs to another user" })
    //async deleteNoteByIdController(@Param("id", ParseIntPipe) id: number, @User() user: UserPrisma): Promise<void> {
    //    await this.noteService.deleteNoteByIdService(id, user);
    async deleteNoteByIdController(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.noteService.deleteNoteByIdService(id);
    }
}
