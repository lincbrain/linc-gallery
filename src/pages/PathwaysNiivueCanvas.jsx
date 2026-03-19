import React, { useState } from "react";
import { Niivue, DRAG_MODE } from "@niivue/niivue";
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

    const imageList = [
          {
            url:"https://dandiarchive.s3.amazonaws.com/blobs/5df/2ec/5df2ec3d-ec43-4a33-aa38-49a141f8f05d",
            name: "sub-Hb1_sample-hemi_acq-highb_desc-mean+norm+brain.nii.gz",
            colormap: "whiteBackgroundGray",
          },
      ];
    const trackList =[
        {
          url: "https://dandiarchive.s3.amazonaws.com/blobs/67e/980/67e980ca-9220-4960-8b0a-dd4ac48d1c4b",
          name:"sub-Hb1_sample-hemi_acq-highb_desc-stn+atlas+merged.trk",
        },]
    const segmentationList=[
        {
          url: "https://dandiarchive.s3.amazonaws.com/blobs/67e/980/67e980ca-9220-4960-8b0a-dd4ac48d1c4b",
          name: "sub-Hb1_sample-hemi_acq-highb_desc-stn+atlas+merged.trk",
        },
      ]

    // Initialize viewer
    await niivue_slice.current.setSliceType(niivue_slice.current.sliceTypeCoronal);
    niivue_slice.current.opts.dragMode = DRAG_MODE.slicer3D;

    // Load data
    await niivue_render.current.loadMeshes(segmentationList);
    await niivue_slice.current.loadVolumes(imageList);
    await niivue_slice.current.loadMeshes(trackList);
    await niivue_slice.current.setMeshThicknessOn2D(1);
    }
    loadImages();
  }, []);

  // Handlers for showing MRI, streamlines
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
                id="showStreamlines"
                checked={isStreamlines}
                onChange={handleStreamlinesChange}
              />
              <label htmlFor="showStreamlines" style={{ marginLeft: "5px" }}>
                Streamlines
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
          <canvas id="niivue-canvas-slice" style={{ flex: 1, minWidth: 0 }}></canvas>
          <canvas id="niivue-canvas-render" style={{ flex: 1, minWidth: 0 }}></canvas>
        </div>
      </div>
  );
}}
  </BrowserOnly>
);

export default PathwaysNiivueCanvas;