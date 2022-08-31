import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { useState } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();
  const handleclick = () => {
    console.log('clicked', place.name);
  };
  // const [itin, setItin] = useState('');

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 150 }}
        image={
          place.photo
            ? place.photo.images.medium.url
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYxlUZGKnAXRHPw5oFUdBw_kRzsAg8T9oLvw&usqp=CAU'
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>
          {place.name}
        </Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating name='read-only' value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle1'>
            out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.price_level}
          </Typography>
        </Box>
        {/* <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.ranking}
          </Typography>
        </Box> */}

        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size='small' label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            gutterBottom
            variant='body2'
            color='textSecondary'
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}
        {/* {place?.phone && (
          <Typography
            gutterBottom
            variant='body2'
            color='textSecondary'
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
        {place?.open_now_text && (
          <Typography
            gutterBottom
            variant='body2'
            color='textSecondary'
            className={classes.spacing}
          >
            {place.open_now_text}
          </Typography>
        )} */}
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => window.open(place.web_url, '_blank')}
          >
            Trip Advisor
          </Button>
          <Button
            size='small'
            color='primary'
            onClick={() => window.open(place.website, '_blank')}
          >
            Website
          </Button>
          {/* <FormControl className={classes.formControl}>
            <InputLabel>Select Itinerary</InputLabel>
            <Select value={itin} onChange={(e) => setItin(e.target.value)}>
              <MenuItem value='restaurants'>Itin</MenuItem>
            </Select>
          </FormControl> */}
          <Button size='small' color='primary' onClick={handleclick}>
            Add to Itinerary
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
