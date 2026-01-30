import React, { useState } from "react";
import { Niivue } from "@niivue/niivue";
import BrowserOnly from "@docusaurus/BrowserOnly";
export const PathwaysNiivueCanvas = () => (
    <BrowserOnly fallback={<div>Loading...</div>}>
  {() => {
  const niivue_render = React.useRef(null);
  const niivue_slice = React.useRef(null);

  React.useEffect(() => {
    async function loadImages() {
    niivue_slice.current = new Niivue({logLevel: 'debug', 
                                  backColor: [1, 1, 1, 1],
                                  show3Dcrosshair: false,
                                  isColorbar: false});
    niivue_render.current = new Niivue({logLevel: 'debug', 
                                  backColor: [1, 1, 1, 1],
                                  show3Dcrosshair: false,
                                  isColorbar: false});
    niivue_slice.current.attachToCanvas(document.getElementById('niivue-canvas-slice'))

    niivue_render.current.attachToCanvas(document.getElementById('niivue-canvas-render'))
    const whiteBackgroundGray = {
      R: [255, 0, 255],
      G: [255, 0, 255],
      B: [255, 0, 255],
      A: [255, 255, 255],
      I: [0, 1, 255]
    };
    niivue_slice.current.addColormap('whiteBackgroundGray', whiteBackgroundGray);

    const nucleiOpacity=1;
    const imageList = [
          {
            url:"img/mySTNAtlas/highb.mean.norm.brain.nii.gz",
            colormap: "whiteBackgroundGray",
          },
      ];
    const trackList =[
        {
          url: "img/mySTNAtlas/STN-Atlas_merged.trk",
          name:"sub-I58_dwi_space-dwi_model-CSD_tractography.trk",
        },]
    const segmentationList=[
        {
          url: "img/mySTNAtlas/STN-Atlas_merged.trk",
        },
        {
          url: "img/mySTNAtlas/sublabels1.gii",
          name: "sublabels1.gii",
          rgba255: [65, 94, 177, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels2.gii",
          name: "sublabels2.gii",
          rgba255: [154, 125, 133, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels3.gii",
          name: "sublabels3.gii",
          rgba255: [142, 161, 97, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels4.gii",
          name: "sublabels4.gii",
          rgba255: [164, 180, 246, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels5.gii",
          name: "sublabels5.gii",
          rgba255: [173, 182, 86, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels6.gii",
          name: "sublabels6.gii",
          rgba255: [197, 195, 223, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels7.gii",
          name: "sublabels7.gii",
          rgba255: [65, 178, 254, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels8.gii",
          name: "sublabels8.gii",
          rgba255: [113, 61, 186, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels9.gii",
          name: "sublabels9.gii",
          rgba255: [207, 73, 253, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels10.gii",
          name: "sublabels10.gii",
          rgba255: [153, 252, 171, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels11.gii",
          name: "sublabels11.gii",
          rgba255: [171, 252, 102, 255],
          opacity: nucleiOpacity,
        },
        {
          url: "img/mySTNAtlas/sublabels12.gii",
          name: "sublabels12.gii",
          rgba255: [60, 172, 225, 255],
          opacity: nucleiOpacity,
        },
      ]

    await niivue_render.current.loadMeshes(segmentationList);
    await niivue_slice.current.loadVolumes(imageList);
    await niivue_slice.current.loadMeshes(trackList);
    await niivue_slice.current.setMeshThicknessOn2D(1);

    await niivue_slice.current.setSliceType(niivue_slice.current.sliceTypeCoronal);
    }
    loadImages();
  }, []);

  // Handlers for showing MRI, streamlines, nuclei
  const [isMRI, setIsMRI] = useState(true);

  const handleMRIChange = (event) => {
      const mriState = event.target.checked;
      niivue_slice.current.volumes[0].opacity = mriState ? 1 : 0;
      niivue_slice.current.updateGLVolume();
      setIsMRI(mriState);
    };

  const [isStreamlines, setIsStreamlines] = useState(true);

  const handleStreamlinesChange = (event) => {
      const streamlinesState = event.target.checked;
      niivue_render.current.meshes[0].visible = streamlinesState;
      niivue_render.current.updateGLVolume();
      niivue_slice.current.meshes[0].visible = streamlinesState;
      niivue_slice.current.updateGLVolume();
      setIsStreamlines(streamlinesState);
    };

  const [isNuclei, setIsNuclei] = useState(true);

  const handleNucleiChange = (event) => {
      const nucleiState = event.target.checked;
      for (let i = 1; i < niivue_render.current.meshes.length; i++) {
        niivue_render.current.meshes[i].visible = nucleiState;
      }
      niivue_render.current.updateGLVolume();
      setIsNuclei(nucleiState);
    };

  return (
      <div style={{ display: 'flex' }}>
        <aside class="niivue-sidebar">
          <div class="global-controls">
            <h4>Controls</h4>
            <div>
              <input
                type="checkbox"
                id="showMRI"
                checked={isMRI}
                onChange={handleMRIChange}
              />
              <label htmlFor="showMRI" style={{ marginLeft: "5px" }}>
                dMRI
              </label>
            </div>            
            <div>
              <input
                type="checkbox"
                id="showStreamlines"
                checked={isStreamlines}
                onChange={handleStreamlinesChange}
              />
              <label htmlFor="showStreamlines" style={{ marginLeft: "5px" }}>
                Streamlines
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="showNuclei"
                checked={isNuclei}
                onChange={handleNucleiChange}
              />
              <label htmlFor="showNuclei" style={{ marginLeft: "5px" }}>
                Nuclei
              </label>
            </div>
          </div>
        </aside>
        <canvas id="niivue-canvas-slice"></canvas>
        <canvas id="niivue-canvas-render"></canvas>
      </div>
  );
}}
  </BrowserOnly>
);

export default PathwaysNiivueCanvas;