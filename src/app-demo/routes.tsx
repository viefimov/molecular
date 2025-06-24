import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ProductList } from '@/app-demo/products/ui/ProductList.federated.tsx';

const routes = createBrowserRouter([
  { index: true, element: <ProductList onClick={console.log} /> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>
);
