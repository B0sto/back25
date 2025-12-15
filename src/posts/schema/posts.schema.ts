import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "../../users/schema/users.schema";

@Schema({ timestamps: true })
export class Post {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: User;
}

export const postSchema = SchemaFactory.createForClass(Post);
