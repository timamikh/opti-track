import { FC, useState, useEffect } from 'react';
import { blogApi } from '../../utils/keystoneApi';
import { Post } from '../../types/blog';

interface ExperienceMetric {
  value: string;
  description: string;
  isHighlight?: boolean;
}

interface ExperienceData {
  indicators: ExperienceMetric[];
  results: ExperienceMetric[];
}

const ExperienceSection: FC = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Данные показателей и результатов
  const experienceData: ExperienceData = {
    indicators: [
      { value: '>1000', description: 'операций приема и отгрузки в сутки', isHighlight: true },
      { value: '>300', description: 'перевозчиков', isHighlight: true },
      { value: '>4000', description: 'точек доставки и загрузки', isHighlight: true },
      { value: '>5000', description: 'частных контрагентов', isHighlight: true },
      { value: '>1000', description: 'поставщиков', isHighlight: true },
      { value: '50', description: 'складов' },
      { value: '1660', description: 'маршрутов' },
      { value: '>2000', description: 'активных пользователей системы', isHighlight: true }
    ],
    results: [
      { value: '>15', description: 'лет в эксплуатации', isHighlight: true },
      { value: '0', description: 'остановок системы дольше 4 часов' },
      { value: '>20', description: 'кастомных модулей', isHighlight: true },
      { value: 'до 10', description: 'лет хранения данных в системе' },
      { value: '>100', description: 'интеграций с внутренними и внешними системами', isHighlight: true },
      { value: '3', description: 'месяца от подписания до запуска первой версии' },
      { value: '99,5%', description: 'средний SLA' },
      { value: '100%', description: 'реализованных в срок проектов' }
    ]
  };

  // Загрузка статей блога
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await blogApi.getPosts();
        setBlogPosts(posts.filter((post: Post) => post.status === 'published').slice(0, 6));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (blogPosts.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(blogPosts.length / 3));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [blogPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(blogPosts.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(blogPosts.length / 3)) % Math.ceil(blogPosts.length / 3));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0E111B] to-[#1A1D2E]">
      <div className="container-custom">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="section-title text-white mb-4">
            Мы гордимся нашим опытом
          </h2>
        </div>

        {/* Показатели и результаты */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Показатели */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-white bg-white/10 rounded-full py-4 px-12 inline-block">
                Показатели
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experienceData.indicators.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center h-24 flex flex-col justify-center transition-all duration-300 hover:bg-white/15"
                >
                  <div className="text-3xl font-bold mb-2 text-[#2A84D3] font-button">
                    {metric.value}
                  </div>
                  <div className="text-sm text-white/80 leading-tight">
                    {metric.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Результаты */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-white bg-white/10 rounded-full py-4 px-12 inline-block">
                Результаты
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experienceData.results.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center h-24 flex flex-col justify-center transition-all duration-300 hover:bg-white/15"
                >
                  <div className="text-3xl font-bold mb-2 text-[#2A84D3] font-button">
                    {metric.value}
                  </div>
                  <div className="text-sm text-white/80 leading-tight">
                    {metric.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Секция блога */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-heading text-white mb-8">
            Наши кейсы и статьи
          </h3>
        </div>

        {/* Карусель статей */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2A84D3]"></div>
          </div>
        ) : blogPosts.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(blogPosts.length / 3) }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blogPosts.slice(slideIndex * 3, slideIndex * 3 + 3).map((post) => (
                        <div
                          key={post.id}
                          className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                        >
                          {post.imageUrl && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              {post.category && (
                                <span className="text-xs bg-[#2A84D3] text-white px-3 py-1 rounded-full">
                                  {post.category.name}
                                </span>
                              )}
                              {post.publishDate && (
                                <span className="text-xs text-white/60">
                                  {formatDate(post.publishDate)}
                                </span>
                              )}
                            </div>
                            <h4 className="text-lg font-heading text-white mb-3 line-clamp-2 group-hover:text-[#FFFF00] transition-colors">
                              {post.title}
                            </h4>
                            {post.author && (
                              <p className="text-sm text-white/70">
                                {post.author.name}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Навигация карусели */}
            {Math.ceil(blogPosts.length / 3) > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Индикаторы */}
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: Math.ceil(blogPosts.length / 3) }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-[#2A84D3]' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center text-white/60">
            <p>Статьи блога пока недоступны</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection; 