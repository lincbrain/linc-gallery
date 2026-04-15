import React, { useState } from "react";
import { Niivue, DRAG_MODE } from "@niivue/niivue";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const DmriNiivueCanvasMacaque = () => (
    <BrowserOnly fallback={<div>Loading...</div>}>
  {() => {

  const niivue_highres = React.useRef(null);
  const niivue_lowres = React.useRef(null);

  React.useEffect(() => {
    async function loadImages() {
        if (niivue_highres.current && niivue_lowres.current) return;

        niivue_highres.current = new Niivue({logLevel: 'debug',
                                    backColor: [0, 0, 0, 1],
                                    isColorbar: true,
                                    isRuler: false,
                                    crosshairWidth: 0,
                                    multiplanarPadPixels: 50,
                                });
        niivue_lowres.current = new Niivue({logLevel: 'debug',
                                    backColor: [0, 0, 0, 1],
                                    isColorbar: true,
                                    isRuler: false,
                                    crosshairWidth: 0,
                                    multiplanarPadPixels: 50,
                                });
        niivue_highres.current.attachToCanvas(document.getElementById('niivue-canvas-slice-macaque-highres'))
        niivue_lowres.current.attachToCanvas(document.getElementById('niivue-canvas-slice-macaque-lowres'))

        const imageListHighRes = [
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
        ];
        const imageListLowRes = [
            {
              name: "sub-M3_sample-Brain_acq-MultiDim_desc-T2w.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/34a/5a6/34a5a64e-927f-40a9-95e7-88b33fc6d8aa",
              opacity: 0,
              cal_min: 0,
              cal_max: 75000,
            },
            {
              name: "sub-M3_sample-Brain_acq-MultiDim_desc-MultiTE+fsoma.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/d5a/67c/d5a67cdd-b37d-4db1-b433-a2ca78cb80a4",
              opacity: 0,
              cal_min: 0,
              cal_max: 1,
            },
            {
              name: "sub-M3_sample-Brain_acq-MultiDim_desc-MultiTE+fneurite.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/8b7/394/8b7394a4-a318-4fc6-9a53-c62fb1457f58",
              opacity: 0,
              cal_min: 0,
              cal_max: 1,
            },
            {
              name: "sub-M3_sample-Brain_acq-MultiDim_desc-MultiTE+Rsoma.nii.gz",
              url: "https://dandiarchive.s3.amazonaws.com/blobs/8e6/92f/8e692f33-d709-4da8-927a-2ae9d9f71d88",
              opacity: 0,
              cal_min: 2,
              cal_max: 8,
            },
        ];

        // Initialize viewers
        await niivue_lowres.current.setSliceType(niivue_lowres.current.sliceTypeMultiplanar);
        niivue_lowres.current.setMultiplanarLayout(3);
        niivue_lowres.current.opts.dragMode = DRAG_MODE.slicer3D;
        niivue_lowres.current.opts.loadingText = 'Please do not refresh. Loading (~1 minute)...'

        await niivue_highres.current.setSliceType(niivue_highres.current.sliceTypeMultiplanar);
        niivue_highres.current.setMultiplanarLayout(3);
        niivue_highres.current.opts.dragMode = DRAG_MODE.slicer3D;
        niivue_highres.current.opts.loadingText = 'Please do not refresh. Loading (~1 minute)...'

        // Load data
        await niivue_lowres.current.loadVolumes(imageListLowRes);
        niivue_lowres.current.setColormap(niivue_lowres.current.volumes[1].id, "turbo");
        niivue_lowres.current.setColormap(niivue_lowres.current.volumes[2].id, "turbo");
        niivue_lowres.current.setColormap(niivue_lowres.current.volumes[3].id, "turbo");
        for (let i = 0; i < niivue_lowres.current.volumes.length; i++) {
          niivue_lowres.current.volumes[i].colorbarVisible = false;
        }

        await niivue_highres.current.loadVolumes(imageListHighRes);
        await niivue_highres.current.volumes[1].loadImgV1();
        await niivue_highres.current.volumes[3].loadImgV1();
        niivue_highres.current.setInterpolation(true); // V1 lines require nearest neighbor interpolation
        niivue_highres.current.setModulationImage(niivue_highres.current.volumes[1].id, niivue_highres.current.volumes[2].id)
        niivue_highres.current.setModulationImage(niivue_highres.current.volumes[3].id, niivue_highres.current.volumes[4].id)
        for (let i = 0; i < niivue_highres.current.volumes.length; i++) {
          niivue_highres.current.volumes[i].colorbarVisible = false;
        }
        niivue_highres.current.scene.crosshairPos = [0.66, 0.5, 0.5];

        niivue_highres.current.updateGLVolume();
        niivue_lowres.current.updateGLVolume();
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
  const [isSomaRadius, setIsSomaRadius] = useState(false);
  const [isCrosshair, setIsCrosshair] = useState(false);

  // Force NiiVue to re-measure canvas dimensions after it becomes visible.
  const showLowResCanvas = isSoma || isNeurite || isSomaRadius;
  React.useEffect(() => {
    if (showLowResCanvas && niivue_lowres.current) {
      niivue_lowres.current.resizeListener();
    }
  }, [showLowResCanvas]);

  const handleMRIChange = (event) => {
      const mriState = event.target.checked;
      niivue_highres.current.volumes[0].opacity = mriState ? 1 : 0;
      niivue_highres.current.updateGLVolume();
      setIsMRI(mriState);
    };
  const handleFODFChange = (event) => {
      const fodfState = event.target.checked;
      niivue_highres.current.volumes[1].opacity = fodfState ? 1 : 0;
      niivue_highres.current.updateGLVolume();
      setIsFODF(fodfState);
    };
  const handleDensityChange = (event) => {
      const densityState = event.target.checked;
      niivue_highres.current.volumes[3].opacity = densityState ? 1 : 0;
      niivue_highres.current.updateGLVolume();
      setIsDensity(densityState);
    };
  const handleSomaChange = (event) => {
      const somaState = event.target.checked;
      const neuriteVisible = niivue_lowres.current.volumes[2].opacity > 0;
      const somaRadiusVisible = niivue_lowres.current.volumes[3].opacity > 0;

      niivue_lowres.current.volumes[0].opacity = (somaState || neuriteVisible || somaRadiusVisible) ? 1 : 0;
      niivue_lowres.current.volumes[1].opacity = somaState ? 1 : 0;

      niivue_lowres.current.volumes[3].colorbarVisible = somaRadiusVisible;
      niivue_lowres.current.volumes[1].colorbarVisible = !somaRadiusVisible && (somaState || neuriteVisible);
      niivue_lowres.current.volumes[2].colorbarVisible = false;

      niivue_lowres.current.updateGLVolume();
      setIsSoma(somaState);
    };
  const handleNeuriteChange = (event) => {
      const neuriteState = event.target.checked;
      const somaVisible = niivue_lowres.current.volumes[1].opacity > 0;
      const somaRadiusVisible = niivue_lowres.current.volumes[3].opacity > 0;

      niivue_lowres.current.volumes[0].opacity = (somaVisible || neuriteState || somaRadiusVisible) ? 1 : 0;
      niivue_lowres.current.volumes[2].opacity = neuriteState ? 1 : 0;

      niivue_lowres.current.volumes[3].colorbarVisible = somaRadiusVisible;
      niivue_lowres.current.volumes[1].colorbarVisible = !somaRadiusVisible && (somaVisible || neuriteState);
      niivue_lowres.current.volumes[2].colorbarVisible = false;

      niivue_lowres.current.updateGLVolume();
      setIsNeurite(neuriteState);
    };
  const handleSomaRadiusChange = (event) => {
      const somaRadiusState = event.target.checked;
      const somaVisible = niivue_lowres.current.volumes[1].opacity > 0;
      const neuriteVisible = niivue_lowres.current.volumes[2].opacity > 0;

      niivue_lowres.current.volumes[0].opacity = (somaVisible || neuriteVisible || somaRadiusState) ? 1 : 0;
      niivue_lowres.current.volumes[3].opacity = somaRadiusState ? 1 : 0;

      niivue_lowres.current.volumes[3].colorbarVisible = somaRadiusState;
      niivue_lowres.current.volumes[1].colorbarVisible = !somaRadiusState && (somaVisible || neuriteVisible);
      niivue_lowres.current.volumes[2].colorbarVisible = false;

      niivue_lowres.current.updateGLVolume();
      setIsSomaRadius(somaRadiusState);
    };
  const handleCrosshairChange = (event) => {
      const crosshairState = event.target.checked;
      niivue_highres.current.opts.crosshairWidth = crosshairState ? 1 : 0;
      niivue_highres.current.drawScene();
      niivue_lowres.current.opts.crosshairWidth = crosshairState ? 1 : 0;
      niivue_lowres.current.drawScene();
      setIsCrosshair(crosshairState);
    };

  return (
      <div className="sidebar-and-niivue-container">
        <aside class="sidebar-container">
          <div class="global-controls">
            <h4>Layers</h4>
            <div style={{ fontSize: "0.8em", fontStyle: "italic", color: "#888", marginBottom: "4px" }}>
              Axonal architecture
            </div>
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
            <div style={{ fontSize: "0.8em", fontStyle: "italic", color: "#888", marginTop: "8px", marginBottom: "4px" }}>
              Tissue microstructure
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
                id="showSomaRadius"
                checked={isSomaRadius}
                onChange={handleSomaRadiusChange}
              />
              <label htmlFor="showSomaRadius" style={{ marginLeft: "5px" }}>
                Soma radius
              </label>
            </div>
            <div style={{ fontSize: "0.8em", fontStyle: "italic", color: "#888", marginTop: "8px", marginBottom: "4px" }}>
              Display options
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
            <div style={{ paddingTop: "0px" }}>
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
          <canvas id="niivue-canvas-slice-macaque-highres" style={{ display: showLowResCanvas ? 'none' : 'block' }}></canvas>
          <canvas id="niivue-canvas-slice-macaque-lowres" style={{ display: showLowResCanvas ? 'block' : 'none' }}></canvas>
        </div>
      </div>
  );
}}
  </BrowserOnly>
);

export default DmriNiivueCanvasMacaque;
