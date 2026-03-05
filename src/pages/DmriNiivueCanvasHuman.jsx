import React, { useState } from "react";
import { Niivue, DRAG_MODE } from "@niivue/niivue";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const DmriNiivueCanvasHuman = () => (
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
                                    multiplanarPadPixels: 50,
                                });
        niivue_slice.current.attachToCanvas(document.getElementById('niivue-canvas-slice-human'))

        const imageList = [
            {
              name: "sub-Ha1_sample-hemi_acq-highres_desc-CSD+fodf+l0.nii.gz",  
              url: "https://dandiarchive.s3.amazonaws.com/blobs/14b/62f/14b62f2d-1251-46a6-b736-8c455b3cbd71",
              opacity: 1,
            },
            {
              name: "sub-Ha1_sample-hemi_acq-highres_desc-CSD+fodf+dec.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/cc1/3d0/cc13d0c0-5d49-4014-a843-e890f80ceab2",
              opacity: 0,
            },
            {
              name: "sub-Ha1_sample-hemi_acq-highres_res-p4_desc-CSD+tdi.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/f69/9ec/f699ec38-cb5b-46ff-92eb-b3ea2a75d3bb",
              opacity: 0,
            },
            {
              name: "sub-Ha1_sample-hemi_acq-highres_desc-SANDIdot+fsoma.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/92e/3aa/92e3aa4b-3bc0-4e09-b603-76e6dcfc40dc",
              opacity: 0,
              cal_min: 0,
              cal_max: 0.8,
            },
            {
              name: "sub-Ha1_sample-hemi_acq-highres_desc-SANDIdot+fneurite.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/53a/a73/53aa7317-3de3-4f9f-97a0-0cf7d9969122",
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
        await niivue_slice.current.volumes[1].loadImgV1();
        await niivue_slice.current.volumes[2].loadImgV1();
        niivue_slice.current.setInterpolation(true); // V1 lines require nearest neighbor interpolation
        niivue_slice.current.setColormap(niivue_slice.current.volumes[3].id, "jet");
        niivue_slice.current.setColormap(niivue_slice.current.volumes[4].id, "jet");
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
  const [isFODF, setIsFODF] = useState(false);
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
      if (somaState) {
        niivue_slice.current.volumes[4].opacity = 0;
        niivue_slice.current.volumes[4].colorbarVisible = false;
        setIsNeurite(false);
      }
      niivue_slice.current.updateGLVolume();
      setIsSoma(somaState);
    };
  const handleNeuriteChange = (event) => {
      const neuriteState = event.target.checked;
      niivue_slice.current.volumes[4].opacity = neuriteState ? 1 : 0;
      niivue_slice.current.volumes[4].colorbarVisible = neuriteState;
      if (neuriteState) {
        niivue_slice.current.volumes[3].opacity = 0;
        niivue_slice.current.volumes[3].colorbarVisible = false;
        setIsSoma(false);
      }
      niivue_slice.current.updateGLVolume();
      setIsNeurite(neuriteState);
    };

  return (
      <div id='niivue-container' style={{ display: 'flex' }}>
        <aside class="niivue-sidebar">
          <div class="global-controls">
            <h4>Layers</h4>
            <div>
              <input
                type="checkbox"
                id="showMRI"
                checked={isMRI}
                onChange={handleMRIChange}
              />
              <label htmlFor="showMRI" style={{ marginLeft: "5px" }}>
                Diffusion MRI
              </label>
            </div>
            <div style={{ opacity: 0.4, cursor: "not-allowed" }}>
              <input
                type="checkbox"
                id="showFODF"
                checked={isFODF}
                onChange={handleFODFChange}
                disabled
              />
              <label htmlFor="showFODF" style={{ marginLeft: "5px" }}>
                fODF (coming soon)
              </label>
            </div>
            <div style={{ opacity: 0.4, cursor: "not-allowed" }}>
              <input
                type="checkbox"
                id="showDensity"
                checked={isDensity}
                onChange={handleDensityChange}
                disabled
              />
              <label htmlFor="showDensity" style={{ marginLeft: "5px" }}>
                Tract density (coming soon)
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
            <div style={{ position: 'absolute', top: '40%', width: 'calc(100% - 40px)' }}>
              <hr />
              <h4>Mouse controls</h4>
              <table style={{ width: '100%', fontSize: '0.9em' }}>
                <tbody>
                  <tr style={{ border: 'none' }}>
                    <td style={{ padding: '6px', borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRight: '1px solid #ddd', background: '#F7F8F9' }}>Scroll slices</td>
                    <td style={{ padding: '6px' , borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', background: '#F7F8F9' }}>Scroll wheel</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRight: '1px solid #ddd', background: '#F7F8F9' }}>Move crosshair</td>
                    <td style={{ padding: '6px', border: 'none', background: '#F7F8F9' }}>Left click</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRight: '1px solid #ddd', background: '#F7F8F9' }}>Pan</td>
                    <td style={{ padding: '6px', borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', background: '#F7F8F9' }}>Middle click</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', borderTop: 'none', borderBottom: 'none', borderLeft: 'none', borderRight: '1px solid #ddd', background: '#F7F8F9' }}>Zoom</td>
                    <td style={{ padding: '6px', border: 'none', background: '#F7F8F9' }}>Right click</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </aside>
        <div id= "coronal-slice-container"
            style={{ display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
          }}>
          <canvas id="niivue-canvas-slice-human"></canvas>
        </div>
      </div>
  );
}}
  </BrowserOnly>
);

export default DmriNiivueCanvasHuman;
