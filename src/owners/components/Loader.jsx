import React from 'react';
import PulseLoader from 'react-spinners/HashLoader';
import { useStateContext } from '../../contexts/ContextProvider';

const Loader = ({ loading }) => {
    const { currentColor } = useStateContext();

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <PulseLoader
                    color={currentColor}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default Loader;