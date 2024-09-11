import { useDrop } from 'react-dnd';
import { useState } from 'react';

export const Forms = () => {
    const [formFields, setFormFields] = useState([]);

    const [{ isOver }, drop] = useDrop({
        accept: 'FORM_FIELD',
        drop: (item) => addFieldToForm(item.field),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const addFieldToForm = (field) => {
        setFormFields((prevFields) => [...prevFields, field]);
    };

    return (
        <>
            <div className="flex">
                <div
                    ref={drop}
                    className={`container mx-auto bg-white rounded-md border min-h-screen mt-5 p-4 flex-1 ${
                        isOver ? 'bg-gray-100' : ''
                    }`}
                >
                    <p className="text-center text-2xl font-bold mb-4">Sample Form</p>

                    {formFields.length > 0 ? (
                        formFields.map((field, index) => (
                            <div key={index} className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700" >
                                    {field.label}
                                </label>

                                {field.type === 'textarea' ? (
                                    <textarea
                                        className="outline-none border border-gray-300 rounded-md p-2 w-full"
                                        rows="3"
                                    ></textarea>
                                ) : (
                                    <input
                                        className="outline-none border border-gray-300 rounded-md p-2 w-full"
                                        type={field.type} 
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Drag fields here to build the form</p>
                    )}
                </div>
            </div>
        </>
    );
};
