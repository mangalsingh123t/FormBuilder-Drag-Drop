/* eslint-disable react/prop-types */

import { useDrag } from "react-dnd";
export const DraggableField = ({ field }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'FORM_FIELD',   
        item: { field },      
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag} 
            className={`p-2 border ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            {field.label} 
        </div>
    );
};
