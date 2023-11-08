import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { FaLock } from 'react-icons/fa';

const LockView = () => {
    const { currentColor } = useStateContext();
    const navigate = useNavigate();

    const goToSubscription = () => {
        navigate('/subscriptions');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={goToSubscription}
                style={{ color: currentColor }}
                className="text-center flex flex-col items-center" // Center the content vertically and horizontally
            >
                <FaLock size={100} color="gray" />
                <div className="mt-3">
                    Subscribe To Unlock All Features!
                </div>
            </button>
        </div>
    );
}

export default LockView;
