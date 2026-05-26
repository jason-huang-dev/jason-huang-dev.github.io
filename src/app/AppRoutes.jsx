import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { PageShell } from '../components/layout/PageShell';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProjectPage } from '../pages/ProjectPage';
import { WorkIndexPage } from '../pages/WorkIndexPage';

function RouteFocusManager() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;
    const main = document.getElementById('main-content');
    main?.focus();
  }, [location.pathname]);

  return null;
}

export function AppRoutes() {
  return (
    <PageShell>
      <RouteFocusManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkIndexPage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </PageShell>
  );
}
