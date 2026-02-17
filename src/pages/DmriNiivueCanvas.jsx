import React, { useState } from "react";
import { Niivue, DRAG_MODE } from "@niivue/niivue";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const DmriNiivueCanvas = () => (
    <BrowserOnly fallback={<div>Loading...</div>}>
  {() => {

  const niivue_slice = React.useRef(null);

  React.useEffect(() => {
    async function loadImages() {

        niivue_slice.current = new Niivue({logLevel: 'debug',
                                    backColor: [0, 0, 0, 1],
                                    show3Dcrosshair: true,
                                    isColorbar: true,
                                    isRuler: false,
                                    crosshairWidth: 1,
                                });
        niivue_slice.current.attachToCanvas(document.getElementById('niivue-canvas-slice'))

        const imageList = [
            {
                url: "img/sub-I80_sample-hemi_acq-HighRes_desc-CSD_fodf_l0.nii.gz",
                opacity: 1,
            },
            {
                url: "img/sub-I80_sample-hemi_acq-HighRes_desc-CSD_fodf_dec.nii.gz",
                opacity: 1,
            },
            {
            },
            {
                url: "img/sub-I80_sample-hemi_acq-HighRes_desc-SANDIdot_fsoma.nii.gz",
                opacity: 0,
                cal_min: 0,
                cal_max: 0.8,
            },
            {
                url: "img/sub-I80_sample-hemi_acq-HighRes_desc-SANDIdot_fneurite.nii.gz",
                opacity: 0,
                cal_min: 0,
                cal_max: 0.8,
            }
        ];

        // Initialize viewer
        await niivue_slice.current.setSliceType(niivue_slice.current.sliceTypeMultiplanar);
        niivue_slice.current.setMultiplanarLayout(3);
        niivue_slice.current.opts.dragMode = DRAG_MODE.slicer3D;

        // Load data
        await niivue_slice.current.loadVolumes(imageList);
        await niivue_slice.current.volumes[1].loadImgV1()
        niivue_slice.current.setInterpolation(true); // V1 lines require nearest neighbor interpolation
        niivue_slice.current.volumes[0].colorbarVisible=false;
        niivue_slice.current.volumes[1].colorbarVisible=false;
        niivue_slice.current.volumes[2].colorbarVisible=false;
        niivue_slice.current.volumes[3].colorbarVisible=false;
        niivue_slice.current.volumes[4].colorbarVisible=false;
        niivue_slice.current.updateGLVolume();
    }
    loadImages();
  }, []);

  // Handlers for displaying each volume with checkboxes
  const [isMRI, setIsMRI] = useState(true);
  const [isFODF, setIsFODF] = useState(true);
  const [isDensity, setIsDensity] = useState(false);
  const [isSoma, setIsSoma] = useState(false);
  const [isNeurite, setIsNeurite] = useState(false);

  const handleMRIChange = (event) => {
      const mriState = event.target.checked;
      niivue_slice.current.volumes[0].opacity = mriState ? 1 : 0;
      niivue_slice.current.updateGLVolume();
      setIsMRI(mriState);
    };
  const handleFODFChange = (event) => {
      const fodfState = event.target.checked;
      niivue_slice.current.volumes[1].opacity = fodfState ? 1 : 0;
      niivue_slice.current.updateGLVolume();
      setIsFODF(fodfState);
    };
  const handleDensityChange = (event) => {
      const densityState = event.target.checked;
      niivue_slice.current.volumes[2].opacity = densityState ? 1 : 0;
      niivue_slice.current.updateGLVolume();
      setIsDensity(densityState);
    };
  const handleSomaChange = (event) => {
      const somaState = event.target.checked;
      niivue_slice.current.volumes[3].opacity = somaState ? 1 : 0;
      niivue_slice.current.volumes[3].colorbarVisible = somaState;
      niivue_slice.current.updateGLVolume();
      setIsSoma(somaState);
    };
  const handleNeuriteChange = (event) => {
      const neuriteState = event.target.checked;
      niivue_slice.current.volumes[4].opacity = neuriteState ? 1 : 0;
      niivue_slice.current.volumes[4].colorbarVisible = neuriteState;
      niivue_slice.current.updateGLVolume();
      setIsNeurite(neuriteState);
    };

  return (
      <div id='niivue-container' style={{ display: 'flex'}}>
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
                id="showFODF"
                checked={isFODF}
                onChange={handleFODFChange}
              />
              <label htmlFor="showFODF" style={{ marginLeft: "5px" }}>
                fODF
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="showDensity"
                checked={isDensity}
                onChange={handleDensityChange}
              />
              <label htmlFor="showDensity" style={{ marginLeft: "5px" }}>
                Tract density
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="showSoma"
                checked={isSoma}
                onChange={handleSomaChange}
              />
              <label htmlFor="showSoma" style={{ marginLeft: "5px" }}>
                Intra-soma signal fraction
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="showNeurite"
                checked={isNeurite}
                onChange={handleNeuriteChange}
              />
              <label htmlFor="showNeurite" style={{ marginLeft: "5px" }}>
                Intra-neurite signal fraction
              </label>
            </div>
            <hr />
            <h4>Mouse tooltips</h4>
            <ul>
              <li>Scroll slices - Scroll wheel</li>
              <li>Pan - Middle click</li>
              <li>Zoom - Right click</li>
              <li>Move crosshair - Left click</li>
            </ul>
          </div>
        </aside>
        <div id= "coronal-slice-container" 
            style={{ display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1,
          }}>
          <canvas id="niivue-canvas-slice"></canvas>
        </div>
      </div>
  );
}}
  </BrowserOnly>
);

export default DmriNiivueCanvas;
