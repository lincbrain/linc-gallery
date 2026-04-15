import React, { useState } from "react";
import { Niivue, DRAG_MODE } from "@niivue/niivue";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const DmriNiivueCanvasMacaque = () => (
    <BrowserOnly fallback={<div>Loading...</div>}>
  {() => {

  const niivue_slice = React.useRef(null);

  React.useEffect(() => {
    async function loadImages() {
        if (niivue_slice.current) return;

        niivue_slice.current = new Niivue({logLevel: 'debug',
                                    backColor: [0, 0, 0, 1],
                                    isColorbar: true,
                                    isRuler: false,
                                    crosshairWidth: 1,
                                    multiplanarPadPixels: 50,
                                });
        niivue_slice.current.attachToCanvas(document.getElementById('niivue-canvas-slice-macaque'))

        const imageList = [
            {
              name: "sub-M3_sample-brain_acq-HighRes+MultiShell_desc-CSD+fodf+l0.nii.gz",  
              url: "https://dandiarchive.s3.amazonaws.com/blobs/e56/e59/e56e5984-8b5f-40dc-99f7-e2bda53cfd25",
              opacity: 1,
            },
            {
              name: "sub-M3_sample-Brain_acq-HighRes+MultiShell_desc-CSD+dec+univec.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/564/a89/564a89d2-cb11-4e4b-a881-282c1ffc54a4",
              opacity: 1,
            },
            {
              name: "sub-M3_sample-Brain_acq-HighRes+MultiShell_desc-CSD+dec+scalar.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/707/fa1/707fa179-20a3-4d5b-bce6-a5f574836417",
              opacity: 0,
              cal_min: 0,
              cal_max: 0.9,
            },
            {
              name: "sub-M3_sample-Brain_acq-HighRes+MultiShell_desc-CSD+tdi+univec.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/f98/4d4/f984d4eb-3159-4017-80c2-32d388d4fa5f",
              opacity: 0,
            },
            {
              name: "sub-M3_sample-Brain_acq-HighRes+MultiShell_desc-CSD+tdi+scalar.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/0e4/ef2/0e4ef272-96d6-4df4-a408-6344032cece1",
              opacity: 0,
              cal_min: 0,
              cal_max: 1100,
            },
            { // TODO: Replace placeholder image
              name: "soma_placeholder.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/e56/e59/e56e5984-8b5f-40dc-99f7-e2bda53cfd25",
              opacity: 0,
              cal_min: 0,
              cal_max: 0.8,
            },
            { // TODO: Replace placeholder image
              name: "neurite_placeholder.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/e56/e59/e56e5984-8b5f-40dc-99f7-e2bda53cfd25",
              opacity: 0,
              cal_min: 0,
              cal_max: 0.8,
            }
        ];

        // Initialize viewer
        await niivue_slice.current.setSliceType(niivue_slice.current.sliceTypeMultiplanar);
        niivue_slice.current.setMultiplanarLayout(3);
        niivue_slice.current.opts.dragMode = DRAG_MODE.slicer3D;
        niivue_slice.current.opts.loadingText = 'Please do not refresh. Loading (1-2 minutes)...'

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

    // Load only when the tab is first shown, not at page load
    const tabPanel = document.getElementById('niivue-canvas-slice-macaque')?.closest('[role="tabpanel"]');
    if (!tabPanel || !tabPanel.hasAttribute('hidden')) {
      loadImages();
      return;
    }

    // Load once the tab becomes visible
    const observer = new MutationObserver(() => {
      if (!tabPanel.hasAttribute('hidden')) {
        observer.disconnect();
        loadImages();
      }
    });
    observer.observe(tabPanel, { attributes: true, attributeFilter: ['hidden'] });
    return () => observer.disconnect();
  }, []);

  // Handlers for displaying each volume with checkboxes
  const [isMRI, setIsMRI] = useState(true);
  const [isFODF, setIsFODF] = useState(true);
  const [isDensity, setIsDensity] = useState(false);
  const [isSoma, setIsSoma] = useState(false);
  const [isNeurite, setIsNeurite] = useState(false);
  const [isCrosshair, setIsCrosshair] = useState(true);

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
      const neuriteVisible = niivue_slice.current.volumes[4].opacity > 0;
      niivue_slice.current.volumes[3].colorbarVisible = somaState;
      niivue_slice.current.volumes[4].colorbarVisible = !somaState && neuriteVisible;
      niivue_slice.current.updateGLVolume();
      setIsSoma(somaState);
    };
  const handleNeuriteChange = (event) => {
      const neuriteState = event.target.checked;
      niivue_slice.current.volumes[4].opacity = neuriteState ? 1 : 0;
      const somaVisible = niivue_slice.current.volumes[3].opacity > 0;
      niivue_slice.current.volumes[3].colorbarVisible = somaVisible;
      niivue_slice.current.volumes[4].colorbarVisible = !somaVisible && neuriteState;
      niivue_slice.current.updateGLVolume();
      setIsNeurite(neuriteState);
    };
  const handleCrosshairChange = (event) => {
      const crosshairState = event.target.checked;
      niivue_slice.current.opts.crosshairWidth = crosshairState ? 1 : 0;
      niivue_slice.current.drawScene();
      setIsCrosshair(crosshairState);
    };

  return (
      <div className="sidebar-and-niivue-container">
        <aside class="sidebar-container">
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
                Isotropic component (l0)
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
                Direction-encoded color (DEC) map
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
            <div style={{ opacity: 0.4, cursor: "not-allowed" }}>
              <input
                type="checkbox"
                id="showSoma"
                checked={isSoma}
                onChange={handleSomaChange}
                disabled
              />
              <label htmlFor="showSoma" style={{ marginLeft: "5px" }}>
                Intra-soma signal fraction (coming soon)
              </label>
            </div>
            <div style={{ opacity: 0.4, cursor: "not-allowed" }}>
              <input
                type="checkbox"
                id="showNeurite"
                checked={isNeurite}
                onChange={handleNeuriteChange}
                disabled
              />
              <label htmlFor="showNeurite" style={{ marginLeft: "5px" }}>
                Intra-neurite signal fraction
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="showCrosshair"
                checked={isCrosshair}
                onChange={handleCrosshairChange}
              />
              <label htmlFor="showCrosshair" style={{ marginLeft: "5px" }}>
                Crosshair
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
        <div className="niivue-container">
          <canvas id="niivue-canvas-slice-macaque"></canvas>
        </div>
      </div>
  );
}}
  </BrowserOnly>
);

export default DmriNiivueCanvasMacaque;
