import React from 'react';
import Image from 'next/image';

interface CardProps {
    titulo: string;
    imagem: string;
    texto: string;
}

const Card: React.FC<CardProps> = ({ titulo, imagem, texto }) => {
    // Função para converter quebras de linha em elementos <br />
    const formatText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="flex w-full max-w-[1200px] h-[300px] rounded overflow-hidden mx-10 flex-row">
            <div className="w-[500px] h-full flex-shrink-0 ">
                <Image 
                    className="w-full h-full object-cover rounded-[20px]"
                    src={imagem || "/fallback-image.jpg"} 
                    alt={titulo}
                    width={500}
                    height={300}
                />
            </div>
            <div className="py-2 px-6 flex flex-col w-full text-left ">
                <h1 className="text-[32px] text-[#011ef8] font-serif  font-bold mb-4 leading-10">{titulo}</h1>
                <p className="text-gray-700 font-sans text-base">{formatText(texto)}</p>
            </div>
        </div>
    );
};

export default Card;
