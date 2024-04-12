import "./ColorPicker.css"
import Coloris from "@melloware/coloris"
import TextField from '@mui/material/TextField'

function ColorPicker({ changeFrameColor, changeTxtColor }) {
    Coloris.init()
    Coloris({el: "#fcolor",
            themeMode: 'dark',
            wrap: false,
            alpha: false,
            focusInput: false
    })
    Coloris({el: "#txtcolor",
            themeMode: 'dark',
            wrap: false,
            alpha: false,
            focusInput: false
    })

    return (
        <div className="color__main">
            <div className="color__picker">
                    <TextField 
                        label="Frame color"
                        variant="standard"
                        data-coloris=""
                        id="fcolor"
                        className="color__box"
                        defaultValue={"#ffffff"}
                        onInput={(e) => changeFrameColor(e.target.value)}
                        inputProps={{
                            readOnly: true
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <button
                        type="button"
                        id="fbutton"
                        className="color__button"
                    ></button>
            </div>
            <div className="color__picker">
                    <TextField 
                        label="Text color"
                        variant="standard"
                        data-coloris=""
                        id="txtcolor"
                        className="color__box"
                        defaultValue={"#000000"}
                        onInput={(e) => changeTxtColor(e.target.value)}
                        inputProps={{
                            readOnly: true
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <button
                        type="button"
                        id="txtbutton"
                        className="color__button"
                    ></button>
            </div>
        </div>
    );
}

export default ColorPicker