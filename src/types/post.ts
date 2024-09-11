export interface PostProps {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    date: Date;
    keywords: string[];
    published: boolean | "preview";
  };
}
