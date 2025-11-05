
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { add, multiply, CONSTANT_VALUE } from '../utils/utils';

// Динамический импорт для code splitting
const loadLazyComponent = () => import('../components/LazyComponent');

export function App() {
    const [LazyComp, setLazyComp] = useState<React.ComponentType | null>(null);
    const [showLazy, setShowLazy] = useState(false);

    useEffect(() => {
        if (showLazy) {
            loadLazyComponent().then(module => {
                setLazyComp(() => module.LazyComponent);
            });
        }
    }, [showLazy]);

    const result1 = add(5, 3);
    const result2 = multiply(4, 7);

    return (
        <div >
            <ul>
                <li>Функция add(5, 3) = {result1}</li>
                <li>Функция multiply(4, 7) = {result2}</li>
                <li>Константа: {CONSTANT_VALUE}</li>
            </ul>

            <button onClick={() => setShowLazy(!showLazy)}>
                {showLazy ? 'Скрыть' : 'Показать'} Lazy Component
            </button>

            {showLazy && LazyComp && <LazyComp />}
        </div>
    );
}

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
