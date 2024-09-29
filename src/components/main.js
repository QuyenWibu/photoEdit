import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { fabric } from 'fabric';
import cut from '../icon/cut.svg';
import shape from '../icon/shapes.png';

export default function Main() {
    const location = useLocation();
    const imageUrl = location.state?.imageUrl;
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [showShapeOptions, setShowShapeOptions] = useState(false);
    const [showAdjust, setShowAdjust] = useState(false);
    const [activeObject, setActiveObject] = useState(null);
    const [filters, setFilters] = useState({
        brightness: 0,
        contrast: 0,
        saturation: 0,
        grayscale: false,
        sepia: false,
        blur: 0,
        sharpen: 0,
    });


    useEffect(() => {
        
        if (canvasRef.current) {
            const fabricCanvas = new fabric.Canvas(canvasRef.current, {
                width: 800,
                height: 600
            });
            setCanvas(fabricCanvas);
            fabricCanvas.on('selection:created', (e) => setActiveObject(e.target));
            fabricCanvas.on('selection:updated', (e) => setActiveObject(e.target));
            fabricCanvas.on('selection:cleared', () => setActiveObject(null));
            return () => {
                fabricCanvas.dispose();
            };
        }
    }, []);

    useEffect(() => {
        if (canvas && imageUrl) {
            fabric.Image.fromURL(imageUrl, (img) => {

                img.scaleToWidth(img.width * 0.25); 
                img.scaleToHeight(img.height * 0.25); 
             
                canvas.add(img);
                canvas.renderAll();

            
              
            }, { crossOrigin: 'anonymous' });
        }
    }, [canvas, imageUrl]);

    useEffect(() => {
        applyFiltersToAllImages();
    }, [filters]);


    const applyFiltersToAllImages = () => {
        if (!canvas) return;
    
        canvas.getObjects('image').forEach(obj => {
            obj.filters = [];
            
            if (filters.brightness !== 0 || filters.contrast !== 0) {
                obj.filters.push(new fabric.Image.filters.Brightness({
                    brightness: filters.brightness
                }));
                obj.filters.push(new fabric.Image.filters.Contrast({
                    contrast: filters.contrast
                }));
            }
            
            if (filters.saturation !== 0) {
                obj.filters.push(new fabric.Image.filters.Saturation({
                    saturation: filters.saturation
                }));
            }
            
            if (filters.grayscale) {
                obj.filters.push(new fabric.Image.filters.Grayscale());
            }
            
            if (filters.sepia) {
                obj.filters.push(new fabric.Image.filters.Sepia());
            }
            
            if (filters.blur !== 0) {
                obj.filters.push(new fabric.Image.filters.Blur({
                    blur: filters.blur
                }));
            }
            
            if (filters.sharpen !== 0) {
                obj.filters.push(new fabric.Image.filters.Convolute({
                    matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
                }));
            }
            
            obj.applyFilters();
        });
    
        canvas.renderAll();
    };
    
    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };
    


    const addText = () => {
        if (canvas) {
            const text = new fabric.IText('Nhập văn bản', {
                left: 50,
                top: 50,
                fontFamily: 'Arial',
                fill: '#000000',
                fontSize: 20
            });
            canvas.add(text);
            canvas.bringToFront(text);
            canvas.setActiveObject(text);
            canvas.renderAll();
        }
    };

    const cutImage = () => {
        if (canvas) {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                canvas.renderAll();
            } else {
                alert('Vui lòng chọn một đối tượng để cắt');
            }
        }
    };

    const addRectangle = () => {
        const rect = new fabric.Rect({
            left: Math.random() * 400,
            top: Math.random() * 400,
            fill: "red",
            width: 100,
            height: 100
        });
        canvas.add(rect);
    };

    const addCircle = () => {
        const circle = new fabric.Circle({
            left: Math.random() * 400,
            top: Math.random() * 400,
            radius: 50,
            fill: "blue"
        });
        canvas.add(circle);
    };

    const addPolygon = () =>{
        const threesome = new fabric.Polygon([
            { x: 100, y: 100 },
            { x: 150, y: 150 },
            { x: 50, y: 150 }
          ], {
            fill: 'red',
            stroke: 'black',
            strokeWidth: 2
          });
          canvas.add(threesome);
    }
    const addStar = () => {
        const foursome = new fabric.Polygon([
            { x: 100, y: 10 },  // Đỉnh trên
            { x: 120, y: 70 },  // Đỉnh bên phải
            { x: 190, y: 70 },  // Đỉnh dưới bên phải
            { x: 130, y: 110 }, // Đỉnh bên phải dưới
            { x: 150, y: 180 }, // Đỉnh dưới
            { x: 100, y: 140 }, // Đỉnh bên trái dưới
            { x: 50, y: 180 },  // Đỉnh dưới bên trái
            { x: 70, y: 110 },   // Đỉnh bên trái dưới
            { x: 10, y: 70 },    // Đỉnh dưới bên trái
            { x: 80, y: 70 }     // Đỉnh bên trái
        ],{
            fill: 'red',
            stroke: 'black',
            strokeWidth: 2
        })
        canvas.add(foursome);
    }
    const toggleShapeOptions = () => {
        setShowShapeOptions(!showShapeOptions);
    };

    const toggleAdjust = () => {
        setShowAdjust(!showAdjust);
    };

    const addLine = () => {
        const line = new fabric.Line([50, 50, 200, 200], {
            stroke: "black",
            strokeWidth: 5
        });
        canvas.add(line);
    };
    const handleAddImage = (e) => {
        if (!canvas) return;
        let imgObj = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imgObj);
        reader.onload = (e) => {
            let imageUrl = e.target.result;
            let imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.onload = function () {
                let image = new fabric.Image(imageElement);
                image.scaleToWidth(image.width * 0.25); 
                image.scaleToHeight(image.height * 0.25); 
                canvas.add(image);
                canvas.centerObject(image);
                canvas.setActiveObject(image);
               
                canvas.renderAll();
            };
        };
    };
