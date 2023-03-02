import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags} from '@fortawesome/free-solid-svg-icons'

function SpellDetailsContent({ data }) {
  const { fields, tags, desc } = data;

  const values = Object.values(fields);

  return (
    <>
      <Box sx={boxContentBlock}>
        <Stack spacing={4}>
          <Grid container alignItems="center" justifyContent="center" columns={15}>
            {
              fields && values.map((item, index) => {
                return (
                  <Grid key={index} item xs={8} md={5}>
                    <Stack spacing={2} sx={stackItem}>
                      <Typography variant="button" color="orange" gutterBottom>
                        <strong>{item.name}</strong>
                      </Typography>
                      <Typography variant="caption" gutterBottom>
                        <strong>
                        {
                          renderValue(item.value)
                        }                          
                        </strong>
                      </Typography>
                    </Stack>
                  </Grid>                  
                )
              })
            }                      
          </Grid>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}          
          >
            {
              tags && tags.map((item, index) => (
                <Chip key={index} icon={<FontAwesomeIcon icon={faTags} title={item.name} fixedWidth />} color="success" label={renderClassValue(item.value)} />
              ))
            }
          </Stack>
          <Grid container columns={10} sx={descBlock}>
            <Grid item xs={2} >
              <Avatar sx={spellIconSize} src={cauldron} />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="button" color="orange" gutterBottom>
                <strong>{desc && desc.name}</strong><br /><br />
              </Typography>
              {
                desc && desc.value.map((text, index) => (
                  <Typography sx={{ fontFamily: 'Monospace', fontWeight: 'bold' }} key={index} variant="overline" gutterBottom>
                    {text}
                  </Typography>
                ))
              }
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
}

const dnd_bg = "https://raw.githubusercontent.com/Chen-BBe/my-page-assets/main/img/dnd_bg_fire.jpg";
const cauldron = "https://raw.githubusercontent.com/Chen-BBe/my-page-assets/main/img/cauldron-3.png";

const renderValue = (value) => {
  if (typeof value === 'object') {
    return Object.values(value)
  }
  return value === undefined ? 'None' : value
};

const renderClassValue = (value) => {
  if (value && value.length > 0) {
    return  Object.values(value.map((v) => v.name));
  }
  return 'Unknown'
};

const boxContentBlock = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${dnd_bg})`,
  backgroundSize: "cover",
  color: "#f5f5f5"
};

const stackItem = { padding: "2vh", textAlign: "center" };

const spellIconSize = { width: "7vh", height: "7vh", color: "black" };

const descBlock = { padding: "2vh" };

export default SpellDetailsContent;