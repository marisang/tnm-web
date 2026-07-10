'use client';

interface ShowCardProps {
  show: {
    id: string;
    title: string;
    banner: string;
    date: string;
    time: string;
    location: string;
  };
  onApprove: () => void;
  onReject: () => void;
}

export default function ShowCard({ show, onApprove, onReject }: ShowCardProps) {
  return (
    <div className="bg-purple-900 rounded p-3 flex items-center gap-3 border-2 border-purple-800">
      {/* Banner */}
      <div className={`${show.banner} w-20 h-20 rounded flex items-center justify-center flex-shrink-0 text-center`}>
        <div className="text-purple-900 font-bold text-xs">
          <div>Banner</div>
          <div>do Show</div>
        </div>
      </div>

      {/* Show Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-yellow-400 text-sm font-bold">{show.title}</h3>
        <div className="space-y-0.5 text-purple-200 text-xs">
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>{show.date} às {show.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{show.location}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onApprove}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-xs transition-colors"
        >
          APROVAR
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-xs transition-colors"
        >
          RECUSAR
        </button>
      </div>
    </div>
  );
}
