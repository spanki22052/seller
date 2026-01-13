import styled from "styled-components";
import { Button } from "antd";
import { MEDIA_QUERIES, SPACING } from "@/shared/lib/responsive";

export const Container = styled.div`
  width: 100%;
`;

export const AddGameSection = styled.div`
  margin-bottom: ${SPACING.xl}px;

  ${MEDIA_QUERIES.sm} {
    margin-bottom: ${SPACING.lg}px;
  }

  ${MEDIA_QUERIES.xs} {
    margin-bottom: ${SPACING.md}px;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  ${MEDIA_QUERIES.sm} {
    gap: 6px;
  }

  ${MEDIA_QUERIES.xs} {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;

    .ant-btn {
      width: 100%;
      margin-top: 0;
    }
  }
`;

export const GamesList = styled.div`
  max-height: 500px;
  overflow-y: auto;

  ${MEDIA_QUERIES.md} {
    max-height: 400px;
  }

  ${MEDIA_QUERIES.sm} {
    max-height: 350px;
  }

  ${MEDIA_QUERIES.xs} {
    max-height: 300px;
  }

  .ant-list-item {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;

    ${MEDIA_QUERIES.sm} {
      padding: 14px;
    }

    ${MEDIA_QUERIES.xs} {
      padding: 12px;
    }

    &:hover {
      background-color: #fafafa;
    }

    .ant-list-item-meta {
      margin-bottom: 0;

      .ant-list-item-meta-avatar {
        margin-right: 16px;

        ${MEDIA_QUERIES.xs} {
          margin-right: 12px;

          .ant-avatar {
            width: 48px !important;
            height: 48px !important;
          }
        }
      }

      .ant-list-item-meta-title {
        margin-bottom: 4px;
        font-weight: 500;

        ${MEDIA_QUERIES.xs} {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 2px;
        }
      }

      .ant-list-item-meta-description {
        color: #8c8c8c;

        ${MEDIA_QUERIES.xs} {
          font-size: 12px;
        }
      }
    }

    .ant-list-item-action {
      margin-left: 16px;

      ${MEDIA_QUERIES.xs} {
        margin-left: 12px;

        li {
          .ant-btn {
            height: 32px;
            width: 32px;
            padding: 0;
            font-size: 12px;
            margin-left: 4px;
          }
        }
      }
    }
  }
`;

export const EmptyState = styled.div`
  margin-top: 24px;

  ${MEDIA_QUERIES.sm} {
    margin-top: 20px;
  }

  ${MEDIA_QUERIES.xs} {
    margin-top: 16px;

    .ant-avatar {
      width: 64px !important;
      height: 64px !important;
    }

    div {
      text-align: center;

      div:first-child {
        font-size: 14px;
        margin-bottom: 6px;
      }

      div:last-child {
        font-size: 12px;
      }
    }
  }
`;

export const CategorySection = styled.div`
  margin-bottom: 24px;

  ${MEDIA_QUERIES.sm} {
    margin-bottom: 20px;
  }

  ${MEDIA_QUERIES.xs} {
    margin-bottom: 16px;
  }
`;

export const SectionTitle = styled.h4`
  margin: 0 0 12px 0;
  color: #262626;
  font-size: 14px;
  font-weight: 600;

  ${MEDIA_QUERIES.xs} {
    font-size: 13px;
    margin-bottom: 8px;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${MEDIA_QUERIES.sm} {
    gap: 14px;
  }

  ${MEDIA_QUERIES.xs} {
    gap: 12px;
  }
`;

export const CategoryButtons = styled.div`
  margin-bottom: 16px;

  ${MEDIA_QUERIES.xs} {
    margin-bottom: 12px;
  }
`;

export const CategoryButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;

  ${MEDIA_QUERIES.sm} {
    gap: 6px;
  }

  ${MEDIA_QUERIES.xs} {
    gap: 6px;
    justify-content: center;

    .ant-btn {
      margin-bottom: 4px;
      white-space: nowrap;
      flex: 1;
      min-width: 80px;
      font-size: 12px;
      height: 32px;
      padding: 0 8px;
    }
  }
`;

export const BulkActions = styled.div`
  display: flex;
  gap: 4px;

  ${MEDIA_QUERIES.xs} {
    gap: 2px;
    justify-content: center;

    .ant-btn {
      flex: 1;
      font-size: 11px;
      height: 28px;
      padding: 0 6px;
    }
  }
`;

export const BulkAddButton = styled(Button)<{ disabled?: boolean }>`
  font-size: 12px;
  padding: 4px 8px;
  height: auto;
  min-height: 32px;
  opacity: ${props => props.disabled ? 0.5 : 1};

  ${MEDIA_QUERIES.xs} {
    font-size: 11px;
    padding: 2px 6px;
    min-height: 28px;
  }

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

  ${MEDIA_QUERIES.xs} {
    font-size: 11px;
    padding: 2px 6px;
    min-height: 28px;
  }

  &:hover {
    opacity: ${props => props.disabled ? 0.5 : 0.8};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  ${MEDIA_QUERIES.sm} {
    margin-bottom: 14px;
  }

  ${MEDIA_QUERIES.xs} {
    margin-bottom: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ClearAllButton = styled(Button)`
  font-size: 12px;

  ${MEDIA_QUERIES.xs} {
    font-size: 11px;
    height: 28px;
    padding: 0 8px;
  }
`;

export const CategorySelectWrapper = styled.div`
  margin-bottom: 16px;

  ${MEDIA_QUERIES.xs} {
    margin-bottom: 12px;
  }
`;
