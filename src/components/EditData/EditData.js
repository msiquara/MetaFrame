import "./EditData.css"
import {TextField} from '@mui/material'

function EditData({meta_data, editorData}){
    return (
        <div className="main__edit">
            <TextField 
                label="Focal length"
                variant="standard"
                id="focal_length"
                defaultValue={meta_data.focal_length}
                className="edit__box"
                onInput={(e) => editorData(e.target)}
                placeholder={meta_data.focal_length}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <TextField 
                label="f/#"
                variant="standard"
                id="f_number"
                className="edit__box"
                placeholder={meta_data.f_number}
                onInput={(e) => editorData(e.target)}
                InputLabelProps={{
                    shrink: true
                }}
            />
        </div>
    )
}

export default EditData