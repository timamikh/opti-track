import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../../types';
import { blogApi } from '../../utils/keystoneApi';

const BlogPost: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [keystoneStatus, setKeystoneStatus] = useState<'running' | 'not_running' | 'checking'>('checking');

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        try {
          const postData = await blogApi.getPostBySlug(slug);
          setPost(postData);
          setKeystoneStatus('running');
          setError(null);
        } catch (err) {
          console.error('Error fetching post:', err);
          setKeystoneStatus('not_running');
          setError('Не удалось загрузить статью. Возможно, сервер KeystoneJS не запущен.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Функция для рендеринга содержимого поста
  const renderPostContent = () => {
    if (!post?.content?.document) return null;
    
    // Здесь должен быть код для рендеринга документа Keystone
    // В реальном приложении нужно использовать библиотеку для рендеринга документа
    return (
      <div className="prose max-w-none">
        <pre>{JSON.stringify(post.content.document, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Назад к блогу
      </Link>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          {keystoneStatus === 'not_running' && (
            <div className="mt-4">
              <p>Для работы блога необходимо запустить KeystoneJS CMS:</p>
              <pre className="bg-gray-800 text-white p-3 mt-2 rounded overflow-x-auto">
                cd keystone-cms<br />
                npm install<br />
                npm run dev
              </pre>
            </div>
          )}
        </div>
      )}
      
      {!loading && !error && !post && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">Статья не найдена</p>
        </div>
      )}
      
      {post && (
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-6">
            <div className="flex items-center mb-4">
              {post.category && (
                <Link 
                  to={`/blog/category/${post.category.slug}`}
                  className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded"
                >
                  {post.category.name}
                </Link>
              )}
              
              {post.status === 'published' && (
                <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  Опубликовано
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              {post.author && (
                <span className="mr-4">Автор: {post.author.name}</span>
              )}
              
              {post.publishDate && (
                <span>
                  Опубликовано: {new Date(post.publishDate).toLocaleDateString('ru-RU')}
                </span>
              )}
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase text-gray-500 mb-2">Теги:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag.id}
                      to={`/blog/tag/${tag.slug}`}
                      className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-6">
              {renderPostContent()}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default BlogPost; 