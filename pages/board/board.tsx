import * as _ from 'lodash'
import { makeStyles } from '@mui/styles'
import { IDEAS_FETCH_REQUEST } from '@lib/redux/actions'
import { connect } from 'react-redux'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const useStyles = makeStyles((theme: any) => ({
    cardGrid: {
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        height: '100%',
    }
}))

interface BoardProps {
    isLoading: boolean
    ideas: any[]
    idea?: number
    getIdeas: () => void
}

const Board = (props: BoardProps) => {
    const classes = useStyles()
    const router = useRouter()

    const [currentIdeas, setCurrentIdeas] = useState([] as any[])

    // Handle load Ideas
    useEffect(() => {
        props.getIdeas()
    }, [])

    const initIdeas = (inputIdeas: any[]) => {
        console.log('inputIdeas', inputIdeas)

        setCurrentIdeas(inputIdeas)
    }

    useEffect(() => {
        if (_.isEmpty(props.ideas)) return
        initIdeas(props.ideas)
    }, [props.ideas])


    return (
        <Container className={classes.cardGrid}>
            <Grid container>
                <Grid item md={3}>
                    Hi
                </Grid>
                <Grid item md={9}>
                    Hey
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state: any) => {
    const { ideas } = state
    return {
        ideas: ideas.items,
        isLoading: ideas.isLoading,
        newIdea: ideas.newIdea,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getIdeas: () =>
            dispatch({
                type: IDEAS_FETCH_REQUEST,
                payload: {
                    params: {},
                },
            }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
