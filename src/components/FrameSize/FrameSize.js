import {Slider} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material'
import { NativeSelect } from '@mui/material'
import './FrameSize.css'

function prctgText(value){
    let label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
    label[0] !== undefined? label[0].innerHTML = value+'%': label = document.getElementsByClassName('MuiSlider-valueLabelLabel')
}

function FrameSize({increaseBorder, border_slider}){
    /* 
    NativeSelect = label size and placement 
    */
    return (
        <div className='frame__size'>
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
                    className='frame__slider'
                    onChangeCommitted={increaseBorder}                    
                    defaultValue={border_slider.min}
                    getAriaValueText={prctgText}
                    step={border_slider.step}
                    marks
                    min={border_slider.min}
                    max={border_slider.max}
                    valueLabelDisplay="auto"
                />

            </FormControl>
        </div>
    )
}

export default FrameSize