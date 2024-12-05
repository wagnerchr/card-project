'use client'

import { useEffect, useState } from 'react';

export interface CardProps {
  id: number;
  titulo: string;
  imagem: string;
  texto: string;
  createdAt: Date;
}

export default function useFetchCards() {
  const [cards, setCards] = useState<CardProps[]>([]); // Inicializa como array vazio
  
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/card');
        const data = await response.json();

        // Verifica se a resposta contém a propriedade 'cards' como um array
        if (data && Array.isArray(data.cards)) {
          setCards(data.cards);
        } else {
          console.error('Dados inválidos recebidos:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar os cards:', error);
      }
    };

    fetchCards();
  }, []);

  return cards;
}
