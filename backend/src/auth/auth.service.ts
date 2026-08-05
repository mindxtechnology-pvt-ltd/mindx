import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // 1. Seed Admin
    const adminCount = await this.prisma.admin.count();
    if (adminCount === 0) {
      const defaultEmail = 'admin@mindxtechnology.com';
      const defaultPassword = 'AdminSecurePassword2026!';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await this.prisma.admin.create({
        data: {
          email: defaultEmail,
          password: hashedPassword,
        },
      });
      console.log('DEFAULT ADMIN SEEDED');
    }

    // 2. Seed Team Members
    const teamCount = await this.prisma.teamMember.count();
    if (teamCount === 0) {
      const defaultTeam = [
        {
          name: 'Nawaraj Karki',
          role: 'Founder',
          img: '/images/nawaraj_karki.png',
          stack: 'React, Node.js, AWS',
          github: 'https://github.com/Nawarajkarki30',
          email: 'nawarajkarki803@gmail.com',
        },
        {
          name: 'Prabesh Bhandari',
          role: 'Co-Founder',
          img: '/images/prabesh_bhandari.jpg',
          stack: 'MongoDB, Express, React',
          github: 'https://github.com/PrabeshBhandari7',
          email: 'prabeshb635@gmail.com',
        },
        {
          name: 'Bibash Pandey',
          role: 'Engineering Lead & CTO',
          img: '/images/bibash_pandey.jpg',
          stack: 'Django, AI / ML, Data Analytics',
          github: 'https://github.com/bibash007',
          email: 'bibashpandey46@gmail.com',
          linkedin: 'https://www.linkedin.com/in/bibash-pandey-b53888258',
        },
        {
          name: 'Tanuja Subedi',
          role: 'Marketing Head & QA Lead',
          img: '/images/tanuja_subedi.jpg',
          stack: 'Marketing, QA & Testing, Debugging',
          github: 'https://github.com/tanuja737',
          email: 'tanujasubedi2063@gmail.com',
        },
      ];

      for (const member of defaultTeam) {
        await this.prisma.teamMember.create({ data: member });
      }
      console.log('DEFAULT TEAM MEMBERS SEEDED');
    }

    // 3. Seed Blog Posts
    const blogCount = await this.prisma.blogPost.count();
    if (blogCount === 0) {
      const defaultBlogs = [
        {
          title: 'The Future of AI in SaaS',
          slug: 'the-future-of-ai-in-saas',
          date: 'October 12, 2026',
          category: 'Engineering Deep Dive',
          readTime: '6 min read',
          desc: 'How autonomous LLM workflows and multi-agent RAG pipelines are transforming enterprise Software-as-a-Service architecture from static CRUD interfaces to proactive intelligent assistants.',
          author: 'Nawaraj Karki',
          content: JSON.stringify([
            { type: 'p', text: 'For the past three years, the SaaS ecosystem has been saturated with basic "AI Wrappers"—superficial user interfaces layered over raw OpenAI completion endpoints. As we navigate 2026, enterprise buyers and consumers are no longer wowed by basic text generation. They demand autonomous agentic workflows capable of multi-step execution.' },
            { type: 'h2', text: 'The Evolution from Generation to Autonomous Execution' },
            { type: 'p', text: 'Modern enterprise AI architecture requires a fundamental paradigm shift in data orchestration. Rather than simply forwarding prompt payloads to an LLM, we must construct resilient RAG (Retrieval-Augmented Generation) data pipelines allowing models to securely index and verify proprietary databases before executing state modifications.' },
            { type: 'p', text: 'At Mindx Technologies, our engineering team recently deployed an autonomous logistical routing system for a B2B enterprise partner. The AI agent does not merely suggest freight paths; it actively interrogates carrier APIs, negotiates real-time freight pricing, and executes dispatch contracts autonomously.' },
            { type: 'h2', text: 'Why Vector Databases & Embeddings Are Non-Negotiable' },
            { type: 'p', text: 'Integrating AI features into multi-tenant SaaS applications without dedicated vector storage (such as Pinecone, Milvus, or pgvector) introduces severe architectural bottlenecks. High-dimensional vector embeddings are vital for real-time semantic context retrieval without triggering token explosion or unacceptable latency spikes.' }
          ]),
        },
        {
          title: 'Migrating from Legacy Architectures to Next.js',
          slug: 'migrating-from-legacy-architectures-to-next-js',
          date: 'September 28, 2026',
          category: 'Web Systems',
          readTime: '8 min read',
          desc: 'A complete technical case study detailing our incremental migration strategy from monolithic PHP and legacy single-page apps to high-concurrency Next.js App Router applications.',
          author: 'Prabesh Bhandari',
          content: JSON.stringify([
            { type: 'p', text: 'Migrating a legacy monolith is one of the most challenging tasks for any engineering team. In this case study, we outline the roadmap of how we transitioned an enterprise SaaS app from PHP/Laravel and a jQuery frontend to Next.js.' },
            { type: 'h2', text: 'The Incremental Migration Strategy' },
            { type: 'p', text: 'A common mistake is trying a "big bang" rewrite. Instead, we used the Strangler Fig Pattern, routing new feature pages to the Next.js application while proxying old routes back to the Laravel app. This allowed us to keep deploying to production weekly without downtime.' }
          ]),
        },
        {
          title: 'Why Cognitive Load & Mobile-First Design Still Dictate Conversion',
          slug: 'why-cognitive-load-mobile-first-design-still-dictate-conversion',
          date: 'September 15, 2026',
          category: 'UI/UX Systems',
          readTime: '5 min read',
          desc: 'Examining the psychological principles of micro-interactions, responsive typography, and progressive disclosure in enterprise B2B software interfaces.',
          author: 'Design Systems Team',
          content: JSON.stringify([
            { type: 'p', text: 'Design is not just how it looks; it is how it works. In B2B SaaS, reducing cognitive load is directly tied to user retention and conversions.' },
            { type: 'h2', text: 'Fitts\'s Law and Interface Design' },
            { type: 'p', text: 'We apply Fitts\'s Law to size and space interface elements appropriately. Crucial call-to-actions must be easily reachable on mobile devices, minimizing thumb strain and speeding up task completion.' }
          ]),
        },
        {
          title: 'Scaling Distributed Node.js Microservices to 10M Requests',
          slug: 'scaling-distributed-node-js-microservices-to-10m-requests',
          date: 'August 30, 2026',
          category: 'Cloud Infrastructure',
          readTime: '10 min read',
          desc: 'Architectural lessons learned deploying Kubernetes clusters, Redis caching layers, and asynchronous message queues to handle extreme burst traffic reliably.',
          author: 'Nawaraj Karki',
          content: JSON.stringify([
            { type: 'p', text: 'Handling 10 million requests daily requires a scale-out architecture. A single node process will quickly saturate its single CPU core, leading to timeouts.' },
            { type: 'h2', text: 'Deploying Redis and BullMQ' },
            { type: 'p', text: 'By offloading heavy computations and notification tasks to background queues powered by BullMQ and Redis, we kept our primary Express/NestJS APIs incredibly responsive.' }
          ]),
        },
      ];

      for (const blog of defaultBlogs) {
        await this.prisma.blogPost.create({ data: blog });
      }
      console.log('DEFAULT BLOG POSTS SEEDED');
    }
  }

  async login(loginDto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: loginDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email };
    return {
      access_token: this.jwtService.sign(payload),
      email: admin.email,
    };
  }
}
