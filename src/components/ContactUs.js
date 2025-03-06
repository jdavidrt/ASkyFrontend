import React, { useState } from "react";
import axios from "axios";

const ContactUs = () => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        sure_name: "",
        email: "",
        title: "",
        message: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleOpen1 = () => setIsOpen1(true);
    const handleClose = () => setIsOpen(false);
    const handleClose1 = () => setIsOpen1(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.sure_name || !data.title || !data.email || !data.message) {
            handleOpen();
            return;
        }

        setLoader(true);

        // Configuración de EmailJS
        const serviceId = "service_k5zdn87";
        const templateId = "template_utgw40e";
        const publicKey = "q7U4-GS5XqTmcVjwD";

        const emailData = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                from_name: data.sure_name,
                from_email: data.email,
                subject: data.title,
                message: data.message,
                to_name: "Asky",
            },
        };

        try {
            await axios.post("https://api.emailjs.com/api/v1.0/email/send", emailData);
            setData({ sure_name: "", email: "", title: "", message: "" });
            handleOpen1();
        } catch (error) {
            console.error("Error enviando el mensaje:", error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <React.Fragment>
            <div className="mt-2 justify-center relative flex content-center pt-[100px]">
                <h1 className="text-[300px] font-extrabold absolute top-0 text-[#263B44] drop-shadow-7xl max-w-[1200px] w-[100%] overflow-x-hidden"></h1>
            </div>
            <div className="z-20 relative">
                <div className="justify-center flex content-center">
                    <p className="text-[#48AFDE] font-bold text-5xl md:text-7xl">Contáctanos</p>
                </div>
                <div className="text-center mt-5 justify-center flex">
                    <p className="text-white font-[300] w-full md:w-[650px] text-center text-lg md:text-xl">
                        ¿Buscas expertos en diversas áreas para responder tus preguntas con información confiable? Déjanos un mensaje y cuéntanos cómo podemos ayudarte en Asky.
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <div className="bg-white rounded-t-xl w-full md:w-[850px] mt-10 mb-10 lg:p-20 md:p-10 p-5 mx-5">
                    <form onSubmit={handleSubmit}>
                        <div className="grid lg:gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-[#47626D]">Nombre</label>
                                <input
                                    type="text"
                                    value={data.sure_name}
                                    name="sure_name"
                                    onChange={handleChange}
                                    className="bg-[#EEF7FB] text-gray-900 text-sm rounded-lg block w-full p-3.5"
                                    placeholder="Ingresa tu nombre"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-[#47626D]">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    name="email"
                                    onChange={handleChange}
                                    className="bg-[#EEF7FB] text-gray-900 text-sm rounded-lg block w-full p-3.5"
                                    placeholder="Ingrese su correo electrónico"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-[#47626D]">Asunto</label>
                            <input
                                type="text"
                                value={data.title}
                                name="title"
                                onChange={handleChange}
                                className="bg-[#EEF7FB] text-gray-900 text-sm rounded-lg block w-full p-3.5"
                                placeholder="Ingresa el asunto"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-[#47626D]">Mensaje</label>
                            <textarea
                                value={data.message}
                                name="message"
                                onChange={handleChange}
                                className="bg-[#EEF7FB] text-gray-900 h-[250px] text-sm rounded-lg block w-full p-3.5"
                                placeholder="Cuéntanos cómo podemos ayudarte"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loader}
                            className="text-white font-[700] bg-[#48AFDE] rounded-lg text-lg w-full px-9 p-3.5"
                        >
                            {loader ? "Enviando..." : "Enviar"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal para campos vacíos */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-20 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-4 w-[400px]">
                        <h2 className="text-lg font-semibold mb-4">Atención</h2>
                        <p>Por favor completa todos los campos.</p>
                        <button className="bg-[#F0AD02] text-white font-bold py-2 px-4 rounded" onClick={handleClose}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para mensaje enviado */}
            {isOpen1 && (
                <div className="fixed inset-0 flex items-center justify-center z-20 bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg p-4 w-[400px]">
                        <h2 className="text-lg font-semibold mb-4">Éxito</h2>
                        <p>Mensaje enviado correctamente.</p>
                        <button className="bg-[#39f002] text-white font-bold py-2 px-4 rounded" onClick={handleClose1}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default ContactUs;
