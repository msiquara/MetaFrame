import React from 'react'
import "./Tools.css"
import Model from "./Model/Model"
import Date from "./Date/Date"
import EditData from "./EditData/EditData"
import "@melloware/coloris/dist/coloris.css"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AspectRatio from './AspectRatio/AspectRatio'
import FrameSize from './FrameSize/FrameSize'
import ColorPicker from './ColorPicker/ColorPicker'
import SelectFont from './SelectFont/SelectFont'
import FontSize from './FontSize/FontSize'
import {FileUpload} from '@mui/icons-material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Tools({createImage, increaseBorder, changeAspectRatio, editorData, border_slider, meta_data, changeFrameColor, changeTxtColor, changeFont, boldFont,
                increaseFont, font_slider, addCamModel, modelPosition, addDate, dateStyle, saveImage}){
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <div className='tools'>
                <label className="file__load">
                    <FileUpload />
                    {'Upload'}
                    <input type="file" id="uploader" onChange={createImage}/>
                </label>
                <div className="tools__main disabled">

                    <FrameSize
                        increaseBorder={increaseBorder}
                        border_slider={border_slider}
                    />

                    <AspectRatio
                        changeAspectRatio={changeAspectRatio}
                    />

                    <EditData
                        meta_data = {meta_data}
                        editorData = {editorData}
                    />

                    <ColorPicker
                        changeFrameColor={changeFrameColor}
                        changeTxtColor={changeTxtColor}
                    />

                    <SelectFont
                        changeFont={changeFont}
                        boldFont={boldFont}
                    />

                    <FontSize
                        increaseFont={increaseFont}
                        font_slider={font_slider}
                    />
                            
                    <Model
                        addCamModel={addCamModel}
                        modelPosition = {modelPosition}
                    />
                    <Date
                        addDate = {addDate}
                        dateStyle = {dateStyle}
                    />
                    <label className='file__load'>
                        <FileDownloadIcon/>
                        {"Download"}
                        <button className='disabled' id="button__save" onClick={saveImage}><FileDownloadIcon/>Download</button>
                    </label>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Tools