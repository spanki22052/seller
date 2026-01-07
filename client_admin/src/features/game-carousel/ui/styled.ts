import styled from "styled-components";
import { Button } from "antd";

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
  max-height: 500px;
  overflow-y: auto;

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

export const CategorySection = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h4`
  margin: 0 0 12px 0;
  color: #262626;
  font-size: 14px;
  font-weight: 600;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CategoryButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BulkActions = styled.div`
  display: flex;
  gap: 4px;
`;

export const BulkAddButton = styled(Button)<{ disabled?: boolean }>`
  font-size: 12px;
  padding: 4px 8px;
  height: auto;
  min-height: 32px;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    opacity: ${props => props.disabled ? 0.5 : 0.8};
  }
`;

export const BulkRemoveButton = styled(Button)<{ disabled?: boolean }>`
  font-size: 12px;
  padding: 4px 8px;
  height: auto;
  min-height: 32px;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    opacity: ${props => props.disabled ? 0.5 : 0.8};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ClearAllButton = styled(Button)`
  font-size: 12px;
`;

export const CategorySelectWrapper = styled.div`
  margin-bottom: 16px;
`;
