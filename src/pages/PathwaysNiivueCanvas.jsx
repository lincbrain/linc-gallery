import React, { useState } from "react";
import { Niivue, DRAG_MODE } from "@niivue/niivue";
import BrowserOnly from "@docusaurus/BrowserOnly";

const trackList = [
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/c93/749/c937498f-9091-4b5c-9616-b42c7d1570d6",
      name: "subHa1_sample-righthemi_space-orig_tract-AnasaLenticularis_track-ifod_tractogram.trk",
      label: "Ansa Lenticularis",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/ece/c24/ecec24d7-fdf3-44ce-a504-bc8824affcac",
      name: "subHa1_sample-righthemi_space-orig_tract-AnsaSubthalamica_track-ifod_tractogram.trk",
      label: "Ansa Subthalamica",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/bb5/ce0/bb5ce075-4d1f-45b5-b5f1-24424f9ce73c",
      name: "subHa1_sample-righthemi_space-orig_tract-FasciculusRetroflexus_track-ifod_tractogram.trk",
      label: "Fasciculus Retroflexus",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/ef9/1da/ef91da4a-a26a-452a-9e06-fdaf0bd57dd0",
      name: "subHa1_sample-righthemi_space-orig_tract-GPiHb_track-ifod_tractogram.trk",
      label: "GPi Hb",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/a27/bd9/a27bd9f3-d39d-4028-a5e5-a9a0e1076c8a",
      name: "subHa1_sample-righthemi_space-orig_tract-ForniX_track-ifod_tractogram.trk",
      label: "Fornix",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/126/8d5/1268d5d7-7b1c-4ffc-800c-128aecdfdf03",
      name: "subHa1_sample-righthemi_space-orig_tract-DentatoThalamicTract_track-ifod_tractogram.trk",
      label: "Dentato Thalamic Tract",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/1b6/171/1b61716c-5826-4aa2-91ba-2a138dd29e98",
      name: "subHa1_sample-righthemi_space-orig_tract-GPiPPN_track-ifod_tractogram.trk",
      label: "GPi PPN",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/aa8/b63/aa8b63fa-4648-4947-819b-44ccd07fcd22",
      name: "subHa1_sample-righthemi_space-orig_tract-GPiPf_track-ifod_tractogram.trk",
      label: "GPi Pf",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/5c5/c8b/5c5c8b8e-36f5-4969-8076-7ded305a76b5",
      name: "subHa1_sample-righthemi_space-orig_tract-LenticularFasciculus_track-ifod_tractogram.trk",
      label: "Lenticular Fasciculus",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/09f/2a6/09f2a6f3-5a5f-4dc6-8346-2a4426b9a4b2",
      name: "subHa1_sample-righthemi_space-orig_tract-MedialForebrainBundle_track-ifod_tractogram.trk",
      label: "Medial Forebrain Bundle",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/91a/9c9/91a9c939-d6df-40eb-8cf1-7ef8050cff1c",
      name: "subHa1_sample-righthemi_space-orig_tract-MammilloThalamicTract_track-ifod_tractogram.trk",
      label: "Mammillo Thalamic Tract",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/b15/a70/b15a7028-5dd5-4f68-a660-09b78fec6d0a",
      name: "subHa1_sample-righthemi_space-orig_tract-MedialLemniscus_track-ifod_tractogram.trk",
      label: "Medial Lemniscus",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/31f/3a7/31f3a7ac-4be9-4eab-af9d-a6853bc62d6b",
      name: "subHa1_sample-righthemi_space-orig_tract-STN6_track-ifod_tractogram.trk",
      label: "STN 6",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/155/d98/155d9864-c4c8-4e98-8568-b91a9f9f4d60",
      name: "subHa1_sample-righthemi_space-orig_tract-STNPPN_track-ifod_tractogram.trk",
      label: "STN PPN",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/ed5/da8/ed5da869-fc45-49d2-9151-a4725a4f78cb",
      name: "subHa1_sample-righthemi_space-orig_tract-STNGPe_track-ifod_tractogram.trk",
      label: "STN GPe",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/86a/a3d/86aa3dc6-825a-4fb8-9bc2-0516e8c1efd1",
      name: "subHa1_sample-righthemi_space-orig_tract-STNSN_track-ifod_tractogram.trk",
      label: "STN SN",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/a5f/c22/a5fc2243-108b-45e1-8d6e-679fc9bf24a7",
      name: "subHa1_sample-righthemi_space-orig_tract-STNdlPFC_track-ifod_tractogram.trk",
      label: "STN dl PFC",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/255/ff6/255ff677-dc6a-4bbe-9d61-167260f01ae0",
      name: "subHa1_sample-righthemi_space-orig_tract-StriaMedullaris_track-ifod_tractogram.trk",
      label: "Stria Medullaris",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/f90/1f6/f901f6a5-c6c4-4bbd-b938-df9695a7f805",
      name: "subHa1_sample-righthemi_space-orig_tract-StriaTerminalis_track-ifod_tractogram.trk",
      label: "Stria Terminalis",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/e65/eb6/e65eb6db-e42e-4f7d-aead-08bb063b43eb",
      name: "subHa1_sample-righthemi_space-orig_tract-STNdmPFC_track-ifod_tractogram.trk",
      label: "STN dm PFC",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/a96/c69/a96c6998-4b94-4168-9f28-bbf9bd8202f5",
      name: "subHa1_sample-righthemi_space-orig_tract-STNvlPFC_track-ifod_tractogram.trk",
      label: "STN vl PFC",
    },
    {
      url: "https://dandiarchive.s3.amazonaws.com/blobs/046/ccb/046ccb72-c7e7-4d3f-9668-2afac1326316",
      name: "subHa1_sample-righthemi_space-orig_tract-ThVlPFC_track-ifod_tractogram.trk",
      label: "Th Vl PFC",
    },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/057/b13/057b1335-7a8c-42d3-8f32-6462cf591ed2",
    //   name: "subHa1_sample-righthemi_space-orig_tract-AnteriorCommissure_track-ifod_tractogram.trk",
    //   label: "Anterior Commissure",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/146/486/14648661-3a08-4979-8d1d-3bcf9b514d97",
    //   name: "subHa1_sample-righthemi_space-orig_tract-OpticTract_track-ifod_tractogram.trk",
    //   label: "Optic Tract",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/ef2/b7b/ef2b7bb5-3705-457f-b950-d6476508bc9e",
    //   name: "subHa1_sample-righthemi_space-orig_tract-Pu6_track-ifod_tractogram.trk",
    //   label: "Pu 6",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/31f/305/31f3054f-0c9a-476c-99ee-674b70c8968e",
    //   name: "subHa1_sample-righthemi_space-orig_tract-Pu4_track-ifod_tractogram.trk",
    //   label: "Pu 4",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/e7a/8c8/e7a8c8b5-0ecd-4c26-a91e-d5a3688e9630",
    //   name: "subHa1_sample-righthemi_space-orig_tract-PuDlPFC_track-ifod_tractogram.trk",
    //   label: "Pu dl PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/dbf/a87/dbfa879d-2083-4219-9ab3-e92d834fa9d8",
    //   name: "subHa1_sample-righthemi_space-orig_tract-PuVlPFC_track-ifod_tractogram.trk",
    //   label: "Pu Vl PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/d6e/84d/d6e84d66-a161-469b-af44-80f17f09a41d",
    //   name: "subHa1_sample-righthemi_space-orig_tract-PuVmPFC_track-ifod_tractogram.trk",
    //   label: "Pu Vm PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/4a0/a5b/4a0a5b37-6671-480d-9beb-2f80b46e889d",
    //   name: "subHa1_sample-righthemi_space-orig_tract-PuDmPFC_track-ifod_tractogram.trk",
    //   label: "Pu Dm PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/084/d7b/084d7b96-dfd9-4de6-993d-ad4e957c64f2",
    //   name: "subHa1_sample-righthemi_space-orig_tract-STNFEF_track-ifod_tractogram.trk",
    //   label: "STN FEF",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/d24/d43/d24d4342-5e7f-4949-be4f-9841902e0174",
    //   name: "subHa1_sample-righthemi_space-orig_tract-STN4_track-ifod_tractogram.trk",
    //   label: "STN 4",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/810/25a/81025a19-0b88-4057-bad0-d454486187c3",
    //   name: "subHa1_sample-righthemi_space-orig_tract-STNvmPFC_track-ifod_tractogram.trk",
    //   label: "STN vm PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/e69/17c/e6917c03-be5c-4c7f-9593-94ad0049f765",
    //   name: "subHa1_sample-righthemi_space-orig_tract-Th10v_track-ifod_tractogram.trk",
    //   label: "Th 10v",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/59c/f30/59cf300d-3237-4070-ace9-47e2464c78f0",
    //   name: "subHa1_sample-righthemi_space-orig_tract-Th10ml_track-ifod_tractogram.trk",
    //   label: "Th 10ml",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/7ed/08a/7ed08a74-5429-46b6-8cbb-398eb39a6517",
    //   name: "subHa1_sample-righthemi_space-orig_tract-SubthalamicFasciculus_track-ifod_tractogram.trk",
    //   label: "Subthalamic Fasciculus",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/947/c38/947c38e4-005e-4f30-b790-cc5e6280a05d",
    //   name: "subHa1_sample-righthemi_space-orig_tract-ThDmPFC_track-ifod_tractogram.trk",
    //   label: "Th Dm PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/f5d/04e/f5d04ea8-e03e-4748-978c-74c6a8ad1968",
    //   name: "subHa1_sample-righthemi_space-orig_tract-ThOFC_track-ifod_tractogram.trk",
    //   label: "Th OFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/32e/872/32e87270-df86-4b67-add3-92670efcceeb",
    //   name: "subHa1_sample-righthemi_space-orig_tract-ThFEF_track-ifod_tractogram.trk",
    //   label: "Th FEF",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/062/4ad/0624ad1d-c6a6-4576-8c81-0017a65c58cf",
    //   name: "subHa1_sample-righthemi_space-orig_tract-ThDlPFC_track-ifod_tractogram.trk",
    //   label: "Th Dl PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/1e6/f74/1e6f740a-bfbd-4719-9878-c24bbcb97086",
    //   name: "subHa1_sample-righthemi_space-orig_tract-ThOpro_track-ifod_tractogram.trk",
    //   label: "Th Opro",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/462/1f2/4621f201-d6c5-4337-beed-564fdde488ef",
    //   name: "subHa1_sample-righthemi_space-orig_tract-Th6_track-ifod_tractogram.trk",
    //   label: "Th 6",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/701/1c2/7011c255-feda-48f2-b482-4529295f7e6e",
    //   name: "subHa1_sample-righthemi_space-orig_tract-ThVmPFC_track-ifod_tractogram.trk",
    //   label: "Th Vm PFC",
    // },
    // {
    //   url: "https://dandiarchive.s3.amazonaws.com/blobs/9b0/e05/9b0e05eb-9d54-407a-bd1d-2eb2fa470aff",
    //   name: "subHa1_sample-righthemi_space-orig_tract-Th4_track-ifod_tractogram.trk",
    //   label: "Th 4",
    // },
];

