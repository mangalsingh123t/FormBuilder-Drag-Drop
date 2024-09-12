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

    const changeLable = (label) => {
        let textLabel = prompt("Update the label Name", [label]);
        if (textLabel) {
            let updateFormField = formFields.map((fields) => fields.label === label ? { ...fields, label: textLabel } : fields)
            setFormFields(updateFormField)
        }
    }

    const deleteField = (inputIndex) => {
        let updatedFormFields = formFields.filter((_, index) => index !== inputIndex)
        setFormFields(updatedFormFields)

    }

    return (
        <>
            <div className="flex">
                <div
                    ref={drop}
                    className={`container mx-auto bg-white rounded-md border min-h-screen mt-5 p-4 flex-1 ${isOver ? 'bg-gray-100' : ''
                        }`}
                >
                    <p className="text-center text-2xl font-bold mb-4">Form Builder</p>

                    {formFields.length > 0 ? (
                        formFields.map((field, index) => (
                            <div key={index} className="mb-4">
                                <div className='flex justify-between'>
                                    <label className="block mb-2 text-sm font-medium text-gray-700"  >
                                        {field.label}
                                    </label>
                                    <div>
                                        <button className='px-2  bg-blue-300 rounded-md' onClick={() => changeLable(field.label)}>Edit Lable</button>
                                        <button className='px-2  bg-red-400 rounded-md' onClick={() => deleteField(index)}>Delete</button>
                                    </div>
                                </div>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        className="outline-none border border-gray-300 rounded-md p-2 w-full"
                                        rows="3"
                                    ></textarea>
                                ) : field.type === 'checkbox' ? (
                                    <div>
                                        {/* Checkbox Group */}
                                        <label className="inline-flex items-center space-x-3">
                                            <input
                                                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="checkbox"
                                            />
                                            <span className="text-gray-700 ">Checkbox Option 1</span>
                                        </label>
                                        <label className="inline-flex items-center space-x-3">
                                            <input
                                                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="checkbox"
                                            />
                                            <span className="text-gray-700">Checkbox Option 2</span>
                                        </label>
                                        <label className="inline-flex items-center space-x-3">
                                            <input
                                                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="checkbox"
                                            />
                                            <span className="text-gray-700">Checkbox Option 3</span>
                                        </label>
                                    </div>
                                ) : field.type === 'radio' ? (
                                    <div>
                                        {/* Radio Button Group */}
                                        <label className="inline-flex items-center space-x-3">
                                            <input
                                                className="form-radio h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="radio"
                                                name="radioGroup"
                                            />
                                            <span className="text-gray-700">Radio Option 1</span>
                                        </label>
                                        <label className="inline-flex items-center space-x-3">
                                            <input
                                                className="form-radio h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="radio"
                                                name="radioGroup"
                                            />
                                            <span className="text-gray-700">Radio Option 2</span>
                                        </label>
                                        <label className="inline-flex items-center space-x-3">
                                            <input
                                                className="form-radio h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="radio"
                                                name="radioGroup"
                                            />
                                            <span className="text-gray-700">Radio Option 3</span>
                                        </label>
                                    </div>
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
