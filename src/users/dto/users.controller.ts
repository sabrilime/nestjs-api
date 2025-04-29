import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "../users.service";
import { createUserDto } from "./CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./UpdateUser.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: createUserDto) {
        console.log(createUserDto)
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    //users/:id
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('user not found', 404);
        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new HttpException('user not found', 404);
        return findUser;
    }
    
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const updatedUser = await this.usersService.updateUser(id, updateUserDto);
        if (!updatedUser) throw new HttpException('user not found', 404);
        return updatedUser;
    }

    @Delete('id')
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const deletedUser = await this.usersService.deleteUser(id);
        if (!deletedUser) throw new HttpException('user not found', 404);
        return;
    }
}