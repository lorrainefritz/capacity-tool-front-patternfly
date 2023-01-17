import * as React from 'react';
import { Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { WorkersPage } from './pages/WorkersPage';
import { EnvironmentsDetailsPage } from './pages/EnvironmentsDetailsPage'
import { EnvironmentsSummaryPage } from './pages';
import { TeamsPage } from './pages';
import { DepartmentsPage } from './pages';
import { AlertsPage } from './pages';
import { WelcomePage as Home } from './pages'
let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
 
 
  {
    label: 'CapacityTool',
    routes: [
      {
        component: Home,
        exact: true,
        label: 'Home',
        path: '/',
        title: 'CapacityTool Home',
      },
      {
        component: WorkersPage,
        exact: true,
        label: 'Workers',
        path: '/workers',
        title: 'CapacityTool Workers',
      },
      {
        component: EnvironmentsDetailsPage,
        exact: true,
        label: 'Environments Details',
        path: '/environmentsDetails',
        title: 'CapacityTool Environments Details',
      },
      {
        component: EnvironmentsSummaryPage,
        exact: true,
        label: 'Environments Summary',
        path: '/environmentsSummary',
        title: 'CapacityTool Environments Summary',
      },
      {
        component: TeamsPage,
        exact: true,
        label: 'Teams',
        path: '/teams',
        title: 'CapacityTool Teams',
      },
      {
        component: DepartmentsPage,
        exact: true,
        label: 'Departments',
        path: '/departments',
        title: 'CapacityTool Departments',
      },
      {
        component: AlertsPage,
        exact: true,
        label: 'Alerts',
        path: '/alerts',
        title: 'CapacityTool Alerts',
      },
    ],
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
// may not be necessary if https://github.com/ReactTraining/react-router/issues/5210 is resolved
const useA11yRouteChange = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    routeFocusTimer = window.setTimeout(() => {
      const mainContainer = document.getElementById('primary-app-container');
      if (mainContainer) {
        mainContainer.focus();
      }
    }, 50);
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [pathname]);
};

const RouteWithTitleUpdates = ({ component: Component, title, ...rest }: IAppRoute) => {
  useA11yRouteChange();
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <Switch>
    {flattenedRoutes.map(({ path, exact, component, title }, idx) => (
      <RouteWithTitleUpdates path={path} exact={exact} component={component} key={idx} title={title} />
    ))}
    <PageNotFound title="404 Page Not Found" />
  </Switch>
);

export { AppRoutes, routes };