export const PathwaysNiivueCanvas = () => (
    <BrowserOnly fallback={<div>Loading...</div>}>
  {() => {
  const niivue_render = React.useRef(null);
  const niivue_slice = React.useRef(null);

  React.useEffect(() => {
    async function loadImages() {
    niivue_slice.current = new Niivue({logLevel: 'debug',
                                  backColor: [1, 1, 1, 1],
                                  crosshairWidth: 1,
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
    const nucleiList=[
      ]

    // Initialize viewer
    await niivue_slice.current.setSliceType(niivue_slice.current.sliceTypeCoronal);
    niivue_slice.current.opts.dragMode = DRAG_MODE.slicer3D;
    niivue_slice.current.opts.loadingText = 'Please do not refresh.'
    niivue_render.current.opts.loadingText = 'Loading (1-2 minutes)...'

    // Load data
    await niivue_render.current.loadMeshes([...trackList, ...nucleiList]);
    niivue_render.current.meshes.forEach((mesh, i) => {
      originalIndexCounts.current[i] = mesh.indexCount;
    });
    await niivue_slice.current.loadVolumes(imageList);
    await niivue_slice.current.loadMeshes(trackList);
    await niivue_slice.current.setMeshThicknessOn2D(1);
    }
    loadImages();
  }, []);

  // Handlers for showing MRI, crosshair, and each tract
  const [isMRI, setIsMRI] = useState(true);

  const handleMRIChange = (event) => {
      const mriState = event.target.checked;
      niivue_slice.current.volumes[0].opacity = mriState ? 1 : 0;
      niivue_slice.current.updateGLVolume();
      setIsMRI(mriState);
    };

  const [isCrosshair, setIsCrosshair] = useState(true);

  const handleCrosshairChange = (event) => {
      const crosshairState = event.target.checked;
      niivue_slice.current.opts.crosshairWidth = crosshairState ? 1 : 0;
      niivue_slice.current.drawScene();
      setIsCrosshair(crosshairState);
    };

  const [tractVisibility, setTractVisibility] = useState(
    trackList.map(() => true)
  );

  const originalIndexCounts = React.useRef({});

  const handleTractChange = (index, event) => {
    const tractState = event.target.checked;
    const mesh = niivue_render.current.meshes[index];
    mesh.indexCount = tractState ? originalIndexCounts.current[index] : 0;
    niivue_render.current.updateGLVolume();

    const slice = niivue_slice.current.meshes[index];
    slice.indexCount = tractState ? originalIndexCounts.current[index] : 0;
    niivue_slice.current.updateGLVolume();

    setTractVisibility(prev => prev.map((v, i) => i === index ? tractState : v));
  };

  const handleShowAllTracts = (event) => {
    const tractState = event.target.checked;
    niivue_render.current.meshes.forEach((mesh, i) => {
      mesh.indexCount = tractState ? originalIndexCounts.current[i] : 0;
    });
    niivue_render.current.updateGLVolume();

    niivue_slice.current.meshes.forEach((mesh, i) => {
      mesh.indexCount = tractState ? originalIndexCounts.current[i] : 0;
    });
    niivue_slice.current.updateGLVolume();

    setTractVisibility(trackList.map(() => tractState));
  };

  return (
      <div className="sidebar-and-niivue-container">
        <aside class="sidebar-container">
          <div class="global-controls">
            <h4>Coronal View Layers</h4>
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
                id="showCrosshair"
                checked={isCrosshair}
                onChange={handleCrosshairChange}
              />
              <label htmlFor="showCrosshair" style={{ marginLeft: "5px" }}>
                Crosshair
              </label>
            </div>
            <hr />
            <h4>Tracts</h4>
            <div>
              <input
                type="checkbox"
                id="showAllTracts"
                checked={tractVisibility.every(v => v)}
                onChange={handleShowAllTracts}
              />
              <label htmlFor="showAllTracts" style={{ marginLeft: "5px" }}>
                Show all
              </label>
            </div>
            {trackList.map((tract, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`tract-${index}`}
                  checked={tractVisibility[index]}
                  onChange={(event) => handleTractChange(index, event)}
                />
                <label htmlFor={`tract-${index}`} style={{ marginLeft: "5px" }}>
                  {tract.label}
                </label>
              </div>
            ))}

            <div>
              <hr />
              <h4>Coronal View Mouse Controls</h4>
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