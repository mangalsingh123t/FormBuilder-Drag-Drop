import { useDrop } from 'react-dnd';
import { useState } from 'react';

export const Forms = () => {
    const [formFields, setFormFields] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [{ isOver }, drop] = useDrop({
        accept: 'FORM_FIELD',
        drop: (item) => addFieldToForm(item.field),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const addFieldToForm = (field) => {
        if (field.type === 'checkbox' || field.type === 'radio') {
            setFormFields((prevFields) => [
                ...prevFields,
                { ...field, options: ['Option 1', 'Option 2', 'Option 3'] },
            ]);
        } else {
            setFormFields((prevFields) => [...prevFields, field]);
        }
    };

    const changeLabel = (label) => {
        let textLabel = prompt("Update the label Name", [label]);
        if (textLabel) {
            let updateFormField = formFields.map((fields) =>
                fields.label === label ? { ...fields, label: textLabel } : fields
            );
            setFormFields(updateFormField);
        }
    };

    const deleteField = (inputIndex) => {
        let updatedFormFields = formFields.filter((_, index) => index !== inputIndex);
        setFormFields(updatedFormFields);
    };

    const editOptions = (fieldIndex) => {
        const newOptions = prompt(
            "Enter new options separated by commas",
            formFields[fieldIndex].options.join(", ")
        );
        if (newOptions) {
            const updatedFields = formFields.map((field, index) =>
                index === fieldIndex ? { ...field, options: newOptions.split(",") } : field
            );
            setFormFields(updatedFields);
        }
    };

    const submitForm = () => {
        setFormSubmitted(true);
        setTimeout(() => {
            setFormFields([]); 
            setFormSubmitted(false); 
        }, 2000); 
    };

    return (
        <div className="flex">
            <div
                ref={drop}
                className={`container mx-auto bg-white rounded-md border min-h-screen mt-5 p-4 flex-1 ${
                    isOver ? 'bg-gray-100' : ''
                }`}
            >
                <p className="text-center text-2xl font-bold mb-4">Form Builder</p>

                {formFields.length > 0 ? (
                    formFields.map((field, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <div>
                                    <button
                                        className="px-2 bg-blue-300 rounded-md"
                                        onClick={() => changeLabel(field.label)}
                                    >
                                        Edit Label
                                    </button>
                                    {(field.type === 'checkbox' || field.type === 'radio') && (
                                        <button
                                            className="px-2 bg-green-300 rounded-md"
                                            onClick={() => editOptions(index)}
                                        >
                                            Edit Options
                                        </button>
                                    )}
                                    <button
                                        className="px-2 bg-red-400 rounded-md"
                                        onClick={() => deleteField(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {field.type === 'textarea' ? (
                                <textarea
                                    className="outline-none border border-gray-300 rounded-md p-2 w-full"
                                    rows="3"
                                ></textarea>
                            ) : field.type === 'checkbox' ? (
                                <div>
                                    {field.options.map((option, optIndex) => (
                                        <label
                                            key={optIndex}
                                            className="inline-flex items-center space-x-3"
                                        >
                                            <input
                                                className="form-checkbox h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="checkbox"
                                            />
                                            <span className="text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : field.type === 'radio' ? (
                                <div>
                                    {field.options.map((option, optIndex) => (
                                        <label
                                            key={optIndex}
                                            className="inline-flex items-center space-x-3"
                                        >
                                            <input
                                                className="form-radio h-5 w-5 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                                                type="radio"
                                                name={`radioGroup-${index}`}
                                            />
                                            <span className="text-gray-700">{option}</span>
                                        </label>
                                    ))}
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
                    <p className="text-center text-gray-500">
                        Drag fields here to build the form
                    </p>
                )}

                {formFields.length > 0 && (
                    <div className="text-center mt-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={submitForm}
                        >
                            Submit
                        </button>

                        {formSubmitted && (
                            <p className="text-blue-500 text-lg mt-4 animate-pulse">
                                Form submitted successfully!
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
