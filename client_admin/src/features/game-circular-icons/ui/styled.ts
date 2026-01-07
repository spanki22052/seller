import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const AddGameSection = styled.div`
  margin-bottom: 24px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const GamesList = styled.div`
  .ant-list-item {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;

    &:hover {
      background-color: #fafafa;
    }

    .ant-list-item-meta {
      margin-bottom: 0;

      .ant-list-item-meta-avatar {
        margin-right: 16px;
      }

      .ant-list-item-meta-title {
        margin-bottom: 4px;
        font-weight: 500;
      }

      .ant-list-item-meta-description {
        color: #8c8c8c;
      }
    }

    .ant-list-item-action {
      margin-left: 16px;
    }
  }
`;

export const EmptyState = styled.div`
  margin-top: 24px;
`;
