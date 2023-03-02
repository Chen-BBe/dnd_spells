import React from 'react';
import SpellDetailsContent from './SpellDetailsContent';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace} from '@fortawesome/free-solid-svg-icons'

function SpellDetails({ isOpen, toggler, data }) {
  const contentData = React.useMemo(() => {
    if (data) {
      return {
        fields: {
          level: { name: 'LEVEL', value: data.level },
          casting_time: { name: 'CASTING TIME', value: data.casting_time },
          range_area: { name: 'RANGE', value: data.range },
          area: { name: 'AREA', value:  data.area_of_effect },
          components: { name: 'COMPONENTS', value: data.components },
          duration: { name: 'DURATION', value: data.duration },
          school: { name: 'SCHOOL', value: data.school.name },
          material: { name: 'MATERIAL', value: data.material },      
        },
        tags: [{name: 'Tag (type)', value: data.classes}, {name: 'Tag (roles)', value: data.subclasses}],
        desc: { name: 'Description', value: data.desc },
      }
    }
  }, [data]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={toggler}
        scroll="body"
        TransitionComponent={Transition}
      >
        <ThemeProvider theme={darkTheme}>
          <AppBar sx={relativeHeader}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => toggler(!isOpen)}
                aria-label="close"
              >
                <FontAwesomeIcon icon={faBackspace} title="Back" fixedWidth />
              </IconButton>
              <Typography sx={backBtnFullWidth} color="silver" variant="h6" align="right" component="div">
                {data.name}
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <SpellDetailsContent data={contentData} />
      </Dialog>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const relativeHeader = { position: "relative" };

const backBtnFullWidth = { ml: 2, flex: 1 }

export default SpellDetails;