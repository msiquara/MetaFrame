import "./Model.css"
import { FormControl } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel'
import { Switch } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

function Model({addCamModel, modelPosition}){
    return (
        <div className="model__main">
            <div className='tools__model'> 
                <FormControl component={"fieldset"} variant="standard">
                    <FormControlLabel className="switch"
                        control={
                            <Switch onChange={(e)=>addCamModel(e.target.checked)}/>
                        }                
                        label="Camera Model"
                    />
                </FormControl>
            </div>   
            <FormControl className="form__main">
                <RadioGroup
                    name="model"
                    onChange={(e)=>modelPosition(e.target.value)}
                    defaultValue={'left'}
                    id='form__model'
                    className="unchecked"
                >
                    <FormControlLabel value="left"  control={<Radio />} label="Left" />
                    <FormControlLabel value="right" control={<Radio />} label="Right" />
                    <FormControlLabel value="top" control={<Radio />} label="Top" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default Model