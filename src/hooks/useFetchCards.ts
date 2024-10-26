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
  const [cards, setCards] = useState<CardProps[]>([]);
  
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

  return cards;
}
