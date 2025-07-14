interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface HistoryItem {
  id: string;
  period: string;
  description: string;
}

interface Client {
  id: string;
  name: string;
  logo: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  link: string;
}

export const advantages: Advantage[] = [
  {
    id: 'expertise',
    title: 'Глубокая функциональная экспертиза FMCG',
    description: 'Мы разрабатывали решения для всех функций FMCG — от производства до маркетинга. Это дало нам уникальную экспертизу, которой мы делимся с клиентами',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" /></svg>'
  },
  {
    id: 'approach',
    title: 'Комплексный подход',
    description: 'Мы создаём решения под ключ — от проектирования до интеграции и поддержки. Подстраиваемся под задачи каждого клиента',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>'
  },
  {
    id: 'partner',
    title: 'Надежный партнер для бизнеса',
    description: 'Мы тесно сотрудничаем с клиентами, решая задачи от технологий до стратегии. Нас считают долгосрочным партнёром, обеспечивающим стабильность и рост бизнеса. Некоторые решения мы поддерживаем уже более 12 лет',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg>'
  },
  {
    id: 'platform',
    title: 'Разрабатываем решения на собственной платформе',
    description: 'Используем свою инновационную платформу для эффективной разработки и минимизации ошибок, обеспечивая стабильность и безопасность кода. Следуем принципу "you build it — you run it", поэтому не срезаем углы',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>'
  }
];

export const historyItems: HistoryItem[] = [
  {
    id: 'history-1',
    period: '2009—2022',
    description: 'Компания сфокусирована на заказной разработке цифровых решений для крупнейших мировых FMCG-компаний'
  },
  {
    id: 'history-2',
    period: '2022',
    description: 'Выпуск собственной платформы для разработки цифровых решений ProSpace'
  },
  {
    id: 'history-3',
    period: '2023',
    description: 'Первый релиз нового коробочного решения ProSpace.Promo'
  },
  {
    id: 'history-4',
    period: '2025',
    description: 'Полный ренейминг компании SmartCom в ProSpace, новое название отражает нашу миссию, ценности и уникальность'
  }
];

export const clients: Client[] = [
  { id: 'client-1', name: 'Клиент 1', logo: '/images/clients/client1.png' },
  { id: 'client-2', name: 'Клиент 2', logo: '/images/clients/client2.png' },
  { id: 'client-3', name: 'Клиент 3', logo: '/images/clients/client3.png' },
  { id: 'client-4', name: 'Клиент 4', logo: '/images/clients/client4.png' },
  { id: 'client-5', name: 'Клиент 5', logo: '/images/clients/client5.png' },
  { id: 'client-6', name: 'Клиент 6', logo: '/images/clients/client6.png' },
  { id: 'client-7', name: 'Клиент 7', logo: '/images/clients/client7.png' },
  { id: 'client-8', name: 'Клиент 8', logo: '/images/clients/client8.png' }
];

export const products: Product[] = [
  {
    id: 'prospace-promo',
    title: 'ProSpace.Promo',
    description: 'Комплексное решение для управления промо-активностями и трейд-маркетингом',
    link: '/products/prospace-promo'
  },
  {
    id: 'prospace-platform',
    title: 'ProSpace.Platform',
    description: 'Инновационная платформа для быстрой и эффективной разработки цифровых решений',
    link: '/products/prospace-platform'
  },
  {
    id: 'prospace-datahub',
    title: 'ProSpace.DataHub',
    description: 'Платформа для управления данными и аналитики в реальном времени',
    link: '/products/prospace-datahub'
  },
  {
    id: 'gethired',
    title: 'GetHired',
    description: 'Решение для автоматизации HR-процессов и подбора персонала',
    link: '/products/gethired'
  },
  {
    id: 'optitrack',
    title: 'OptiTrack',
    description: 'Инновационная платформа для управления логистикой и транспортом',
    link: '/products/optitrack'
  }
]; 