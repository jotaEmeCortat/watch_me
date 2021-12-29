import React from 'react';
import { api } from '../services/api';
import { Button } from './common/Button';
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  onChangeId: (id: number) => void;
  selectedGenreId: number;
}


export function SideBar({selectedGenreId, onChangeId}:SideBarProps) {
  const [genres, setGenres] = React.useState<GenreResponseProps[]>([]);

  React.useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id:number) {
    onChangeId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