const handleGr = () =>{
    const Obj = canvas.getObjects()
    const group = new fabric.Group(Obj)
    canvas.add(group);
    canvas.renderAll()
}
const handleUngroup = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'group') {
      const items = activeObject.getObjects();
      activeObject.destroy();
      canvas.remove(activeObject);
      canvas.add(...items);
      canvas.renderAll();
    }
  };
const addPen = () =>{
    const pencilBrush = new fabric.PencilBrush(canvas);
    pencilBrush.color = 'red';
    pencilBrush.width = 5;
    canvas.freeDrawingBrush = pencilBrush;
    canvas.isDrawingMode = true; 
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        canvas.isDrawingMode = false;
    }
});

const addEffecttext = () => {
    const text = new fabric.IText('', {
        left: 50,
        top: 50,
        fontSize: 20,
        fontFamily: 'Arial',
                fill: '#000000',
    });
    canvas.add(text);
    
    const fullText = "Chào mừng bạn đến với Fabric.js!";
    let index = 0;

    const type = () => {
        if (index < fullText.length) {
            text.text += fullText.charAt(index);
            index++;
            canvas.add(text);
            canvas.setActiveObject(text);
            canvas.renderAll();
            setTimeout(type, 2000); 
        }
    };

    type(); 
};
const downloadPhoto = () =>{
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0 
    });
 const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}









    return (
        <div className="flex flex-row h-screen">
            <section className="flex flex-col select-none w-1/4 z-50 p-4 bg-gray-100 shadow-md">
                <h2 className="text-lg font-bold mb-4">Công cụ</h2>
                <ul className="space-y-4">
                    <li onClick={addText}>
                        <svg className="w-8 h-8 text-gray-800 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </li>
                    <li onClick={cutImage}>
                        <img src={cut} className="w-8 h-8 cursor-pointer" alt="Cut Tool" />
                    </li>
                    <li>
                        <button onClick={toggleAdjust}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4" />
                            </svg>
                        </button>
                        {showAdjust && (
                            <div className="flex flex-col">
                            <label>Brightness</label>
                            <input 
                                type="range" 
                                min="-1" 
                                max="1" 
                                step="0.1" 
                                value={filters.brightness}
                                onChange={(e) => handleFilterChange('brightness', parseFloat(e.target.value))}
                            />
                            <label>Contrast</label>
                            <input 
                                type="range" 
                                min="-1" 
                                max="1" 
                                step="0.1" 
                                value={filters.contrast}
                                onChange={(e) => handleFilterChange('contrast', parseFloat(e.target.value))}
                            />
                            <label>Saturation</label>
                            <input
                                type="range"
                                min="-1"
                                max="1"
                                step="0.1"
                                value={filters.saturation}
                                onChange={(e) => handleFilterChange('saturation', parseFloat(e.target.value))}
                            />
                            <label>Blur</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={filters.blur}
                                onChange={(e) => handleFilterChange('blur', parseFloat(e.target.value))}
                            />
                            <label>Sharpen</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={filters.sharpen}
                                onChange={(e) => handleFilterChange('sharpen', parseFloat(e.target.value))}
                            />
                            <div>
                                <input
                                    type="checkbox"
                                    id="grayscale"
                                    checked={filters.grayscale}
                                    onChange={(e) => handleFilterChange('grayscale', e.target.checked)}
                                />
                                <label htmlFor="grayscale">Grayscale</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="sepia"
                                    checked={filters.sepia}
                                    onChange={(e) => handleFilterChange('sepia', e.target.checked)}
                                />
                                <label htmlFor="sepia">Sepia</label>
                                </div>
                                </div>
                        )}
                    </li>
                    <li className="relative">
                        <img 
                            className="w-8 h-8 cursor-pointer" 
                            src={shape} 
                            alt="Shape Tool"
                            onClick={toggleShapeOptions}
                        />
                        {showShapeOptions && (
                            <div className="absolute left-full ml-2 bg-white border border-gray-300 rounded shadow-lg">
                                <button 
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => { addRectangle(); setShowShapeOptions(false); }}
                                >
                                    Rectangle
                                </button>
                                <button 
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => { addCircle(); setShowShapeOptions(false); }}
                                >
                                    Circle
                                </button>
                                <button 
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => { addLine(); setShowShapeOptions(false); }}
                                >
                                    Line
                                </button>
                                <button className="block w-full text-left px-4 py-2 hover:bg=gray-100"
                                 onClick={() =>{addPolygon(); setShowShapeOptions(false)}}>
                                tam giac
                                </button>
                                <button className="block w-full text-left px-4 py-2 hover:bg=gray-100"
                                 onClick={() =>{addStar(); setShowShapeOptions(false)}}>
                                ngoi sao
                                </button>
                            </div>
                        )}
                    </li>
                    <li>
                      <input
                      type="file"
                      accept="image/*"
                      onChange={handleAddImage}
                      >                   
</input>
 
                    </li>
                    <li>
                    <div>
                    <button onClick={handleGr}>Groups</button>
                    </div>
                    <button onClick={handleUngroup}>UnGroups</button>
                  
                    </li>
                    <li>
                    <button onClick={addPen}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
</svg>
</button>
                    </li>
                    <li>
                    <button onClick={addEffecttext}>
                    text effect
                    </button>
                    </li>
                    <li>
                    <button onClick={downloadPhoto}>
        <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
        </svg>
    </button>
                    </li>
                </ul>
            </section>
            <div className="flex-grow flex items-center justify-center bg-gray-200">
                <canvas ref={canvasRef} className="border border-gray-300 shadow-lg z-1 absolute"></canvas>
            </div>
        </div>
    );
}
