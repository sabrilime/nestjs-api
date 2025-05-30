import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreatePostDto } from "./dto/CreatePost.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Post()
    @UsePipes(new ValidationPipe)
    createPost(@Body() CreatePostDto: CreatePostDto) {
        return this.postsService.createPost(CreatePostDto);
    }
}