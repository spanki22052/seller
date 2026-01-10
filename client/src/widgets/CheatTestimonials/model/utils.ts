import { DigisellerReview, Testimonial } from "./types";

/**
 * Преобразует отзыв из Digiseller API в формат Testimonial
 */
export function digisellerReviewToTestimonial(review: DigisellerReview): Testimonial {
  // Определяем рейтинг на основе типа отзыва
  const rating = review.type === "good" ? 5 : review.type === "bad" ? 1 : 3;

  // Используем invoice_id как уникальный идентификатор
  const id = `digiseller-${review.invoice_id}`;

  // Используем дату отзыва
  const date = review.dateUtc;

  // Создаем имя пользователя из invoice_id (анонимизируем)
  const name = `User ${review.invoice_id.toString().slice(-4)}`;

  // Сохраняем оригинальные данные для правильного отображения
  const originalInfo = review.info;
  const originalComment = review.comment;

  return {
    id,
    name,
    rating,
    text: originalInfo, // Основной текст отзыва
    comment: originalComment, // Ответ поддержки отдельно
    date,
    // Не указываем игру, так как отзывы специфичны для продукта
  };
}

/**
 * Преобразует массив отзывов Digiseller в массив Testimonial
 */
export function transformDigisellerReviews(reviews: DigisellerReview[]): Testimonial[] {
  return reviews.map(digisellerReviewToTestimonial);
}
