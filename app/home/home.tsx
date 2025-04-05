import 'app/styles/home.css';
import Header from './navbar';
import WordDisplay from '../storyPractice/wordDisplay';
import { useState } from 'react';
import MenuBtn from './menuBtn';


export function Home() {
  const [page, setPage] = useState<number>(0);

  const changePage = (pageidx : number) => {
    setPage(pageidx);
  }

  return (
    <main className="welcome">
      
      {page === 0 &&
      <div>
        <h1 className='logoTitle'>Type The Rainbow</h1>
        <MenuBtn title='Row Quiz' press={() => changePage(1)} />
        <MenuBtn title='Story Practice' press={() => changePage(2)} />
        <MenuBtn title='Words Per Minute Test' press={() => changePage(3)} />
      </div>
      }
      {page === 1 &&
        <>
          <h3>Row Quiz</h3>
        </>
      }
      {page === 2 &&
        <div style={{height:"100%"}}>
        <Header press={()=>changePage(0)}/>
        <WordDisplay />
        </div>
      }
      {page === 3 &&
        <>
          <h3>Words Per Minute Test</h3>
        </>
      }

    </main>
  );
}

export default Home;