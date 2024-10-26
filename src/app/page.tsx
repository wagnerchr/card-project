'use client'

import Card from '@/components/Card';
import useFetchCards from '@/hooks/useFetchCards';

interface CardProps {
    id: number,
    titulo: string,
    imagem: string,
    texto: string,
    createdAt: Date
}

const Home: React.FC = () => {

    const cards = useFetchCards();
    return (
        <>
           <div className='relative h-[400px] overflow-hidden'>
    <div 
        className='absolute top-1/2 left-1/2 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-in-out transform -translate-x-1/2 -translate-y-1/2 hover:scale-105' 
        style={{ backgroundImage: 'url(/banner.jpg)' }}
    >
        <div className='absolute top-0 left-0 w-full h-full bg-blue-200 opacity-30'></div>
        
        {/* Texto sobre o banner */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center'>
            <h1 className='text-3xl font-bold text-[30px] text-[#FFFFFF] font-serif'>Fique Seguro: Orientações contra Golpes na Internet</h1>
        </div>
    </div>
</div>

            <div className="flex flex-col container w-full ml-20 ">
                <h1 className="text-[26px] font-bold my-6 mb-8 font-serif text-[#2b386a]">Cuidados a tomar</h1>
                <div className="flex w-full flex-wrap justify-around">
                {cards.length > 0 ? (
                    cards.map((card: CardProps, index: number) => (
                        <div key={card.id} className="w-full">
                            <Card titulo={card.titulo} imagem={card.imagem} texto={card.texto} />
                            {index < cards.length - 1 && (
                                <hr className="my-12 ml-10 border-t-4 border-gray-300 rounded-[20px] max-w-[1200px]" />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 mt-auto">Carregando postagens...</p>
                )}
            </div>
            <div className='h-[100px]'>

            </div>
            </div>
        </>
    );
};

export default Home;
