import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PlayCircleOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  TrademarkOutlined,
  TagOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useSidebar } from "../contexts/SidebarContext";
import { useAuth } from "@/shared/contexts/AuthContext";
import * as Styled from "./styled";

const { Sider } = Layout;

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { collapsed, setCollapsed } = useSidebar();
  const { logout, login } = useAuth();

  const menuItems = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: t("sidebar.home"),
    },
    {
      key: "/faq",
      icon: <QuestionCircleOutlined />,
      label: "FAQ",
    },
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: t("sidebar.dashboard"),
    },
    {
      key: "/games",
      icon: <PlayCircleOutlined />,
      label: t("sidebar.games"),
    },
    {
      key: "/cheats",
      icon: <ShoppingOutlined />,
      label: t("sidebar.cheats"),
    },
    {
      key: "/brands",
      icon: <TrademarkOutlined />,
      label: t("sidebar.brands"),
    },
    {
      key: "/categories",
      icon: <TagOutlined />,
      label: t("sidebar.categories"),
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: t("sidebar.settings"),
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.key)
  )?.key;

  return (
    <Styled.SiderWrapper>
      <Sider
        width={260}
        collapsed={collapsed}
        collapsedWidth={80}
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Styled.LogoContainer>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {!collapsed ? (
              <Styled.Logo>
                <Styled.LogoIcon>⚡</Styled.LogoIcon>
                <Styled.LogoText>{t("sidebar.adminPanel")}</Styled.LogoText>
              </Styled.Logo>
            ) : (
              <Styled.LogoCollapsed>
                <Styled.LogoIcon>⚡</Styled.LogoIcon>
              </Styled.LogoCollapsed>
            )}
          </motion.div>
        </Styled.LogoContainer>

        <Styled.MenuContainer>
          <Menu
            mode="inline"
            selectedKeys={selectedKey ? [selectedKey] : []}
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              border: "none",
              background: "transparent",
              padding: "16px 12px",
            }}
          />
        </Styled.MenuContainer>

        <Styled.Footer>
          <Styled.FooterContent>
            {login && !collapsed && (
              <Styled.FooterText $collapsed={collapsed}>
                {login}
              </Styled.FooterText>
            )}
            <Styled.LogoutButton
              onClick={handleLogout}
              $collapsed={collapsed}
              title={collapsed ? t("sidebar.logout") : undefined}
            >
              <LogoutOutlined />
              {!collapsed && <span>{t("sidebar.logout")}</span>}
            </Styled.LogoutButton>
            <Styled.CollapseButton
              onClick={() => setCollapsed(!collapsed)}
              $collapsed={collapsed}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Styled.CollapseButton>
          </Styled.FooterContent>
        </Styled.Footer>
      </Sider>
    </Styled.SiderWrapper>
  );
}
