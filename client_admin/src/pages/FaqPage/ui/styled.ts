import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin: 0;
  color: #1f2937;
  font-size: 24px;
  font-weight: 600;
`;

export const Filters = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const NameCell = styled.div`
  font-weight: 500;
  color: #1f2937;
  max-width: 300px;
  word-wrap: break-word;
`;

export const AnswerCell = styled.div`
  color: #6b7280;
  max-width: 400px;
  word-wrap: break-word;
  line-height: 1.5;
`;

export const ActionsCell = styled.div`
  display: flex;
  gap: 8px;
`;
