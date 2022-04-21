import * as _ from 'lodash'
import { makeStyles } from '@mui/styles'
import { IDEAS_FETCH_REQUEST, IDEAS_UPLOAD_REQUEST, IDEAS_DELETE_REQUEST, IDEAS_UPDATE_REQUEST } from '@lib/redux/actions'
import { connect } from 'react-redux'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TileContainer from './detail/TileContainer'

const useStyles = makeStyles((theme: any) => ({
    cardGrid: {
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        height: '100%',
    }
    ,
    tile: {
        width: '150px',
        margin: '10px',
        border: '1px solid red'
    }
}))

interface BoardProps {
    isLoading: boolean
    ideas: any[]
    idea?: number
    getIdeas: () => void
    createIdea: () => void
    deleteIdea: (id: number) => void
    updateIdea: (id: number, title: string, body: string) => void
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

    const createIdea = () => {
        props.createIdea()
    }

    const deleteIdea = (id: number) => {
        props.deleteIdea(id)
    }

    const updateIdea = (id: number, title: string, body: string) => {
        props.updateIdea(id, title, body)
    }


    return (
        <Container className={classes.cardGrid}>
            <Grid container direction="column">
                <Grid item>
                    <Button color="primary"
                        variant="contained"
                        onClick={createIdea}>New Idea</Button>
                </Grid>
                <Grid item>
                    <Grid container direction="row">
                        {_.map(currentIdeas, (idea: any) => {
                            return (
                                <Grid item>
                                    <TileContainer id={idea.id} title={idea.title} body={idea.body} isFocused={false} deleteIdea={deleteIdea} saveIdea={updateIdea} />
                                </Grid>
                                // <Grid item className={classes.tile}>{JSON.stringify(idea)}</Grid>
                            )
                        })
                        }
                    </Grid>
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
        createIdea: () =>
            dispatch({
                type: IDEAS_UPLOAD_REQUEST,
                payload: {
                    params: {},
                },
            }),
        deleteIdea: (id: number) =>
            dispatch({
                type: IDEAS_DELETE_REQUEST,
                payload: {
                    params: { id },
                },
            }),
        updateIdea: (id: number, title: string, body: string) =>
            dispatch({
                type: IDEAS_UPDATE_REQUEST,
                payload: {
                    params: { id },
                    data: { title, body }
                },
            }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
