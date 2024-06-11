import { useEffect, useState } from 'react';
import '../App.css';



export default function MemoryCards() {
  const [gifs, setGifs] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedGifs, setClickedGifs] = useState(new Set());
  
 

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=cats&limit=20`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGifs(data.data);
      });
  }, []);

  const handleImageClick = (id) => {
    if(clickedGifs.has(id)){
        //this is resetting the score to 0
        setScore(0);
        setClickedGifs(new Set());//reset clicked gifs score
    }else{
        const newClickedGifs = new Set(clickedGifs); //a new set 
        newClickedGifs.add(id);
        setClickedGifs(newClickedGifs);
        setScore(prevScore => {
            const newScore = prevScore + 1;
            if (newScore > highScore) {
                setHighScore(newScore);
            }
            return newScore;
    });
}
    //shuffle images after each click
    setGifs((prevGifs)=> shuffleArray([...prevGifs]));
}

  //fisher-yates algorithm
 const shuffleArray = (array) => {
    for (let i=array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
 }

  

  return (
    <>
    <div className="score-card">
    <p className="score">Score: {score}</p>
    <p className="high-score">High Score: {highScore}</p>
    </div>
      <div className="container">
       
        {gifs.map((gif) => (
          <img key={gif.id}
               src={gif.images.fixed_height.url} 
               alt={gif.title}
               onClick={() => handleImageClick(gif.id)}
               /> 
        ))}
       
      </div>
    
    
    </>
  );
}
