import React, { Component, useState } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import GroupIcon from '@material-ui/icons/Group';
import HotelIcon from '@material-ui/icons/Hotel';
import PersonIcon from '@material-ui/icons/Person';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from "@material-ui/core/styles";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
    root : {
        color:'#3f3f80'
    },
    labels : {
        marginLeft:'5px',
        paddingTop:'3px'
    },
    boxStyle : {
        whiteSpace: 'nowrap',
        paddingTop:'5vh',
        paddingBottom:'5vh'
    },
    outerBox : {
        paddingLeft:'5vh', 
        paddingRight:'5vh'
    },
    counterDisplay : {
        paddingTop:'5px',
        marginLeft:'5vh', 
        marginRight:'5vh'
    }
});

function Counter(props) {

    const classes = useStyles();
    const [roomCount, setRoomCount] = React.useState(0);
    const [adultCount, setAdultCount] = React.useState(0);
    const [childrenCount, setChildrenCount] = React.useState(0);
    const [roomIncrementDisable, setRoomIncrementDisable] = React.useState(false);
    const [roomDecrementDisable, setRoomDecrementDisable] = React.useState(true);
    const [adultIncrementDisable, setAdultIncrementDisable] = React.useState(true);
    const [adultDecrementDisable, setAdultDecrementDisable] = React.useState(true);
    const [childrenIncrementDisable, setChildrenIncrementDisable] = React.useState(true);
    const [childrenDecrementDisable, setChildrenDncrementDisable] = React.useState(true);
    

    const handleRoomIncrement = () => {
        setRoomDecrementDisable(false);
        setChildrenIncrementDisable(false);
        setAdultIncrementDisable(false);
        // Checking Max limit of Rooms 
        if (roomCount === 5) {
            toast.info('Maximum Rooms Selected');
            setRoomIncrementDisable(true);
            return;
        }

        // Constraint check for having atleast 1 Guest for each Room
        if((adultCount + childrenCount) === roomCount || roomCount === 0) {
            let adultCounter = adultCount + 1;
            let roomCounter = roomCount + 1;
            setRoomCount(roomCounter);
            setAdultCount(adultCounter);
            setAdultDecrementDisable(false);
        }
        let count = roomCount + 1;
        setRoomCount(count);
    }

    const handleRoomDecrement = () => {
        setRoomIncrementDisable(false);
        let count = roomCount;
        count = count - 1;
        
        // Check for having atleast 1 room to proceed with Booking
        if(count === 1) {
            setRoomDecrementDisable(true);
            toast.info('Minimum 1 Room is Required for Booking');
        }
        
        // Setting adult count and child count to minimum value to meet constraint instead of setting children directlt to 0
        if ((adultCount + childrenCount) > (4*count)) {
            let tempCount = (4*count) - adultCount;
            tempCount > 0 ? setChildrenCount(tempCount):setChildrenCount(0);
            if (adultCount > 4*count) {
                setAdultCount(4*count);
            }
        }
        setRoomCount(count);
    }

    const handleAdultIncrement = () => {
        
        //Increasing room Count if adult reach room occupancy limit 
        if ((adultCount + childrenCount) === (4*roomCount) && (adultCount + childrenCount) < 20) {
            toast.info('Maximum 4 Guests allowed in each Room. Added another Room');
            if (roomCount < 5) {
                let roomCounter = roomCount + 1;
                setRoomCount(roomCounter);    
            }
            let count = adultCount + 1;
            setAdultCount(count);
            setRoomDecrementDisable(false);
            return;
        }
        
        // Checking constraint for maximum number of Guests in one Booking 
        if ((adultCount + childrenCount) < 20) {
            let count = adultCount + 1;
            setAdultCount(count);
        }

        // Checking constraint for maximum number of Guests in one Booking
        if ((adultCount + childrenCount) === 20) {
            toast.info('Maximum number of Guests Reached.');
            setAdultIncrementDisable(true);
            setChildrenIncrementDisable(true);
            return;
        }
    }

    const handleAdultDecrement = () => {
       
        // Check for atleast 1 adult for Booking
        if (adultCount === 1) {
            toast.info('Atleast 1 Adult is required to do Booking.');
            return;
        }
        let count = adultCount - 1;
        
        // Check atleast 1 Guest must be there for each room
        if ((count + childrenCount) < roomCount) {
            toast.info('Atleast 1 Guest must be present in each Room. Reduced a Room');
            let roomCounter = roomCount - 1;
            setRoomCount(roomCounter);
            setAdultCount(count);
            return;
        }
        
        // Checking constraint for maximum number of Guests in one Booking 
        if ((count + childrenCount) < 20) {
            setChildrenIncrementDisable(false);
        }
        setAdultIncrementDisable(false);
        setRoomIncrementDisable(false);
        setAdultCount(count);
    }

    const handleChildrenIncrement = () => {
        setChildrenDncrementDisable(false); 

        // Checking constraint for maximum Occupancy in Rooms
        if ((adultCount + childrenCount) === (4*roomCount) && (adultCount + childrenCount) < 20) {
            toast.info('Maximum 4 Guests allowed in each Room. Added another Room');
            if (roomCount < 5) {
                let roomCounter = roomCount + 1;
                setRoomCount(roomCounter);    
            }
            let count = childrenCount + 1;
            setChildrenCount(count);
            setRoomDecrementDisable(false);
            return;
        }

        // Checking constraint for maximum number of Guests in one Booking 
        if ((adultCount + childrenCount) < 20) {
            let count = childrenCount + 1;
            setChildrenCount(count);
        }

        // Checking constraint for maximum number of Guests in one Booking 
        if ((adultCount + childrenCount) === 20) {
            toast.info('Maximum number of Guests Reached.');
            setAdultIncrementDisable(true);
            setChildrenIncrementDisable(true);
            return;
        }
    }

    const handleChildrenDecrement = () => {
        
        // Disable decrement for preventing negative values
        if (childrenCount === 0) {
            setChildrenDncrementDisable(true);
            return;
        }

        // Check constraint for having atleast 1 Guest in each room
        let count = childrenCount - 1;
        if ((count + adultCount) < roomCount) {
            toast.info('Atleast 1 Guest must be present in each Room. Reduced a Room');
            let roomCounter = roomCount - 1;
            setRoomCount(roomCounter);
            setChildrenCount(count);
            return;
        }

        // Checking constraint for maximum number of Guests in one Booking 
        if ((count + adultCount) < 20) {
            setAdultIncrementDisable(false);
        }
        setChildrenIncrementDisable(false);
        setChildrenCount(count);
    }


    return (
        <div className={classes.root}>
            <Box display='flex' style={{marginLeft:'5px', paddingBottom: '10px'}}>
                <span><GroupIcon /></span>
                <span className={classes.labels}>Choose number of <strong>people</strong></span>
            </Box>
            <Box border='1px solid rgb(216 197 197)'>
                <Box display="flex" className={classes.outerBox}>
                    <Box width="80%" display="flex">
                        <Box display='flex' className={classes.boxStyle}>
                            <span><HotelIcon /></span>
                            <span className={classes.labels}>ROOMS</span>
                        </Box>
                    </Box>
                    <Box width="20%" display="flex" justifyContent="flex-end">
                        <Box display="flex" className={classes.boxStyle}>
                            <IconButton disabled={roomDecrementDisable} onClick={handleRoomDecrement} edge="end" aria-label="remove_room" size='small'>
                                <RemoveCircleIcon color="primary"/>
                            </IconButton>
                            <span className={classes.counterDisplay}>{roomCount}</span>
                            <IconButton disabled={roomIncrementDisable} onClick={handleRoomIncrement} edge="end" aria-label="add_room" size='small'>
                                <AddCircleOutlineIcon color="secondary"/>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Divider variant="middle" />
                <Box display="flex" className={classes.outerBox}>
                    <Box width="80%" display="flex">
                        <Box display="flex" className={classes.boxStyle}>
                            <span><PersonIcon /></span>
                            <span className={classes.labels}>ADULTS</span>
                        </Box>
                    </Box>
                    <Box width="20%" display="flex" justifyContent="flex-end">
                        <Box display="flex" className={classes.boxStyle}>
                            <IconButton disabled={adultDecrementDisable} onClick={handleAdultDecrement}  edge="end" aria-label="remove_adult" size='small'>
                                <RemoveCircleIcon color="primary"/>
                            </IconButton>
                            <span className={classes.counterDisplay}>{adultCount}</span>
                            <IconButton disabled={adultIncrementDisable} onClick={handleAdultIncrement}  edge="end" aria-label="add_adult" size='small'>
                                <AddCircleOutlineIcon color="secondary"/>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Divider variant="middle"/>
                <Box display="flex" className={classes.outerBox}>
                    <Box width="80%" display="flex">
                        <Box display="flex" className={classes.boxStyle}>
                            <span><ChildCareIcon /></span>
                            <span className={classes.labels}>CHILDREN</span>
                        </Box>
                    </Box>
                    <Box width="20%" display="flex" justifyContent="flex-end">
                        <Box display="flex" className={classes.boxStyle}>
                            <IconButton disabled={childrenDecrementDisable} onClick={handleChildrenDecrement}  edge="end" aria-label="remove_child" size='small'>
                                <RemoveCircleIcon color="primary"/>
                            </IconButton>
                            <span className={classes.counterDisplay}>{childrenCount}</span>
                            <IconButton disabled={childrenIncrementDisable} onClick={handleChildrenIncrement}  edge="end" aria-label="add_child" size='small'>
                                <AddCircleOutlineIcon color="secondary"/>
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default Counter;