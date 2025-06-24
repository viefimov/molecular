import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { CatalogView } from '@/app-public/catalog/CatalogView.tsx';

import { ProductList } from "demoApp/ProductList";

const routes = createBrowserRouter([
  { index: true, element: <CatalogView di={{ ProductList }} /> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>
);
