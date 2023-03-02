import React from 'react';
import SpellEntity from '../components/SpellEntity';
import LoadingMage from '../components/LoadingMage';
import Pagination from '@mui/material/Pagination';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFetchAllSpellsQuery } from '../redux/apiSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt} from '@fortawesome/free-solid-svg-icons';

function FavouritesList() {
  const [page, setPage] = React.useState(1);
  const [localState, setLocalState] = useLocalStorage();
  const navigate = useNavigate();
  const { 
    data: spells,
    isLoading,
    isFetching,
    isError,
    error,  
  } = useFetchAllSpellsQuery();

  const { curLikes, pageSize } = React.useMemo(() => {
    if (spells) {
      let findAllSpells = [];
      localState.forEach((likeKey) => {
        let item = spells.results.find((item) => item.index === likeKey)
        if (item !== undefined) {
          findAllSpells.push(item);
        }
      });

      return {
        curLikes: findAllSpells.slice((page - 1) * MAX_PAGE_SIZE, (page - 1) * MAX_PAGE_SIZE + MAX_PAGE_SIZE),
        pageSize: parseInt(localState.length) % MAX_PAGE_SIZE === 0 ? Math.floor(parseInt(localState.length) / MAX_PAGE_SIZE) 
        : Math.floor(parseInt(localState.length) / MAX_PAGE_SIZE) + 1
      }
    }
    return {
      curLikes: [],
      pageSize: 0
    }
  }, [localState, spells, page]);

  const toggleListView = () => {
    navigate('/spells');
  };

  const handlePageBtnClick = (event, value) => {
    let offset = parseInt(value) - page;

    if (page + offset >= 1 && page + offset <= pageSize) {
      setPage(page + offset)
    }
  };

  if (isLoading || isFetching) {
    return (
      <LoadingMage />
    )
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return (
    <>
      <Fab
        color="secondary"
        sx={{
          position: 'absolute',
          top: (theme) => theme.spacing(2),
          left: (theme) => theme.spacing(2),
          opacity: 0.8
        }}
        onClick={toggleListView}
      >
        <FontAwesomeIcon icon={faBolt} title="Go Spell list" size="xl" fixedWidth />
      </Fab>
      <div
        style={{
          position: 'absolute',
          top: '2vh',
          left: '12vh',
        }}
      >
        <Typography sx={{ fontFamily: 'Monospace', fontWeight: 'bold' }} variant="h5" gutterBottom>SPELL LIKES - {page}</Typography>  
      </div>   
      <div style={BaseView}>
        <div style={ListView}>
          {
            curLikes.map((spell) => (
              <SpellEntity key={spell.index} itemKey={spell.index} itemName={spell.name} localState={localState} setLocalState={setLocalState}/>
            ))
          }
        </div>

        <div style={{ height: '2vh' }}/>
        <Pagination count={pageSize} page={page} onChange={handlePageBtnClick} color="primary" />

        <Outlet />  
      </div>
    </>
  );
}

const MAX_PAGE_SIZE = 15;

const likes_bg = "https://raw.githubusercontent.com/Chen-BBe/my-page-assets/main/img/dnd_wp_s.jpg";

const BaseView = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const ListView = {
  marginTop: '5vh',
  height: '85vh',
  overflowY: 'scroll',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${likes_bg})`,
  backgroundSize: "cover"  
};

export default FavouritesList;