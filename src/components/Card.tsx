import React from 'react';
import Image from 'next/image';

interface CardProps {
    titulo: string;
    imagem: string;
    texto: string;
}

const Card: React.FC<CardProps> = ({ titulo, imagem, texto }) => {
    return (
        <div className="flex flex-col rounded overflow-hidden shadow-lg m-4">
            <Image 
                className="w-full" 
                src={imagem} 
                alt={titulo}
                width={300}
                height={300}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{titulo}</div>
                <p className="text-gray-700 text-base">{texto}</p>
            </div>
        </div>
    );
};

export default Card;
