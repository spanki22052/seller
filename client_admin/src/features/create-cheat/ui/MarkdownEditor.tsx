import { useRef, useEffect, useState, useCallback } from "react";
// @ts-expect-error - markdown-it types not available
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Popover, ColorPicker, Menu } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";
import * as Styled from "./styled";

const mdParser = new MarkdownIt({
  html: true, // Разрешаем HTML теги
  breaks: true, // Преобразуем переносы строк в <br>
  linkify: true, // Автоматически преобразуем ссылки
});

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({
  value = "",
  onChange,
  placeholder = "Введите текст с форматированием Markdown...",
}: MarkdownEditorProps) {
  const editorRef = useRef<MdEditor>(null);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLDivElement>(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [hasSelection, setHasSelection] = useState(false);

  const handleEditorChange = ({ text }: { text: string; html: string }) => {
    onChange?.(text);
  };

  const getEditorElement = useCallback(() => {
    return editorWrapperRef.current?.querySelector(".rc-md-editor") as HTMLElement | null;
  }, []);

  const getTextarea = useCallback(() => {
    return editorWrapperRef.current?.querySelector("textarea") as HTMLTextAreaElement | null;
  }, []);

  const applyTextColor = useCallback(
    (color: string) => {
      const textarea = getTextarea();

      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = value || "";
      const selectedText = currentValue.substring(start, end);

      if (!selectedText || start === end) {
        // Если текст не выделен, показываем подсказку
        setColorPickerOpen(false);
        return;
      }

      // Wrap selected text with HTML span tag with color style
      const colorHex = color.replace("#", "");
      const beforeText = currentValue.substring(0, start);
      const afterText = currentValue.substring(end);
      const wrappedText = `<span style="color: #${colorHex}">${selectedText}</span>`;
      const newValue = beforeText + wrappedText + afterText;

      onChange?.(newValue);
      setColorPickerOpen(false);
      setContextMenuVisible(false);

      // Restore cursor position after the wrapped text
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + wrappedText.length;
        textarea.setSelectionRange(newPosition, newPosition);
        setHasSelection(false);
      }, 0);
    },
    [value, onChange, getTextarea]
  );

  const handleColorChange = useCallback(
    (color: any) => {
      const hexColor = color.toHexString();
      setSelectedColor(hexColor);
      // Применяем цвет только если есть выделение
      if (hasSelection) {
        applyTextColor(hexColor);
      }
    },
    [applyTextColor, hasSelection]
  );

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const textarea = getTextarea();
      
      if (textarea && (textarea.contains(target) || target === textarea)) {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setContextMenuVisible(true);
      }
    },
    [getTextarea]
  );

  useEffect(() => {
    // Add custom color button to toolbar after editor mounts
    const addColorButton = () => {
      if (colorButtonRef.current) {
        const editorElement = getEditorElement();
        if (editorElement) {
          const navigation = editorElement.querySelector(".rc-md-navigation");
          if (navigation && !navigation.querySelector(".custom-color-button")) {
            navigation.appendChild(colorButtonRef.current);
          }
        }
      }
    };

    const timer = setTimeout(addColorButton, 100);
    return () => clearTimeout(timer);
  }, [getEditorElement]);

  useEffect(() => {
    // Add context menu listener
    const editorElement = getEditorElement();
    if (editorElement) {
      editorElement.addEventListener("contextmenu", handleContextMenu);
      return () => {
        editorElement.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, [handleContextMenu, getEditorElement]);

  useEffect(() => {
    // Track text selection
    const textarea = getTextarea();
    if (!textarea) return;

    const handleSelectionChange = () => {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      setHasSelection(start !== end && end - start > 0);
    };

    // Отслеживаем выделение текста через различные события
    textarea.addEventListener("mouseup", handleSelectionChange);
    textarea.addEventListener("keyup", handleSelectionChange);
    textarea.addEventListener("select", handleSelectionChange);
    textarea.addEventListener("focus", handleSelectionChange);
    
    // Также отслеживаем через document для более точного определения
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      textarea.removeEventListener("mouseup", handleSelectionChange);
      textarea.removeEventListener("keyup", handleSelectionChange);
      textarea.removeEventListener("select", handleSelectionChange);
      textarea.removeEventListener("focus", handleSelectionChange);
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [getTextarea, value]);

  const colorPickerContent = (
    <div style={{ padding: 8 }}>
      <ColorPicker
        value={selectedColor}
        onChange={handleColorChange}
        showText
        presets={[
          {
            label: "Основные цвета",
            colors: [
              "#000000",
              "#FFFFFF",
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FFFF00",
              "#FF00FF",
              "#00FFFF",
            ],
          },
          {
            label: "Пастельные",
            colors: [
              "#FFB6C1",
              "#FFA07A",
              "#98D8C8",
              "#F7DC6F",
              "#BB8FCE",
              "#85C1E2",
            ],
          },
        ]}
      />
    </div>
  );

  const handleContextMenuColorClick = useCallback(() => {
    const textarea = getTextarea();
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      if (start !== end && end - start > 0) {
        setColorPickerOpen(true);
        setContextMenuVisible(false);
      } else {
        setContextMenuVisible(false);
      }
    }
  }, [getTextarea]);

  const contextMenuItems = [
    {
      key: "textColor",
      icon: <BgColorsOutlined />,
      label: "Цвет текста",
      onClick: handleContextMenuColorClick,
    },
  ];

  return (
    <Styled.MarkdownEditorWrapper>
      <div ref={editorWrapperRef}>
        <div
          ref={colorButtonRef}
          className="custom-color-button"
          style={{
            display: "inline-block",
            marginLeft: 8,
          }}
        >
          <Popover
            content={colorPickerContent}
            title={hasSelection ? "Выберите цвет для выделенного текста" : "Выделите текст для применения цвета"}
            trigger="click"
            open={colorPickerOpen && !contextMenuVisible}
            onOpenChange={(open) => {
              if (open && !hasSelection) {
                // Если открываем без выделения, показываем подсказку
                setTimeout(() => setColorPickerOpen(false), 2000);
              } else {
                setColorPickerOpen(open);
              }
            }}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
          >
            <button
              type="button"
              style={{
                border: "none",
                background: hasSelection ? "#e6f7ff" : "transparent",
                cursor: hasSelection ? "pointer" : "not-allowed",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: hasSelection ? "#1890ff" : "inherit",
                borderRadius: 4,
                opacity: hasSelection ? 1 : 0.6,
                transition: "all 0.2s ease",
              }}
              title={hasSelection ? "Применить цвет к выделенному тексту" : "Выделите текст для применения цвета"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (hasSelection) {
                  setColorPickerOpen(true);
                }
              }}
            >
              <BgColorsOutlined style={{ fontSize: 16 }} />
            </button>
          </Popover>
        </div>

        {contextMenuVisible && (
          <>
            <div
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 999,
              }}
              onClick={() => setContextMenuVisible(false)}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenuVisible(false);
              }}
            />
            <div
              style={{
                position: "fixed",
                left: contextMenuPosition.x,
                top: contextMenuPosition.y,
                zIndex: 1000,
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Menu
                items={contextMenuItems}
                onClick={() => setContextMenuVisible(false)}
              />
            </div>
          </>
        )}

        <MdEditor
          ref={editorRef}
          value={value}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          placeholder={placeholder}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
            },
            canView: {
              menu: true,
              md: true,
              html: true,
              fullScreen: true,
              hideMenu: false,
            },
          }}
        />
      </div>
    </Styled.MarkdownEditorWrapper>
  );
}

