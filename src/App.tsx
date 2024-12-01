import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useLocation } from 'react-router-dom';
import { IStaticMethods } from 'flyonui/flyonui';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const loadFlyonui = async () => {
      await import('flyonui/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, [location.pathname]);

  return (
      <AppRoutes/>
  );
}