import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async findAll() {
    return this.prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!post) {
      throw new NotFoundException(`Blog post with slug ${slug} not found`);
    }
    return post;
  }

  async create(createBlogDto: CreateBlogDto) {
    const slug = this.generateSlug(createBlogDto.title);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return this.prisma.blogPost.create({
      data: {
        ...createBlogDto,
        slug,
        date,
      },
    });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const data: any = { ...updateBlogDto };
    if (updateBlogDto.title) {
      data.slug = this.generateSlug(updateBlogDto.title);
    }
    return this.prisma.blogPost.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.blogPost.delete({
      where: { id },
    });
  }
}
