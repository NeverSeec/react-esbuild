import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { add, multiply, CONSTANT_VALUE } from '../utils/utils';
import { navigate, type RouteName } from '../routes';

const routes: RouteName[] = ['home', 'about']

export const App = () => {
    const [currentPage, setCurrentPage] = useState<RouteName>('home');
    const [CurrentComponent, setCurrentComponent] = useState<React.ComponentType | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPage = async () => {
            setLoading(true);
            try {
                const module = await navigate(currentPage);
                setCurrentComponent(() => module?.default || module ? Object.values(module)[0]: null);
            } catch (e) {
                console.log(e)
                setCurrentComponent(() => () => <div>Ошибка</div>);
            } finally {
                setLoading(false);
            }
        };

       void loadPage();
    }, [currentPage]);

    const result1 = add(5, 3);
    const result2 = multiply(4, 7);

    const onNavigation = (route: RouteName) => {
        setCurrentPage(route);
    };

    const onMouseEnter = (route: RouteName) => {
        import('../routes').then(({ preloadRoute }) => {
            preloadRoute(route);
        });
    };

    return (
        <div>
            <h1>React + TypeScript + ESBuild + Dynamic Routes</h1>
            <div>add(5, 3) = {result1}</div>
            <div>multiply(4, 7) = {result2}</div>
            <div>Constant: {CONSTANT_VALUE}</div>

            <nav>
                <h3>Навигация:</h3>
                {routes.map(route => (
                    <button
                        key={route}
                        onClick={() => onNavigation(route)}
                        onMouseEnter={() => onMouseEnter(route)}
                    >
                        {route.charAt(0).toUpperCase() + route.slice(1)}
                    </button>
                ))}
            </nav>

            <div>
                {loading ? (
                    <div>
                        <p>Загрузка {currentPage}</p>
                    </div>
                ) : CurrentComponent ? (
                    <CurrentComponent />
                ) : (
                    <div>Select a page to view content</div>
                )}
            </div>

           cd
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
