import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/posts.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto) {
    if (!isValidObjectId(createPostDto.userId))
      throw new BadRequestException('invalid user id');
    const newPost = await this.postModel.create(createPostDto);
    return newPost.populate('userId');
  }

  async findAll() {
    return this.postModel.find().populate('userId');
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid post id');
    const post = await this.postModel.findById(id).populate('userId');
    if (!post) throw new NotFoundException('post not found');
    return post;
  }

  async findByUserId(userId: string) {
    if (!isValidObjectId(userId))
      throw new BadRequestException('invalid user id');
    return this.postModel.find({ userId }).populate('userId');
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid post id');
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .populate('userId');
    if (!updatedPost) throw new NotFoundException('post not found');
    return updatedPost;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid post id');
    const deletedPost = await this.postModel.findByIdAndDelete(id);
    if (!deletedPost) throw new NotFoundException('post not found');
    return deletedPost;
  }
}
