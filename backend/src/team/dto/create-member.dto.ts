export class CreateMemberDto {
  name: string;
  role: string;
  img: string;
  stack: string; // Comma-separated list
  github?: string;
  email?: string;
  linkedin?: string;
}
