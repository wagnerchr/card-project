"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CardProps {
    id: number;
    titulo: string;
    imagem: string;
    texto: string;
    createdAt: Date;
}

export default function AdminClient() {
    const [cards, setCards] = useState<CardProps[]>([]);
    const [formData, setFormData] = useState({
        titulo: "",
        imagem: "",
        texto: "",
        createdAt: new Date(),
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editingCardId, setEditingCardId] = useState<number | null>(null); 

    const fetchCards = async () => {
        const response = await fetch("/api/card");
        const data = await response.json();
        setCards(data.cards);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setFormData((prev) => ({ ...prev, imagem: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (editingCardId !== null) {
            await fetch("/api/card", {
                method: "PUT",
                body: JSON.stringify({ ...formData, id: editingCardId }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            await fetch("/api/card", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    
        setFormData({ titulo: "", imagem: "", texto: "", createdAt: new Date() });
        setImagePreview(null);
        setEditingCardId(null);
        fetchCards();
    };

    const handleDelete = async (id: number) => {
        await fetch("/api/card", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        fetchCards();
    };

    const handleEdit = (card: CardProps) => {
        setEditingCardId(card.id);
        setFormData({
            titulo: card.titulo,
            imagem: card.imagem,
            texto: card.texto,
            createdAt: card.createdAt,
        });
        setImagePreview(card.imagem);
    };

    const handleCancelEdit = () => {
        setEditingCardId(null);
        setFormData({ titulo: "", imagem: "", texto: "", createdAt: new Date() });
        setImagePreview(null);
    };

    return (
        <div className="flex flex-col container w-full mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center m-auto w-[50%] items-center mb-4 p-4 bg-white rounded shadow-md">
                <div className="flex flex-col w-full mb-4">
                    <label htmlFor="titulo" className="block text-gray-700 font-semibold mb-2">Título</label>
                    <input
                        id="titulo"
                        name="titulo"
                        type="text"
                        placeholder="Título"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label htmlFor="imagem" className="block text-gray-700 font-semibold mb-2">Imagem</label>
                    <input
                        id="imagem"
                        name="imagem"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    />
                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            alt="Pré-visualização da imagem"
                            width={300}
                            height={300}
                            className="my-2"
                        />
                    )}
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label htmlFor="texto" className="block text-gray-700 font-semibold mb-2">Texto</label>
                    <textarea
                        id="texto"
                        name="texto"
                        placeholder="Texto"
                        value={formData.texto}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 h-24 resize-none"
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="w-[300px] py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
                        {editingCardId ? "Atualizar Card" : "Criar Card"}
                    </button>
                    {editingCardId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="w-[300px] py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition duration-200"
                        >
                            Cancelar Edição
                        </button>
                    )}
                </div>
            </form>

            <div className="flex w-full flex-wrap justify-around">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <div key={card.id} className="flex w-[400px] flex-col overflow-hidden m-4 mx-10">
                            <div className="w-[500px] h-52 flex-shrink-0 ">
                                <Image 
                                    className="w-full h-full object-cover "
                                    src={card.imagem || "/fallback-image.jpg"} 
                                    alt={card.titulo}
                                    width={500}
                                    height={300}
                                />      
                            </div>
                            <div className="py-4">
                                <h1 className="font-bold text-xl mb-2">{card.titulo}</h1>
                                <p className="text-gray-700 text-base">
                                    {card.texto.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                                <div className="flex space-x-2 mt-4">
                                    <button onClick={() => handleEdit(card)} className="w-[60px] bg-blue-300 text-blue-500 hover:underline rounded-[8px]">Editar</button>
                                    <button onClick={() => handleDelete(card.id)} className="w-[60px] bg-red-300 text-red-500 hover:underline rounded-[8px]">Excluir</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Nenhum card encontrado.</p>
                )}
            </div>
        </div>
    );
}
