export interface Author {
  id: string;
  name: string;
  email?: string;
  role?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  content?: {
    document: any; // Тип для документа Keystone
  };
  publishDate?: string;
  imageUrl?: string;
  author?: Author;
  category?: Category;
  tags?: Tag[];
}

export interface AuthResponse {
  sessionToken?: string;
  item?: Author;
  message?: string;
} 