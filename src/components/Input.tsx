
interface InputProps {
    type?: string,
    icon?: string,
    label?: string,
    placeholder?: string,
    register?: any;
}

const Input = ({
                   type = 'text',
                   icon,
                   label,
                   placeholder = '',
                   register
               }: InputProps) => {

    return (
        <div className="flex flex-col w-full">
            {label && <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>}
            <div className="relative">
                {icon && (
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <img src={icon} alt="icon" className="h-5 w-5"/>
          </span>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register}
                    className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:border-green-600"
                />
            </div>
        </div>
    );
};

export default Input;

