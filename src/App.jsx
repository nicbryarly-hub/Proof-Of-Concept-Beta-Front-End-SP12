import { useState } from 'react'
import './App.css'

function App() {
  const [previewUrl, setPreviewUrl] = useState ('')
  const [moduleCount, setModuleCount] = useState (12)
  const [mediaFiles, setMediaFiles] = useState ([])
  const [imageRatio, setImageRatio] = useState(1)

  //Used to help display the image given in input
  function handleFileChange(event){
    const selectedFiles = Array.from(event.target.files)
    setMediaFiles(previousFiles => [...previousFiles, ...selectedFiles])

    const file = event.target.files[0]
    if(!file) return

    const imageUrl = URL.createObjectURL(file)
    setPreviewUrl(imageUrl)
  }

  //gives a a number of rows and columns for our grid based on number of modules
  const count = Math.max(1, Math.floor(moduleCount))
  let rows = Math.floor(Math.sqrt(count))

  while (count % rows !== 0) {
    rows--
  }

  const columns = count / rows

  
  return (
    <div>
      <div className ="title">
        <h1>SP12</h1>
      </div>


      <div className = "Workspace">

        <div className = "MediaSpace">
          
          <p>Media-Panel</p>
          <input 
            type="file" 
            accept="image/*, video/*" 
            multiple
            onChange = {handleFileChange} />

            <div className="Media-List">
              {mediaFiles.map((file, index) => (
                <button key={index} type="button" onClick={() => setPreviewUrl(URL.createObjectURL(file))}>
                  Image {index + 1}
                </button>
              ))}
</div>
        </div>


        <div className = "Preview-Column" >
          <label>
            Module Count
            <input 
              type = "number" 
              min = "0" 
              value={moduleCount}
              onChange={(event) => setModuleCount(Number(event.target.value))}
              step="2"
            />
          </label>
          <div className = "PreviewSpace">
            <div className = "Image-Wrap"
              style={{
              width: `min(100%, calc((100% - 4px) * ${imageRatio} + 4px))`
              }}
            >
              <img 
                src = {previewUrl} 
                alt = "selected image Preview"
                onLoad={(event) => {
                  const image = event.currentTarget
                  setImageRatio(image.naturalWidth / image.naturalHeight)
                }}
                />
              <div 
                className = "Grid-Overlay" 
                style={{
                  backgroundSize: `${100 / columns}% ${100 / rows}%`
                }}
                >
                
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
