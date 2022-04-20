import React, { useState, useEffect } from 'react'
import * as _ from 'lodash'

import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import { makeStyles, propsToClassKey } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
    tile: {
        width: '150px',
        margin: '10px',
        border: '1px solid red',
        '&:hover': {
            border: '1px solid blue'
        },
    },
    deleteButton: {
        // display: 'none',
        '&:hover': {
            display: 'inline'
        }
    }
}))

interface TileContainerProps {
    id: number,
    title: string,
    body: string,
    isFocused: boolean,
    deleteIdea: (id: number) => void
}
const TileContainer = ({
    id,
    title,
    body,
    isFocused,
    deleteIdea,
}: TileContainerProps) => {
    const classes = useStyles()
    const [hover, setHover] = useState(false);
    // const [statusDict, setStatusDict] = useState<any>(inputStatusDict)
    // const [isDirty, setIsDirty] = useState<boolean>(false)
    // const [isPublishAllowed, setIsPublishAllowed] = useState<boolean>(inputIsPublishAllowed)
    // const [warningMessage, setWarningMessage] = useState<string>(inputWarningMessage)

    // const strTemplateSetSceneCombinations = _.map(isStatic ? StaticTemplateSetSceneCombinations : TemplateSetSceneCombinations, (c) => c.join('_'))


    // useEffect(() => {
    //     if (inputStatusDict) {
    //         setStatusDict(inputStatusDict)
    //     }
    // }, [inputStatusDict])

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

    // const handlePublish = () => {
    //     onSave(statusDict)
    // }

    return (
        <Grid container direction="column" spacing={3} className={classes.tile} onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}>
            {hover && <IconButton
                className={classes.deleteButton}
                size="small"
                color="primary"
                aria-label="remove idea"
                onClick={() => {
                    deleteIdea(id)
                }}
            >
                <DeleteIcon />
            </IconButton>}
            <Grid item>id {id}</Grid>
            <Grid item>title {title}</Grid>
            <Grid item>body {body}</Grid>



        </Grid>
    )
}

export default TileContainer;