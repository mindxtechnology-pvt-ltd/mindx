import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.teamMember.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(createMemberDto: CreateMemberDto) {
    return this.prisma.teamMember.create({
      data: createMemberDto,
    });
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    return this.prisma.teamMember.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  async remove(id: string) {
    return this.prisma.teamMember.delete({
      where: { id },
    });
  }
}
