import styled from "styled-components";
import { MEDIA_QUERIES, SPACING } from "@/shared/lib/responsive";

export const Container = styled.div({
  width: "100%",
  maxWidth: 1400,
  margin: "0 auto",
  padding: SPACING.lg,
  [MEDIA_QUERIES.md]: {
    padding: SPACING.md,
    maxWidth: 1200,
  },
  [MEDIA_QUERIES.sm]: {
    padding: SPACING.sm,
    maxWidth: "100%",
  },
  [MEDIA_QUERIES.xs]: {
    padding: SPACING.xs,
    maxWidth: "100%",
  },
});

export const SettingsCard = styled.div({
  backgroundColor: "#fff",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  padding: SPACING.xl,
  [MEDIA_QUERIES.md]: {
    padding: SPACING.lg,
    borderRadius: 6,
  },
  [MEDIA_QUERIES.sm]: {
    padding: SPACING.md,
    borderRadius: 4,
  },
  [MEDIA_QUERIES.xs]: {
    padding: SPACING.sm,
    borderRadius: 4,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
  },

  // Card styles
  "& .ant-card": {
    borderRadius: 8,
    boxShadow: "none",
    border: "1px solid #f0f0f0",
    [MEDIA_QUERIES.sm]: {
      borderRadius: 6,
    },
    [MEDIA_QUERIES.xs]: {
      borderRadius: 4,
      border: "none",
      backgroundColor: "transparent",
    },
  },

  "& .ant-card-head": {
    [MEDIA_QUERIES.xs]: {
      padding: `${SPACING.sm}px ${SPACING.xs}px`,
      minHeight: 48,
    },
    "& .ant-card-head-title": {
      [MEDIA_QUERIES.xs]: {
        fontSize: 16,
        fontWeight: 600,
      },
    },
  },

  "& .ant-card-body": {
    [MEDIA_QUERIES.xs]: {
      padding: `${SPACING.sm}px ${SPACING.xs}px`,
    },
  },

  // Tabs styles - make them responsive
  "& .ant-tabs": {
    [MEDIA_QUERIES.xs]: {
      margin: 0,
    },

    "&.responsive-tabs": {
      "&.ant-tabs-card": {
        "& .ant-tabs-nav": {
          "& .ant-tabs-nav-list": {
            "& .ant-tabs-tab": {
              [MEDIA_QUERIES.xs]: {
                margin: 0,
                borderRadius: 0,
                backgroundColor: "#f5f5f5",
                border: "1px solid #d9d9d9",

                "&.ant-tabs-tab-active": {
                  backgroundColor: "#fff",
                  borderBottomColor: "#fff",
                },

                "&:first-child": {
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                },

                "&:last-child": {
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },

                "& + .ant-tabs-tab": {
                  marginLeft: -1,
                },
              },
            },
          },
        },

        "& .ant-tabs-content-holder": {
          "& .ant-tabs-content": {
            border: "1px solid #d9d9d9",
            borderTop: "none",
            [MEDIA_QUERIES.xs]: {
              borderRadius: "0 0 4px 4px",
            },
          },
        },
      },
    },

    "& .ant-tabs-nav": {
      marginBottom: 0,
      [MEDIA_QUERIES.xs]: {
        marginBottom: SPACING.xs,
      },

      "& .ant-tabs-nav-wrap": {
        "& .ant-tabs-nav-list": {
          [MEDIA_QUERIES.xs]: {
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          "& .ant-tabs-tab": {
            flexShrink: 0,
            whiteSpace: "nowrap",
            [MEDIA_QUERIES.xs]: {
              padding: `${SPACING.xs}px ${SPACING.sm}px`,
              fontSize: 13,
              marginRight: 0,

              "& .ant-tabs-tab-btn": {
                fontSize: 13,
                fontWeight: 500,
              },
            },
          },
        },
      },
    },

    "& .ant-tabs-content-holder": {
      "& .ant-tabs-content": {
        "& .ant-tabs-tabpane": {
          [MEDIA_QUERIES.xs]: {
            padding: `${SPACING.sm}px 0`,
          },
        },
      },
    },
  },

  // Form styles
  "& .ant-form-item": {
    marginBottom: SPACING.lg,
    [MEDIA_QUERIES.sm]: {
      marginBottom: SPACING.md,
    },
    [MEDIA_QUERIES.xs]: {
      marginBottom: SPACING.sm,
    },
  },

  "& .ant-form-item-label": {
    paddingBottom: SPACING.xs,
    [MEDIA_QUERIES.xs]: {
      paddingBottom: SPACING.xs / 2,
    },
    "& > label": {
      fontSize: 14,
      fontWeight: 500,
      color: "#262626",
      [MEDIA_QUERIES.xs]: {
        fontSize: 13,
        fontWeight: 600,
      },
    },
  },

  "& .ant-form-item-control": {
    "& .ant-form-item-control-input": {
      "& .ant-form-item-control-input-content": {
        "& .ant-input, & .ant-input-disabled, & .ant-select-selector, & .ant-picker":
          {
            borderRadius: 6,
            [MEDIA_QUERIES.xs]: {
              borderRadius: 4,
              fontSize: 14,
            },
          },
      },
    },
  },

  // Input styles
  "& .ant-input, & .ant-input-disabled": {
    borderRadius: 6,
    [MEDIA_QUERIES.xs]: {
      borderRadius: 4,
      fontSize: 14,
      padding: "6px 11px",
    },
  },

  "& .ant-select-selector": {
    borderRadius: 6,
    [MEDIA_QUERIES.xs]: {
      borderRadius: 4,
      minHeight: 36,
    },
  },

  // Button styles
  "& .ant-btn": {
    borderRadius: 6,
    [MEDIA_QUERIES.xs]: {
      borderRadius: 4,
      height: 36,
      fontSize: 14,
      padding: "0 16px",
    },
  },

  // Media elements
  "& video, & img": {
    maxWidth: "100%",
    height: "auto",
    borderRadius: 8,
    [MEDIA_QUERIES.xs]: {
      borderRadius: 4,
    },
  },

  // List styles for games
  "& .ant-list-item": {
    [MEDIA_QUERIES.xs]: {
      padding: `${SPACING.sm}px ${SPACING.xs}px`,
    },
  },

  "& .ant-list-item-meta": {
    "& .ant-list-item-meta-avatar": {
      [MEDIA_QUERIES.xs]: {
        marginRight: SPACING.sm,
      },
      "& .ant-avatar": {
        [MEDIA_QUERIES.xs]: {
          width: 48,
          height: 48,
        },
      },
    },

    "& .ant-list-item-meta-title": {
      [MEDIA_QUERIES.xs]: {
        marginBottom: 2,
        fontSize: 14,
        fontWeight: 500,
      },
    },

    "& .ant-list-item-meta-description": {
      [MEDIA_QUERIES.xs]: {
        fontSize: 12,
      },
    },
  },

  "& .ant-list-item-action": {
    [MEDIA_QUERIES.xs]: {
      marginLeft: SPACING.xs,
      "& li": {
        "& .ant-btn": {
          height: 32,
          width: 32,
          padding: 0,
          fontSize: 12,
        },
      },
    },
  },

  // Table styles
  "& .ant-table": {
    [MEDIA_QUERIES.xs]: {
      fontSize: 12,
    },
    "& .ant-table-thead > tr > th": {
      [MEDIA_QUERIES.xs]: {
        padding: "8px 4px",
        fontSize: 12,
      },
    },
    "& .ant-table-tbody > tr > td": {
      [MEDIA_QUERIES.xs]: {
        padding: "8px 4px",
        fontSize: 12,
      },
    },
  },

  // Modal styles
  "& .ant-modal": {
    [MEDIA_QUERIES.xs]: {
      margin: SPACING.xs,
      width: `calc(100vw - ${SPACING.sm * 2}px) !important`,
      maxWidth: "none",
    },
    "& .ant-modal-content": {
      [MEDIA_QUERIES.xs]: {
        borderRadius: 8,
      },
    },
    "& .ant-modal-body": {
      [MEDIA_QUERIES.xs]: {
        padding: SPACING.md,
      },
    },
  },
});
