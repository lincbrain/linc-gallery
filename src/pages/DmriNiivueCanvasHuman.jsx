import React, { useState } from "react";
import { Niivue, DRAG_MODE } from "@niivue/niivue";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const DmriNiivueCanvasHuman = () => (
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
                                    crosshairWidth: 0,
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
              name: "sub-Ha1_sample-RightHemi_acq-HighRes+MultiShell_desc-CSD+dec+univec.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/20c/804/20c804d5-c99d-4ede-b4ed-c1926d652a6f",
              opacity: 1,
            },
            {
              name: "sub-Ha1_sample-RightHemi_acq-HighRes+MultiShell_desc-CSD+dec+scalar.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/951/6ef/9516efb5-b8aa-4fe5-971b-809d4b52e003",
              opacity: 0,
              cal_min: 0,
              cal_max: 0.8,
            },
            {
              name: "sub-Ha1_sample-RightHemi_acq-HighRes+MultiShell_desc-CSD+tdi+univec.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/2e8/77d/2e877d91-fe98-4684-a5e1-60c5ef064382",
              opacity: 0,
            },
            {
              name: "sub-Ha1_sample-RightHemi_acq-HighRes+MultiShell_desc-CSD+tdi+scalar.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/1d7/463/1d746354-d49d-48b6-bef1-d62219d77774",
              opacity: 0,
              cal_min: 0,
              cal_max: 350,
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
            },
        ];

        // Initialize viewer
        await niivue_slice.current.setSliceType(niivue_slice.current.sliceTypeMultiplanar);
        niivue_slice.current.setMultiplanarLayout(3);
        niivue_slice.current.opts.dragMode = DRAG_MODE.slicer3D;
        niivue_slice.current.opts.loadingText = 'Please do not refresh. Loading (~1 minute)...'

        // Load data
        await niivue_slice.current.loadVolumes(imageList);
        await niivue_slice.current.volumes[1].loadImgV1();
        await niivue_slice.current.volumes[3].loadImgV1();
        niivue_slice.current.setInterpolation(true); // V1 lines require nearest neighbor interpolation
        niivue_slice.current.setModulationImage(niivue_slice.current.volumes[1].id, niivue_slice.current.volumes[2].id)
        niivue_slice.current.setModulationImage(niivue_slice.current.volumes[3].id, niivue_slice.current.volumes[4].id)

        niivue_slice.current.setColormap(niivue_slice.current.volumes[5].id, "turbo");
        niivue_slice.current.setColormap(niivue_slice.current.volumes[6].id, "turbo");
        for (let i = 0; i < niivue_slice.current.volumes.length; i++) {
            niivue_slice.current.volumes[i].colorbarVisible = false;
        }

        niivue_slice.current.scene.crosshairPos = [0.4, 0.5, 0.5];

        niivue_slice.current.updateGLVolume();
    }

    // Load only when the tab is first shown, not at page load
    const tabPanel = document.getElementById('niivue-canvas-slice-human')?.closest('[role="tabpanel"]');
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

  // Handlers for displaying each layer with checkboxes
  const [isMRI, setIsMRI] = useState(true);
  const [isFODF, setIsFODF] = useState(true);
  const [isDensity, setIsDensity] = useState(false);
  const [isSoma, setIsSoma] = useState(false);
  const [isNeurite, setIsNeurite] = useState(false);
  const [isCrosshair, setIsCrosshair] = useState(false);

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
      niivue_slice.current.volumes[3].opacity = densityState ? 1 : 0;
      niivue_slice.current.updateGLVolume();
      setIsDensity(densityState);
    };
  const handleSomaChange = (event) => {
      const somaState = event.target.checked;
      niivue_slice.current.volumes[5].opacity = somaState ? 1 : 0;
      const neuriteVisible = niivue_slice.current.volumes[6].opacity > 0;
      niivue_slice.current.volumes[5].colorbarVisible = somaState;
      niivue_slice.current.volumes[6].colorbarVisible = !somaState && neuriteVisible;
      niivue_slice.current.updateGLVolume();
      setIsSoma(somaState);
    };
  const handleNeuriteChange = (event) => {
      const neuriteState = event.target.checked;
      niivue_slice.current.volumes[6].opacity = neuriteState ? 1 : 0;
      const somaVisible = niivue_slice.current.volumes[5].opacity > 0;
      niivue_slice.current.volumes[5].colorbarVisible = somaVisible;
      niivue_slice.current.volumes[6].colorbarVisible = !somaVisible && neuriteState;
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
            <div style={{ paddingTop: "26.5px" }}>
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
          <canvas id="niivue-canvas-slice-human"></canvas>
        </div>
      </div>
  );
}}
  </BrowserOnly>
);

export default DmriNiivueCanvasHuman;
