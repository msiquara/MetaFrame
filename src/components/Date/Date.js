import "./Date.css"
import { FormControl } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel'
import { Switch } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

function Date({addDate, dateStyle}){
    return (
        <div className="date__main">
            <div className='tools__date'>
                <FormControl component={"fieldset"} variant="standard">
                    <FormControlLabel className="switch"
                        control={
                            <Switch onChange={(e)=>addDate(e.target.checked)}/>
                        }                
                        label="Date"
                    />
                </FormControl>
            </div>
            <FormControl className="form__main">
                <RadioGroup
                    name="date"
                    onChange={(e)=>dateStyle(e.target.value)}
                    defaultValue={'dmy'}
                    id='form__date'
                    className="unchecked"
                >
                    <FormControlLabel value="dmy"  control={<Radio />} label="dd-mm-yy" />
                    <FormControlLabel value="mdy" control={<Radio />} label="mm-dd-yy" />
                    <FormControlLabel value="ymd" control={<Radio />} label="yy-mm-dd" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Date