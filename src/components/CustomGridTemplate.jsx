import React from 'react';

const CustomGridTemplate = (props) => {
    return (
        <img
            src={props.imageUrl} // Make sure the field name is correct
            alt="Customer Image"
            style={{ width: '50px', height: '50px', borderRadius:'100px' }} // Adjust the size as needed
        />
    );
};

export default CustomGridTemplate;
