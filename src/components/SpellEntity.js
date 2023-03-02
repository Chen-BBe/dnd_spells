import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

function SpellEntity({ itemKey, itemName, localState, setLocalState }) {
  const [open, setOpen] = React.useState(false);
  const currentLocation = useLocation()
  
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const itemNav = () => {
    if (currentLocation.pathname.split('/').slice(-1)[0] !== `${itemKey}`) {
      navigate(`${currentLocation.pathname === '/' ? '/spells' : currentLocation.pathname}/${itemKey}`);
    }
  };

  const spellBtnClickHandler = () => {
    let likes = [...localState];

    if (checkIfLikedSpell(likes, itemKey)) {
      let index = likes.indexOf(itemKey);
      if (index !== -1) likes.splice(index, 1);
      setLocalState(likes);
    }
    else {
      setLocalState([...likes, itemKey]);
    }

    setOpen(true);
  };

  return (
    <>
      <Item>
        <Stack direction="row" spacing={2}>
          <Grid container spacing={2} columns={10}>
            <Grid item xs={8} onClick={itemNav}>
              <Typography sx={{ fontFamily: 'Monospace', fontWeight: 'bold' }} variant="h6" align="center" component="span">
                {itemName}
              </Typography>
            </Grid>            
            <Grid item xs={2}>
              <IconButton sx={{ "&:hover": { backgroundColor: "silver" } }}  size="medium" onClick={spellBtnClickHandler}>
                {
                  checkIfLikedSpell(localState, itemKey) ?
                  <FontAwesomeIcon icon={faBookBookmark} title="Remove from likes" color="green" fixedWidth />
                  :
                  <FontAwesomeIcon icon={faPlus} title="Add to Likes" fixedWidth />
                }
              </IconButton>
            </Grid>
          </Grid>
        </Stack>
      </Item>

      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={open}
        autoHideDuration={500}
        onClose={handleClose}
      >
        <Alert severity={ checkIfLikedSpell(localState, itemKey) ? "success" : "info" } sx={{ width: '100%' }}>
          { checkIfLikedSpell(localState, itemKey) ? `Added to favourites` : 'Remove from favourites' }
        </Alert>
      </Snackbar>
    </>
  );
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#424242',
  width: '80%',
  margin: '0.5vh',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'silver',
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
    backgroundColor: 'white',
  }
}));

const checkIfLikedSpell = (localState, index) => {
  if (!localState) {
    return false
  }

  return localState.includes(index);
};

export default SpellEntity;