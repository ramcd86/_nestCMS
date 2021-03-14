import { Injectable } from "@nestjs/common";

require("dotenv").config();

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: process.env.ADMIN_ID,
      password: process.env.ADMIN_PASSWORD
    }
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
