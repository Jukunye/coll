import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // READ
  async findOne(email: string): Promise<UserDocument> {
    const user = this.userModel.findOne({ email }).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  // UPDATE
  async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ email }, updateUserDto, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  // DELETE
  async delete(email: string): Promise<void> {
    const result = await this.userModel.deleteOne({ email }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }
}
