import React, { useState, useEffect, useRef } from 'react'
import * as _ from 'lodash'

import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import { makeStyles, propsToClassKey } from '@mui/styles'
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme: any) => ({
    tile: {
        width: '150px',
        margin: '10px',
        // border: '1px solid red',
        backgroundColor: '#eee',
        '&:hover': {
            border: '1px solid #aaa'
        },
    },
    deleteButtonContainer: {
        // marginRight: '25px',
        border: '1px solid black'
    }
}))

interface TileContainerProps {
    id: number,
    title: string,
    body: string,
    isFocused: boolean,
    deleteIdea: (id: number) => void
    saveIdea: (id: number, title: string, body: string) => void
}
const TileContainer = ({
    id,
    title: inputTitle,
    body: inputBody,
    isFocused,
    deleteIdea,
    saveIdea,
}: TileContainerProps) => {
    const classes = useStyles()
    const inputReference = useRef(null);
    const [hover, setHover] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [title, setTitle] = useState(inputTitle);
    const [body, setBody] = useState(inputBody);
    // const [statusDict, setStatusDict] = useState<any>(inputStatusDict)
    // const [isDirty, setIsDirty] = useState<boolean>(false)
    // const [isPublishAllowed, setIsPublishAllowed] = useState<boolean>(inputIsPublishAllowed)
    // const [warningMessage, setWarningMessage] = useState<string>(inputWarningMessage)

    // const strTemplateSetSceneCombinations = _.map(isStatic ? StaticTemplateSetSceneCombinations : TemplateSetSceneCombinations, (c) => c.join('_'))


    useEffect(() => {
        if (isFocused && inputReference && inputReference.current) {
            (inputReference as any).current.focus()
            // const timeout = setTimeout(() => {
            //     inputReference.current.click();
            // }, 100);
            // return () => {
            //     clearTimeout(timeout);
            // };
        }
    }, [isFocused, inputReference])

    useEffect(() => {
        console.log('id', id, 'hover', hover)
        if (!hover && dirty) {
            console.log("NEED TO SAVE AND SET AS NOT DIRTY ANYMORE")
            saveIdea(id, title, body)
        }
    }, [hover])

    // useEffect(() => {
    //     setIsPublishAllowed(inputIsPublishAllowed)
    // }, [inputIsPublishAllowed])

    // useEffect(() => {
    //     setWarningMessage(inputWarningMessage)
    // }, [inputWarningMessage])

    // const onChangeIsEnabled = (env: any, activeScene: any) => {
    //     const updatedDict = _.cloneDeep(statusDict)
    //     _.set(updatedDict, [env, activeScene], !_.get(updatedDict, [env, activeScene]))
    //     setStatusDict(updatedDict)
    //     setIsDirty(true)
    // }

    // const handleReset = () => {
    //     setStatusDict(inputStatusDict)
    //     setIsDirty(false)
    // }

    const handleTitleChange = (e: any) => {
        console.log('===')
        console.log(e)
        console.log('===')
        setDirty(true)
        setTitle(e.target.value)
    }

    const handleBodyChange = (e: any) => {
        console.log('===')
        console.log(e)
        console.log('===')
        setDirty(true)
        setBody(e.target.value)
    }

    return (
        <Grid
            container
            direction="column"
            alignItems="stretch"
            alignContent="space-between"
            className={classes.tile}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            style={isFocused ? { border: '1px solid #1976d2' } : {}}
        >

            <Grid item>
                <Grid container direction="row" alignContent='space-between'>
                    <Grid alignSelf="flex-start" item sm={9}>id {id}</Grid>
                    {hover &&
                        <Grid item sm={3}>
                            <IconButton
                                className={classes.deleteButtonContainer}
                                size="small"
                                color="primary"
                                aria-label="remove idea"
                                onClick={() => {
                                    deleteIdea(id)
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>}

                </Grid>

            </Grid>


            <Grid item >
                <TextField
                    label="Title"
                    variant="filled"
                    size="small"
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth />
            </Grid>
            <Grid item>
                <TextField
                    ref={inputReference}
                    label="Body"
                    variant="filled"
                    size="small"
                    value={body}
                    onChange={handleBodyChange}
                    focused={isFocused}
                    fullWidth />
            </Grid>



        </Grid >
    )
}

export default TileContainer;