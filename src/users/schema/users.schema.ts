import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Post } from "../../posts/schema/posts.schema";

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String })
    firstname: string;

    @Prop({ type: String })
    lastname: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: Number })
    age: number;

    @Prop({ type: [Types.ObjectId], ref: 'Post', default: [] })
    posts: Post[];
}

export const userSchema = SchemaFactory.createForClass(User);