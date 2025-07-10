import { FC, useState } from 'react';
import { ContactFormData, ModalType } from '@/types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

const ContactModal: FC<ContactModalProps> = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-bg-primary/80 flex items-center justify-center z-50">
      <div className="bg-bg-secondary p-8 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-2xl font-heading font-bold text-bg-primary mb-6">
          {type === 'demo' ? 'Запросить демо' : 'Связаться с экспертом'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-bg-primary mb-2">
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input-button text-text-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-bg-primary mb-2">
              Компания
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input-button text-text-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-bg-primary mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input-button text-text-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-bg-primary mb-2">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input-button text-text-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-bg-primary mb-2">
              Сообщение
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-input-button text-text-primary h-32 resize-none"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal; 