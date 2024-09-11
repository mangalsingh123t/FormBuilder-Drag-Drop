/* eslint-disable react/prop-types */

import { useDrag } from "react-dnd";
export const DraggableField = ({ field }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'FORM_FIELD',   // This tells react-dnd that this item is of type 'FORM_FIELD'
        item: { field },      // The data being dragged, i.e., the field info
        collect: (monitor) => ({
            isDragging: monitor.isDragging(), // Tracks whether the field is being dragged
        }),
    });

    return (
        <div
            ref={drag} // The drag ref makes the element draggable
            className={`p-2 border ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            {field.label} {/* Display the field label */}
        </div>
    );
};
