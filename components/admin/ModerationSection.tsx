'use client';

import { useState } from 'react';
import ShowCard from './ShowCard';

interface Show {
  id: string;
  title: string;
  banner: string;
  date: string;
  time: string;
  location: string;
}

export default function ModerationSection() {
  const [shows, setShows] = useState<Show[]>([
    {
      id: '1',
      title: 'TÍTULO DO SHOW',
      banner: 'bg-yellow-300',
      date: '18/06/2026',
      time: '21:00',
      location: 'LOCAL',
    },
    {
      id: '2',
      title: 'TÍTULO DO SHOW',
      banner: 'bg-yellow-300',
      date: '18/06/2026',
      time: '21:00',
      location: 'LOCAL',
    },
    {
      id: '3',
      title: 'TÍTULO DO SHOW',
      banner: 'bg-yellow-300',
      date: '18/06/2026',
      time: '21:00',
      location: 'LOCAL',
    },
  ]);

  const handleApprove = (id: string) => {
    setShows(shows.filter(show => show.id !== id));
    console.log('Show aprovado:', id);
  };

  const handleReject = (id: string) => {
    setShows(shows.filter(show => show.id !== id));
    console.log('Show recusado:', id);
  };

  return (
    <div className="bg-gray-600 rounded-lg p-6">
      <h2 className="text-white text-lg font-bold mb-4 text-center">MODERAÇÃO DA VITRINE DE SHOWS</h2>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {shows.length > 0 ? (
          shows.map(show => (
            <ShowCard
              key={show.id}
              show={show}
              onApprove={() => handleApprove(show.id)}
              onReject={() => handleReject(show.id)}
            />
          ))
        ) : (
          <div className="text-white text-center py-8">
            <p className="text-sm">Nenhum show aguardando moderação</p>
          </div>
        )}
      </div>
    </div>
  );
}
