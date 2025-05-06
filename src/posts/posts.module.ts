import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/schemas/Post.schema";
import { UserSettings, UserSettingsSchema } from "src/schemas/UserSettings.schema";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostSchema
            },
        ])
    ],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}