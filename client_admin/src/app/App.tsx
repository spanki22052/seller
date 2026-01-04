import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider, useAuth } from "@/shared/contexts/AuthContext";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";
import { Sidebar, SidebarProvider, useSidebar } from "@/widgets/Sidebar";
import { MainPage } from "@/pages/MainPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { GamesPage } from "@/pages/GamesPage";
import { CheatsPage } from "@/pages/CheatsPage";
import { CheatFormPage } from "@/pages/CheatFormPage";
import { SettingsPage } from "@/pages/SettingsPage";
import * as Styled from "./styled";

const { Content } = Layout;

function AppContent() {
  const { sidebarWidth, collapsed: isCollapsed } = useSidebar();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Styled.MainLayout
        $sidebarWidth={sidebarWidth}
        $isCollapsed={isCollapsed}
      >
        <Content>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games"
              element={
                <ProtectedRoute>
                  <GamesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cheats"
              element={
                <ProtectedRoute>
                  <CheatsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cheats/create"
              element={
                <ProtectedRoute>
                  <CheatFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cheats/edit/:id"
              element={
                <ProtectedRoute>
                  <CheatFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Content>
      </Styled.MainLayout>
    </Layout>
  );
}

function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <MainPage />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppContent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
