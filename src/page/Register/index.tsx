import React, { useState } from "react";
import { useRegisterUserMutation } from "../../api/user";
import { useNavigate } from "react-router-dom";
import Index from "../../component/Alert";

interface FormData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface AlertData {
    type: string;
    title: string;
    message: string;
}

const Register: React.FC = () => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        lastName: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [alertData, setAlertData] = useState<AlertData | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await registerUser(formData).unwrap();
            setAlertData({
                type: "success",
                title: "Регистрация успешна!",
                message: "Добро пожаловать!",
            });

            navigate("/login");
        } catch (error) {
            console.error("Ошибка регистрации:", error);
            setAlertData({
                type: "error",
                title: "Ошибка регистрации",
                message: "Не удалось зарегистрировать аккаунт. Проверьте данные и попробуйте снова.",
            });
        }
    };

    const closeAlert = () => {
        setAlertData(null);
    };

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Добро пожаловать в Well-being Platform 💻
                        </h1>

                        {alertData && (
                            <Index
                                title={alertData.title}
                                message={alertData.message}
                                onClose={closeAlert}
                            />
                        )}

                        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="FirstName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Имя
                                </label>
                                <input
                                    type="text"
                                    id="FirstName"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="LastName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Фамилия
                                </label>
                                <input
                                    type="text"
                                    id="LastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="Email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Электронная почта
                                </label>
                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Пароль
                                </label>
                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="PasswordConfirmation"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Подтвердите пароль
                                </label>
                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                />
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    type="submit"
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Загрузка..." : "Создать аккаунт"}
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Уже есть аккаунт?
                                    <a className="text-gray-700 underline"
                                       href="/login">Войти</a>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Register;
