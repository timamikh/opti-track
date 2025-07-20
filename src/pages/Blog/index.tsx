import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { blogApi } from '../../utils/keystoneApi';

const Blog: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [keystoneStatus, setKeystoneStatus] = useState<'running' | 'not_running' | 'checking'>('checking');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Добавим проверку доступности KeystoneJS
        try {
          const postsData = await blogApi.getPosts();
          // Сортируем посты по дате публикации (от новых к старым)
          const sortedPosts = postsData ? [...postsData].sort((a, b) => {
            if (!a.publishDate) return 1;
            if (!b.publishDate) return -1;
            return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
          }) : [];
          setPosts(sortedPosts);
          setKeystoneStatus('running');
          setError(null);
        } catch (err) {
          console.error('Error fetching posts:', err);
          setKeystoneStatus('not_running');
          setError('Не удалось загрузить статьи блога. Возможно, сервер KeystoneJS не запущен.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Блог Opti-Track</h1>
      
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
      
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">Статьи еще не опубликованы</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {post.category?.name || 'Без категории'}
                </span>
                {post.status === 'published' && (
                  <span className="ml-2 text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                    Опубликовано
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {post.author?.name ? `Автор: ${post.author.name}` : 'Без автора'}
                {post.publishDate && ` • ${new Date(post.publishDate).toLocaleDateString('ru-RU')}`}
              </p>
              <Link 
                to={`/blog/${post.slug}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Читать далее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 