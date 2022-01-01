import { useState, useEffect } from 'react';

const useKeyPress = (callback) => {
    
    const [keyPressed, setKeyPressed] = useState();
    useEffect(() => {
        const downHandler = ({ key }) => {
            // проверяем на уникальность и исключаем Shift, Ctrl, etc
            // состоянии клавиши нажатой для исключения повторного callback при зажатии кнопки, колбек
            if (keyPressed !== key && key.length === 1) {
                setKeyPressed(key);
                callback(key);
            }
        };
        const upHandler = () => {
            setKeyPressed(null);
        };
        
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });
    return keyPressed;
};

export default useKeyPress;