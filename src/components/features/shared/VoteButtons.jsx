export default function VoteButtons({ voteCount, onVote }) {
    return (
      <div className="flex flex-col items-center w-10">
        <button 
          onClick={() => onVote('up')}
          className="hover:bg-orange-100 rounded p-1"
        >
          ▲
        </button>
        <span className="my-1 font-medium">{voteCount}</span>
        <button 
          onClick={() => onVote('down')}
          className="hover:bg-blue-100 rounded p-1"
        >
          ▼
        </button>
      </div>
    )
  }