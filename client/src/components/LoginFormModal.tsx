import { useForm, SubmitHandler } from 'react-hook-form';

interface PropsType {
    isOpen: boolean;
    onClose: () => void;
}

interface FormInputs {
    email: string;
    password: string;
}


export default function LoginFormModal({ isOpen, onClose }: PropsType) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log("Email:", data.email, "Password:", data.password);
        onClose();
        reset();
    };

    const handleClose = ()=>{
        onClose();
        reset();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-lg font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: emailPattern,
                                    message: 'Invalid email format',
                                },
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Login
                        </button>
                        <button type="button" onClick={handleClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
