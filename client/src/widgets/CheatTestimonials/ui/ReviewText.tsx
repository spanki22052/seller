import React from "react";
import styled from "styled-components";

interface ReviewTextProps {
  text: string;
  comment?: string;
}

// Функция для преобразования текста с ссылками в JSX элементы
function parseTextWithLinks(text: string) {
  // Регулярное выражение для поиска URL
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Разбиваем текст на части по URL
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    // Если часть является URL, делаем её ссылкой
    if (urlRegex.test(part)) {
      return (
        <Styled.Link key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </Styled.Link>
      );
    }
    // Иначе возвращаем как обычный текст, заменяя переносы строк на <br>
    return part.split('\n').map((line, lineIndex) => (
      <React.Fragment key={`${index}-${lineIndex}`}>
        {line}
        {lineIndex < part.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  });
}

export function ReviewText({ text, comment }: ReviewTextProps) {
  return (
    <Styled.Container>
      <Styled.ReviewContent>
        {parseTextWithLinks(text)}
      </Styled.ReviewContent>

      {comment && (
        <Styled.SupportReply>
          <Styled.ReplyHeader>Ответ поддержки:</Styled.ReplyHeader>
          <Styled.ReplyContent>
            {parseTextWithLinks(comment)}
          </Styled.ReplyContent>
        </Styled.SupportReply>
      )}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div({
    lineHeight: 1.6,
  }),

  ReviewContent: styled.div({
    marginBottom: "16px",
    fontStyle: "italic",
    position: "relative",
    "&::before": {
      content: '"\\201C"',
      fontSize: "3rem",
      color: "rgba(139, 92, 246, 0.2)",
      position: "absolute",
      top: "-10px",
      left: "-15px",
      lineHeight: 1,
    },
  }),

  SupportReply: styled.div({
    borderLeft: "3px solid #8b5cf6",
    paddingLeft: "16px",
    marginTop: "16px",
    backgroundColor: "rgba(139, 92, 246, 0.05)",
    padding: "12px 16px",
    borderRadius: "8px",
  }),

  ReplyHeader: styled.div({
    fontWeight: 600,
    color: "#8b5cf6",
    marginBottom: "8px",
    fontSize: "0.9rem",
  }),

  ReplyContent: styled.div({
    color: "#b0b0b0",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  }),

  Link: styled.a({
    color: "#8b5cf6",
    textDecoration: "none",
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
      color: "#a855f7",
    },
  }),
};
