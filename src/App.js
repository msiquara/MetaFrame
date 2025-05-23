import "./App.css"
import "./Fonts.css"
import ExifReader from "/node_modules/exifreader/src/exif-reader"
import Tools from "./components/Tools"
import { useState } from "react"
import { AspectRatio } from "@mui/icons-material"

let img = new Image()
let img_pos_x
let img_pos_y
let ratio = 0
let canvas 
let border 
let a_ratio = "original"
let orientation
let font_size
let fcolor = "white"
let txtcolor = "black"
let cwidth = 0
let cheight = 0
let model_position  = 'left'
let date_style = 'dmy'
let right_corner = []
let left_corner = []
let top_corner = []
let date_corner = []
let bold_checked = false
let model_checked = false
let date_checked = false
let font = 'Courier'
let tags_list = {
    focal_length: '',
    f_number: '',
    exposure: '',
    iso: 0,
    date: ''
}

function App() {
    let [border_slider, setBorderSlider] = useState({
        min: 4,
        max: 14,
        step: 2,
        value: 4
    })
    let [font_slider, setFontSlider] = useState({
        min: 1,
        max: 25,
        step: 2,
        value: 1
    })
    //meta_data/mdata to show info in placeholder's input in tools(focal_length, f/#)
    let mdata = {
        focal_length: 0,
        f_number: 0,
        exposure: 0,
        iso: 0
    }
    let [meta_data, setMetaData] = useState([{
        model: 0,
        focal_length: 0,
        f_number: 0,
        exposure: 0,
        iso: 0,
        date: 0
    }])    
   
    var FontFaceObserver = require('fontfaceobserver')
   
    const fonts = [
        new FontFaceObserver('CourierBold'),
        new FontFaceObserver('Courier'), 
        new FontFaceObserver('CormorantBold'), 
        new FontFaceObserver('Cormorant'), 
        new FontFaceObserver('ErikasBueroBold'),  
        new FontFaceObserver('ErikasBuero'),  
        new FontFaceObserver('LatoBold'), 
        new FontFaceObserver('Lato'),  
        new FontFaceObserver('MinimalBold'),
        new FontFaceObserver('Minimal'),  
        new FontFaceObserver('digital7') 
    ];

    fonts.forEach(font => {
        font.load().then().catch(e => {
            console.error(e)
        })
    })

    async function createTags(file){
        let tags = await ExifReader.load(file)

        tags_list.model = tags.Model !== undefined? tags.Model.description.trim(): ('n/a')
        tags_list.focal_length = tags.FocalLength !== undefined? tags.FocalLength.description: ('n/a')
        tags_list.f_number = tags.FNumber !== undefined? tags.FNumber.description: ('n/a')
        tags_list.exposure = tags.ExposureTime !== undefined? tags.ExposureTime.description: ('n/a')
        tags_list.iso = tags.ISOSpeedRatings !== undefined? tags.ISOSpeedRatings.description: ('n/a')
        tags_list.date = tags.DateTimeOriginal !== undefined? tags.DateTimeOriginal.description.split(' ')[0]: ('n/a')

        mdata.focal_length = tags_list.focal_length
        mdata.f_number = tags_list.f_number
        mdata.exposure = tags_list.exposure
        mdata.iso = tags_list.iso
        setMetaData(mdata)
    }

    function createImage(){     
        canvas = document.getElementById('canvas')
        let uploader = document.getElementById('uploader')
        let file = uploader.files[0]
        
        createTags(file)        
        img.src = URL.createObjectURL(file)

        img.onload = function(){
            //setBorderSlider(slider)
            img.width >= img.height ? orientation = 'landscape': orientation = 'portrait'
            //border = border_slider.value*img.width/100
            changeAspectRatio(a_ratio)
            //font_size_default = font_size
            img_pos_x = border
            img_pos_y = border*ratio
            updateBorder()
            //canvas.style.maxWidth = `calc(95vh*(${cwidth/cheight})`
        }
        
        document.getElementById('focal_length').value = ''
        document.getElementById('f_number').value = ''
        let enable = document.querySelectorAll(".disabled")
        if (enable[0] !== undefined) enable[0].classList.toggle('disabled') 
    }

    function updateBorder(){
        let ctx = canvas.getContext('2d', {alpha: false})  
        cwidth = canvas.width = img.width + img_pos_x*2
        cheight = canvas.height = img.height + img_pos_y*2
        left_corner[0] = img_pos_x
        left_corner[1] = cheight - img_pos_y/2 + font_size/3.3
        right_corner[1] = left_corner[1]
        top_corner[0] = img_pos_x
        top_corner[1] = img_pos_y/2 + font_size/2.5
        ctx.fillStyle = fcolor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = txtcolor
        ctx.font = `${font_size}px ${font}`
        updateDataPosition()
        console.log(`border: ${border} fonte: ${font_size}px ${font}`)
        ctx.drawImage(img, img_pos_x, img_pos_y)
        updateDate()        
    }

    function editorData(el){
        let value = el.value
        let key = el.id

        if (value == ''){
            value = meta_data[key]
        }
        tags_list[key] = value
        updateBorder()
    }

    function updateDataPosition(){
        let ctx = canvas.getContext('2d', {alpha: false})
        let data_text = tags_list.focal_length+', '+tags_list.f_number+', '+tags_list.exposure+'s, '+'ISO '+ tags_list.iso
        let model_text = tags_list.model

        //center data position and change it's y pos for landscape pics
        if (!model_checked){          
            if (a_ratio == '4:5'){
                let txt_dimension = ctx.measureText(data_text).width
                left_corner[0] = (cwidth/2) - (txt_dimension/2)                
                //ctx.fillText(data_text, left_corner[0], left_corner[1])
                
                if (orientation == 'landscape') {
                    left_corner[1] = img.height + img_pos_y + font_size
                }
            }  
            ctx.fillText(data_text, left_corner[0], left_corner[1])
            return
        }        

        switch(model_position){
            case 'left':    
                let txt_dimension = ctx.measureText(data_text).width
                right_corner[0] = cwidth - img_pos_x - txt_dimension    
                ctx.fillText(model_text, left_corner[0], left_corner[1])
                ctx.fillText(data_text, right_corner[0], right_corner[1])   
                break
            case 'right':
                let model_dimension = ctx.measureText(model_text).width
                right_corner[0] = cwidth - img_pos_x - model_dimension
                ctx.fillText(data_text, left_corner[0], left_corner[1])
                ctx.fillText(model_text, right_corner[0], right_corner[1])
                break
            case 'top':
                ctx.fillText(model_text, top_corner[0], top_corner[1])
                ctx.fillText(data_text, left_corner[0], left_corner[1])
                break
            default:
        }
    }

    function updateDate(){
        let date = (tags_list.date)
        date = date.split(':') 
        date[0] = "'"+date[0].slice(2) 

        switch(date_style){
            case 'dmy':
                date = [date[2],date[1],date[0]].join('-')
                break
            case 'mdy':
                date = [date[1],date[2],date[0]].join('-')
                break
            case 'ymd':                
                date = date.join('-')
                break
        }

        if (date_checked){
            let ctx = canvas.getContext('2d', {alpha: false})
            ctx.font = `${font_size}px digital7`  
            let date_dimension = ctx.measureText(date).width
            date_corner[0] = cwidth - img_pos_x - font_size - date_dimension 
            date_corner[1] = cheight - img_pos_y - font_size
            ctx.fillStyle = "rgb(235 180 0/ 70%)"
            ctx.shadowColor = "rgb(207 81 5)"
            ctx.shadowOffsetX = 1
            ctx.shadowOffsetY = 0
            ctx.shadowBlur = 22
            ctx.fillText(date, date_corner[0], date_corner[1])
        }
    }

    const increaseBorder = (e, value) => {        
        //always change the ratio when square and font_size when original
        border_slider.value = value
        changeAspectRatio(a_ratio)
        setBorderSlider(border_slider)                 
    }     

    function changeAspectRatio(value){
        a_ratio = value
        console.log(orientation)

        if (a_ratio == 'square'){
            if (orientation == 'landscape'){
                border = border_slider.value*img.width/220
                ratio = (img.width+2*border-img.height) / (2*border)
                font_size = (1.5+(font_slider.value/100))*(img.width/70)
                img_pos_x = border
                img_pos_y = border*ratio            
            }
            if (orientation == 'portrait'){
                border = border_slider.value*img.height/200
                ratio = (img.height+2*border-img.width) / (2*border)
                font_size = (1.1+(font_slider.value/100))*(img.height/70)
                img_pos_x = border*ratio
                img_pos_y = border
            } 
        } else if (a_ratio == '4:5'){
            if (orientation == 'portrait'){
                border = border_slider.value*img.height/170
                ratio = (0.8*(img.height + 2*border)-img.width)/(2*border)
                font_size = (1.1+(font_slider.value/100))*(img.height/70)
                img_pos_x = border*ratio
                img_pos_y = border
            }
            if (orientation == 'landscape'){
                border = border_slider.value*img.width/170
                ratio = (1.25*(img.width + 2*border)-img.height)/(2*border)
                font_size = (1.35+(font_slider.value/100))*(img.width/70)
                img_pos_x = border
                img_pos_y = border*ratio
            }
        } else {
            border = border_slider.value*img.width/100
            ratio = img.height/img.width
            font_size = Math.floor((img.width/50))*(1+(font_slider.value/100))
            img_pos_x = border
            img_pos_y = border*ratio
        
            if (orientation == 'portrait'){
                border = border_slider.value*img.height/100
                font_size = Math.floor((img.height/50))*(1+(font_slider.value/100))
            }
        }

        updateBorder()
    }

    function saveImage(){
        let canvasURL = canvas.toDataURL('image/jpeg')
        let link = document.createElement('a')
        link.href = canvasURL
        link.download = 'new_metaframe.jpg'
        link.click()
        link.remove()
    }

    function changeFrameColor(value){
        fcolor = value
        document.getElementById('fbutton').style.backgroundColor = fcolor
        updateBorder()
    }

    function changeTxtColor(value){
        txtcolor = value
        document.getElementById('txtbutton').style.backgroundColor = txtcolor
        updateBorder()
    }

    function changeFont(value){
        font = value

        if (bold_checked){
            boldFont(bold_checked)
            return
        }

        updateBorder()
    }

    function boldFont(checked){
        if (checked){
            font = font+'Bold'
        }
        //uncheck
        else{
            font = font.replace('Bold', '')
        }

        updateBorder()
        bold_checked = checked
    }

    //fix this
    const increaseFont = (e, value) => {
        font_slider.value = value
        changeAspectRatio(a_ratio)
        //font_size = font_size_default + font_size_default*(font_slider.value/100)
        //updateBorder()
        setFontSlider(font_slider) 
        return
    }

    function addCamModel(checked){
        let form = document.getElementById('form__model')
        form.classList.toggle('unchecked')
        model_checked = checked

        updateBorder()
    }

    function modelPosition(value){
        model_position = value

        updateBorder()
    }

    function addDate(checked){
        let form = document.getElementById('form__date')
        form.classList.toggle('unchecked')
        date_checked = checked
        
        updateBorder()        
    }

    function dateStyle(value){
        date_style = value

        updateBorder()
    }

    return(
        <div className="App">
            <div className="App__main">                 
                <canvas id="canvas"></canvas>  
            </div>
            <Tools
                createImage = {createImage}
                increaseBorder = {increaseBorder}
                changeAspectRatio={changeAspectRatio}
                editorData = {editorData}
                border_slider = {border_slider}
                meta_data = {meta_data}
                changeFrameColor = {changeFrameColor}
                changeTxtColor = {changeTxtColor}
                changeFont ={changeFont}
                boldFont = {boldFont}
                increaseFont = {increaseFont}
                font_slider = {font_slider}
                addCamModel = {addCamModel}
                modelPosition={modelPosition}
                addDate = {addDate}
                dateStyle = {dateStyle}
                saveImage = {saveImage}            
            />            
        </div>
    ) 
}

export default App
