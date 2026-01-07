import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin: 0;
  color: #1a1a1a;
  font-size: 28px;
  font-weight: 600;
`;

export const Filters = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .ant-input-affix-wrapper {
    border-radius: 8px;
  }

  .ant-btn {
    border-radius: 8px;
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .ant-table {
    font-size: 14px;
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f9f9f9;
  }

  .ant-pagination {
    padding: 16px;
    margin: 0;
  }
`;

export const NameCell = styled.span`
  font-weight: 500;
  color: #1a1a1a;
`;

export const UrlCell = styled.div`
  max-width: 300px;

  a {
    color: #1890ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DescriptionCell = styled.div`
  max-width: 200px;
  color: #666;
`;

export const ActionsCell = styled.div`
  display: flex;
  gap: 8px;

  .ant-btn-link {
    padding: 0;
    height: auto;
  }
`;
