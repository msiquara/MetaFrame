import './SelectFont.css'
import FormControl from '@mui/material/FormControl'
import {InputLabel} from '@mui/material'
import {NativeSelect} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

function SelectFont({changeFont, boldFont}){
    return (
        <div className='select__font'>
            <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Font
                </InputLabel>
                <NativeSelect 
                    defaultValue={"Courier"}
                    onChange={(e)=>changeFont(e.target.value)}
                    inputProps={{
                        name: 'font'
                    }}
                >
                    <option id='courier' value={'Courier'}>{'Courier'}</option>
                    <option id='cormorant' value={'Cormorant'}>{'Cormorant'}</option>
                    <option id='erikas' value={'ErikasBuero'}>{'Erikas Buero'}</option>
                    <option id='lato' value={'Lato'}>{'Lato'}</option>
                    <option id='minimal' value={'Minimal'}>{'Minimal'}</option>
                </NativeSelect>
            </FormControl>
            <FormControl >
                <FormControlLabel 
                    className='font__bold'
                    labelPlacement="end"
                    label="Bold"
                    control={<Checkbox onInput={(e)=>boldFont(e.target.checked)}/>} 
                />
            </FormControl>
        </div>      
    )
}

export default SelectFont