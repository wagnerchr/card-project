'use client'

import Card from '@/components/Card';
import React, { useEffect, useState } from 'react';

interface CardProps {
    id: number,
    titulo: string,
    imagem: string,
    texto: string,
    createdAt: Date
}

const Home: React.FC = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/card'); 
                const data = await response.json();
                setCards(data.cards);
            } catch (error) {
                console.error('Erro ao buscar os cards:', error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div className="flex flex-col container w-full mx-auto ">
            <h1 className="text-2xl font-bold my-4 font-white">Meus Cards</h1>
            <div className="flex w-full flex-wrap ">
                {cards.length > 0 ? (
                    cards.map((card: CardProps) => (
                        <Card key={card.id} titulo={card.titulo} imagem={card.imagem} texto={card.texto} />
                    ))
                ) : (
                    <p className="text-gray-500">Nenhum card encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
