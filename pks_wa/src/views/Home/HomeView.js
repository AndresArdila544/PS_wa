import React, { Component } from 'react';
import { useQuery} from "@apollo/client";
import { GET_PARKINGS, GET_LOCATION } from '../../GraphQL/Querys';
import { makeStyles } from '@material-ui/core/styles';
import MapShowPins from '../../components/MapShowPins'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { set } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function Home (props) {
    
    const {data,loading} = useQuery(GET_PARKINGS)
    const classes = useStyles();
    if (loading) return (
      
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

    function getlocations () {
       return data.par_getParkingsLocation
    }

    return (
      <div>
        <MapShowPins obtainLocations={getlocations} />
      </div>
    );
  
}
