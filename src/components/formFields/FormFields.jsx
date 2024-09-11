import { DraggableField } from "../dragAndDrop/DraggableField";
export const FormFields = () => {

    const fields = [
        { id: 1, type: 'text', label: 'Name' },
        { id: 2, type: 'email', label: 'Email' },
        { id: 3, type: 'text', label: 'Single Line' },
        { id: 4, type: 'textarea', label: 'Multi Line' },
        { id: 5, type: 'number', label: 'Number' },
        { id: 6, type: 'number', label: 'Decimal' },
        { id: 7, type: 'date', label: 'Date' },
        { id: 8, type: 'time', label: 'Time' },
        { id: 9, type: 'checkbox', label: 'Checkbox' },
        { id: 10, type: 'radio', label: 'Radio' }
    ];

    return (
        <div className="bg-gray-200 p-6 min-h-screen">
        <h1 className="text-xl font-semibold mb-4">Form Fields</h1>
        <div className="grid grid-cols-1 gap-4">
            {fields.map((field) => (
                <DraggableField key={field.id} field={field} />
            ))}
        </div>
    </div>
    );
};

