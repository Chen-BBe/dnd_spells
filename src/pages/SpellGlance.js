import React from 'react';
import SpellDetails from '../components/SpellDetails';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';
import { useGetSpellQuery } from '../redux/apiSlice';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Outlet, useParams, useNavigate } from 'react-router-dom';

function SpellGlance() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const {
    data: spell,
    isLoading,
    isFetching,
    isError,
    error,  
  } = useGetSpellQuery(id);
  
  const handleDialogToggle = (status) => {
    setOpen(status)
  }; 

  const handleClose = () => {
    navigate(-1);
  };

  if (isLoading || isFetching || !spell) {
    return null
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}      
      >
        <DialogTitle>
          <Typography component={'span'} color="Black" variant="h6"><strong>{spell.name}</strong></Typography>
        </DialogTitle>
        <Divider />      
        <DialogContent>
          <Typography component={'span'} color="black" variant="overline">Description:</Typography>
          {
            spell.desc.map((des, index) => (
              <DialogContentText key={index}>
                <Typography component={'span'} variant="body2">{des}</Typography>
              </DialogContentText>
            ))
          }
          <Link onClick={() => handleDialogToggle(!open)}>
            <DetailsLink>
              <FontAwesomeIcon icon={faDragon} color="black" fixedWidth size="lg" bounce />
              <div style={{ width: "8px" }}/>
              More details
            </DetailsLink>
          </Link>
        </DialogContent>
        <DialogActions>
          <IconButton color="default" size="medium" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} title="Close" fixedWidth />
          </IconButton>
        </DialogActions>
      </Dialog>
      
      <SpellDetails isOpen={open} toggler={handleDialogToggle} data={spell} />

      <Outlet />
    </>
  );
}

const DetailsLink = styled('div')({
  display: "flex", 
  flexDirection: "row", 
  marginTop: "2vh",
  "&:hover": {
    cursor: "pointer"
  }
});

export default SpellGlance;