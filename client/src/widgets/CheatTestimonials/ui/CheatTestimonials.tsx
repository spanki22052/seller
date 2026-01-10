"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDigisellerReviews } from "../hooks/useDigisellerReviews";
import { transformDigisellerReviews } from "../model/utils";
import { testimonialsMock } from "../mocks/mocks";
import { TESTIMONIALS_CONFIG, STAR_RATING } from "../model/constants";
import { ReviewText } from "./ReviewText";
import * as Styled from "./styled";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface CheatTestimonialsProps {
  className?: string;
  sellerId?: string;
  cheatDigitId?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <Styled.Rating>
      {Array.from({ length: STAR_RATING.MAX_STARS }, (_, i) => (
        <span key={i} className="star">
          {i < rating ? STAR_RATING.FILLED_STAR : STAR_RATING.EMPTY_STAR}
        </span>
      ))}
    </Styled.Rating>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonialsMock)[0];
}) {
  return (
    <Styled.TestimonialCard>
      <Styled.TestimonialHeader>
        <Styled.Avatar>
          {testimonial.name.charAt(0).toUpperCase()}
        </Styled.Avatar>
        <Styled.UserInfo>
          <h4 className="name">{testimonial.name}</h4>
          {testimonial.game && <p className="game">{testimonial.game}</p>}
        </Styled.UserInfo>
      </Styled.TestimonialHeader>

      <StarRating rating={testimonial.rating} />

      <ReviewText text={testimonial.text} comment={testimonial.comment} />

      <Styled.TestimonialDate>
        {testimonial.date.replace(/:\d{2}$/, "")}
      </Styled.TestimonialDate>
    </Styled.TestimonialCard>
  );
}

export function CheatTestimonials({
  className,
  sellerId,
  cheatDigitId,
}: CheatTestimonialsProps) {
  // Получаем отзывы из Digiseller API
  const { data: digisellerReviews = [], isLoading } = useDigisellerReviews(
    sellerId,
    cheatDigitId,
    !!sellerId && !!cheatDigitId
  );

  // Преобразуем отзывы в формат Testimonial
  const realTestimonials = transformDigisellerReviews(digisellerReviews);

  // Используем реальные отзывы если они есть, иначе моки
  const testimonials =
    realTestimonials.length > 0 ? realTestimonials : testimonialsMock;

  // Проверяем, есть ли реальные отзывы
  const hasRealReviews = realTestimonials.length > 0;
  const hasCheatDigitId = !!cheatDigitId;

  return (
    <Styled.Container className={className}>
      <Styled.Content>
        <Styled.Header>
          <h2>Отзывы наших пользователей</h2>
        </Styled.Header>

        {!hasCheatDigitId ? (
          <Styled.NoReviewsMessage>
            <div>
              <h3>Отзывы пока недоступны</h3>
              <p>Отзывы для этого продукта скоро появятся</p>
            </div>
          </Styled.NoReviewsMessage>
        ) : isLoading ? (
          <Styled.LoadingMessage>
            <div>Загрузка отзывов...</div>
          </Styled.LoadingMessage>
        ) : !hasRealReviews ? (
          <Styled.NoReviewsMessage>
            <div>
              <h3>Отзывы пока недоступны</h3>
              <p>Отзывы для этого продукта скоро появятся</p>
            </div>
          </Styled.NoReviewsMessage>
        ) : (
          <Styled.CarouselWrapper>
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={TESTIMONIALS_CONFIG.SPACE_BETWEEN}
              slidesPerView={TESTIMONIALS_CONFIG.SLIDES_PER_VIEW}
              autoplay={{
                delay: TESTIMONIALS_CONFIG.AUTOPLAY_DELAY,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              breakpoints={TESTIMONIALS_CONFIG.BREAKPOINTS}
              loop={testimonials.length > 1}
              grabCursor={true}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Styled.CarouselWrapper>
        )}
      </Styled.Content>
    </Styled.Container>
  );
}
