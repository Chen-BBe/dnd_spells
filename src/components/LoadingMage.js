import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingMage() {
  return (
    <div style={LoadingBox}>
      <Box sx={LoadingIconBox}>
        <CircularProgress size={100} thickness={1} />
        <Box sx={LoadingImgBox}>
          <img src={iconUrl} alt="loading" width="80" height="80" title="Bala~Bala~Hoo~&#128050;" /> 
        </Box>
      </Box>
    </div>    
  )
}

const LoadingBox = {
  backgroundColor: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const LoadingImgBox = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const iconUrl = "https://raw.githubusercontent.com/Chen-BBe/my-page-assets/main/img/magic_loading.gif";

const LoadingIconBox = { position: 'relative', display: 'inline-flex', margin: `${LoadingBox.height / 20}` };

export default LoadingMage;