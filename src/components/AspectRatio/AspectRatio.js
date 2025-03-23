import React from 'react'
import './AspectRatio.css'
import { FormControl, FormLabel } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

function AspectRatio({ changeAspectRatio }) {
    return (
        <div className='aspect__main'>
            <FormControl className="form__main">
                <FormLabel id="aspect_label">Aspect Ratio</FormLabel>
                <RadioGroup
                    name="aspect"
                    onChange={(e)=>changeAspectRatio(e.target.value)}
                    defaultValue={'original'}
                    id='form__aspect'
                >
                    <FormControlLabel value="original" control={<Radio />} label="Original" />
                    <FormControlLabel value="square" control={<Radio />} label="Square" />
                    <FormControlLabel value="4:5" control={<Radio />} label="4:5 (Instagram)" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default AspectRatio