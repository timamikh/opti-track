export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export type ModalType = 'demo' | 'expert';

export interface FunctionalModule {
  id: string;
  title: string;
  description: string;
  features: string[];
  angle: number;
}

export interface SolutionSlide {
  id: string;
  title: string;
  description: string;
  effect: string;
  image: string;
}

export interface Stage {
  id: string;
  number: number;
  title: string;
  duration: string;
  tasks: string[];
}

export interface Metric {
  id: string;
  value: string;
  description: string;
}

export interface AdditionalModule {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

// Экспорт типов блога
export * from './blog'; 