import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ErrorPage } from './pages/error/Error';
import { getTranslation } from '@/i18n'

const { t } = getTranslation('errorMessage')

interface RouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />,
    notFoundComponent: () => <ErrorPage error={new Error(t('404'))} />,
});
