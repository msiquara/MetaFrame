import React from 'react'
import {Slider} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material'
import { NativeSelect } from '@mui/material'
import './FontSize.css'

function FontSize({increaseFont, font_slider}) {
  return (
    <div>
        <FormControl>
            <InputLabel className='frame__label' variant="standard" htmlFor="uncontrolled-native">
                Frame size
            </InputLabel>
            <NativeSelect 
                className='display_none' 
                defaultValue={"Something"}
                inputProps={{
                    name: 'font'
                }}
            >     
                <option id='courier' value={'Display'}>{'none'}</option>
            
            </NativeSelect>
            <Slider
                className='font__slider'
                onChangeCommitted={increaseFont}                    
                defaultValue={font_slider.min}
                step={font_slider.step}
                marks
                min={font_slider.min}
                max={font_slider.max}
                valueLabelDisplay="auto"
            />
        </FormControl>
    </div>
  )
}

export default FontSize