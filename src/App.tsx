import React from 'react';
import { api } from './services/api';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {

  const [selectedGenreId, setSelectedGenreId] = React.useState(1);
  const [movies, setMovies] = React.useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = React.useState<GenreResponseProps>({} as GenreResponseProps);

  React.useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        onChangeId={handleClickButton}
        selectedGenreId={selectedGenreId}
      />

      <Content selectedGenre={selectedGenre.title} movies={movies} />
    </div>
  );
}
