import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import './css/demo.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
    iconButtonContainerLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    iconButtonContainerRight: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
}));

export default function CardButtons({right, left,}) {
    const classes = useStyles();

    useEffect(() => {
        let animateButton = function(e) {
            e.target.classList.remove('animate');
            e.target.classList.add('animate');
            setTimeout(() => {
                e.target.classList.remove('animate');
            }, 800);
        };
        let likeButtons = document.getElementsByClassName("like-button");
        let dislikeButtons = document.getElementsByClassName("dislike-button");

        for (var i = 0; i < likeButtons.length; i++) {
            likeButtons[i].addEventListener('click', animateButton, false);
            dislikeButtons[i].addEventListener('click', animateButton, false);
        }
    }, []);

    return (
        <Grid container justify="space-between" className={classes.root}>
            <Grid item xs={6} className={classes.iconButtonContainerLeft}>
                <button onClick={left} className="dislike-button">
                    <FaThumbsDown color="rgb(247, 18, 18)" size={38} style={{position: 'relative', zIndex: -9999 }} />
                </button>
            </Grid>
            <Grid item xs={6} className={classes.iconButtonContainerRight}>
                <button onClick={right} className="like-button">
                    <FaThumbsUp color="rgb(64, 233, 31)" size={38} style={{position: 'relative', zIndex: -9999 }} />
                </button>
            </Grid>
        </Grid>
    );
}
