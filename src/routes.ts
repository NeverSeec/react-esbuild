const routes = {
    home: () => import('./pages/Home'),
    about: () => import('./pages/About'),
};

export type RouteName = keyof typeof routes;

export const navigate = async (route: RouteName) => {
    try {
        return  await routes[route]();
    } catch (error) {
        console.log(error)
    }
};

export const preloadRoute = (route: RouteName) => {
    return routes[route]();
};

export default routes;
