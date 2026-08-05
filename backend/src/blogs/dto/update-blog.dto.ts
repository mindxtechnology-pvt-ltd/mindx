export class UpdateBlogDto {
  title?: string;
  category?: string;
  readTime?: string;
  desc?: string;
  author?: string;
  content?: string; // JSON string of block objects { type, text }
}
