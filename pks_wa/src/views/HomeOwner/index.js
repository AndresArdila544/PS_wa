import React, { Component } from 'react';
import { useQuery} from "@apollo/client";
import { GET_PARKINGS_BY_HOME_OWNER_ID  } from '../../GraphQL/Querys';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MapShowPins from '../../components/MapShowPins'
import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function Home (props) {
    
    const {data,loading} = useQuery(GET_PARKINGS_BY_HOME_OWNER_ID,{variables:{id:parseInt(localStorage.getItem('LoggedId'))}})
    //const {data,loading} = makeGetLuminary();
    const classes = useStyles();

    if (loading) return (
      
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

    function getlocations () {
       return data.par_getParkingByIdPluLoc
    }

    return (
      <div>
        
        <MapShowPins obtainLocations={getlocations} />
        
      </div>
    );
  
}
