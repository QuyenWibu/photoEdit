import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as fabric from 'fabric';
import cut from '../icon/cut.svg';
import shape from '../icon/shapes.png';
import { FabricImage } from 'fabric';
export default function Main() {
    const location = useLocation();
    const imageUrl = location.state?.imageUrl;
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [showShapeOptions, setShowShapeOptions] = useState(false);
    const [showAdjust, setShowAdjust] = useState(false);
    const [fImage, setFImage] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            const fabricCanvas = new fabric.Canvas(canvasRef.current, {
                width: 800,
                height: 600
            });
            setCanvas(fabricCanvas);

            return () => {
                fabricCanvas.dispose();
            };
        }
    }, []);

    useEffect(() => {
        if (canvas && imageUrl) {
           FabricImage.fromURL(imageUrl, (img) => {
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), { crossOrigin: 'anonymous' });
            });
        }
    }, [canvas, imageUrl]);

    useEffect(() => {
        const imageElement = document.createElement('img');
        const imgInstance = new FabricImage(imageElement);
        imgInstance.scale(1);
        imgInstance.set({ top: 15, left: 15 });
        setFImage(imgInstance);
    }, []);

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

    const adjustBrightness = (value) => {
        if (canvas) {
            canvas.getObjects().forEach((obj) => {
                obj.filters.push(new FabricImage.filters.Brightness({ brightness: value }));
                obj.applyFilters();
            });
            canvas.renderAll();
        }
    };

    const applyBlendImage = () => {
        if (canvas && fImage) {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                const blendFilter = new FabricImage.filters.BlendImage({
                    image: fImage,
                    mode: 'multiply' 
                });
                activeObject.filters.push(blendFilter);
                activeObject.applyFilters();
                canvas.renderAll();
            } else {
                alert('Vui lòng chọn một đối tượng để áp dụng bộ lọc trộn');
            }
        }
    };

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
    const handleAddImage = (e) =>{
        if (!canvas) return;
        let imgObj = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imgObj);
        reader.onload = (e) =>{
            let imageUrl = e.target.result
            let imageElement = document.createElement('img');
            imageElement.src = imageUrl
            imageElement.onload = function (){
                let image = new FabricImage(imageElement)
                canvas.add(image)
                canvas.setActiveObject(image)
                canvas.renderAll()
            }
        }
}
const handleGr = () =>{
    const Obj = canvas.getObjects()
    const group = new fabric.Group(Obj)
    canvas.add(group);
    canvas.renderAll()
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
                                <input 
                                    type="range" 
                                    min="-1" 
                                    max="1" 
                                    step="0.1" 
                                    onChange={(e) => adjustBrightness(parseFloat(e.target.value))}
                                />
                                <button onClick={applyBlendImage}>Blend Image</button>
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
                    <button onClick={handleGr}>UnGroups</button>
                  
                    </li>
                </ul>
            </section>
            <div className="flex-grow flex items-center justify-center bg-gray-200">
                <canvas ref={canvasRef} className="border border-gray-300 shadow-lg z-1 absolute"></canvas>
            </div>
        </div>
    );
}
