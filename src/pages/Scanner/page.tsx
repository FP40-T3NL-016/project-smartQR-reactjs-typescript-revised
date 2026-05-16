import { ChangeEvent, useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import AnalysisResult from '../../components/AnalysisResult/page';
import { ScanRecord, addRecord, analyzeQRData } from '../../utils/smartQR';

function Scanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const [imageMessage, setImageMessage] = useState('Uploaded image scan result will appear here.');
  const [cameraMessage, setCameraMessage] = useState('Camera scanner result will appear here.');
  const [manualValue, setManualValue] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageRecord, setImageRecord] = useState<ScanRecord | null>(null);
  const [cameraRecord, setCameraRecord] = useState<ScanRecord | null>(null);
  const [manualRecord, setManualRecord] = useState<ScanRecord | null>(null);

  const stopScanner = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => stopScanner();
  }, []);

  const saveDetectedValue = (value: string, source: 'image' | 'camera' | 'manual') => {
    const record = analyzeQRData(value);
    if (!record.value) {
      if (source === 'image') setImageMessage('No QR data found.');
      if (source === 'camera') setCameraMessage('No QR data found.');
      return;
    }
    addRecord(record.value);
    if (source === 'image') {
      setImageRecord(record);
      setImageMessage('');
    } else if (source === 'camera') {
      setCameraRecord(record);
      setCameraMessage('');
    } else {
      setManualRecord(record);
    }
  };

  const scanUploadedImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageMessage('Please select a QR code image first.');
      setImageRecord(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setImageMessage('Please upload a valid image file.');
      setImageRecord(null);
      return;
    }

    const imageURL = URL.createObjectURL(file);
    const image = new Image();
    image.onload = async () => {
      setImagePreview(imageURL);
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        setImageMessage('Canvas is not supported in this browser.');
        return;
      }

      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      let decodedValue = '';

      try {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'attemptBoth' });
        decodedValue = code?.data || '';
      } catch {
        decodedValue = '';
      }

      if (!decodedValue && window.BarcodeDetector) {
        try {
          const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
          const codes = await detector.detect(image);
          decodedValue = codes[0]?.rawValue || '';
        } catch {
          decodedValue = '';
        }
      }

      if (decodedValue) {
        saveDetectedValue(decodedValue, 'image');
      } else {
        setImageRecord(null);
        setImageMessage('No QR data was decoded. Please try a sharper image, crop only the QR area, or use manual input for testing.');
      }
    };

    image.onerror = () => {
      setImageRecord(null);
      setImageMessage('The selected image could not be loaded.');
      URL.revokeObjectURL(imageURL);
    };

    image.src = imageURL;
  };

  const startScanner = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraMessage('Camera access is not supported in this browser.');
      return;
    }

    if (!window.BarcodeDetector) {
      setCameraMessage('Camera can open, but this browser does not support direct QR detection. Please use the Upload QR Image or Manual Input option.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      video.srcObject = stream;
      await video.play();
      const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
      setCameraMessage('Camera started. Place a QR code clearly in front of the camera.');
      setCameraRecord(null);
      timerRef.current = window.setInterval(async () => {
        try {
          const codes = await detector.detect(video);
          if (codes.length > 0) {
            saveDetectedValue(codes[0].rawValue, 'camera');
            stopScanner();
          }
        } catch {
          setCameraMessage('Scanning is active. Keep the QR code steady and clearly visible.');
        }
      }, 700);
    } catch {
      setCameraMessage('Camera permission denied or unavailable. Please use the Upload QR Image option.');
    }
  };

  const analyzeManualInput = () => {
    if (!manualValue.trim()) {
      setManualRecord(null);
      return;
    }
    saveDetectedValue(manualValue, 'manual');
  };

  const useDemo = (value: string) => {
    setManualValue(value);
    const record = analyzeQRData(value);
    addRecord(record.value);
    setManualRecord(record);
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-5 py-10 lg:px-10">
      <section className="rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">QR Scanner</h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">The scanner page supports three ways to read QR data: camera scan, uploaded QR image and manual input. For best testing, upload a clear QR image or use Chrome/Edge for camera detection.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-5 rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">1. Upload QR Image</h2>
          <p className="leading-7 text-slate-600 dark:text-slate-300">Select a clear QR code picture and the page will try to decode it.</p>
          <label htmlFor="qrImageInput" className="block cursor-pointer rounded-2xl border-2 border-dashed border-cyan-300 bg-cyan-50 p-6 text-center font-extrabold text-cyan-800 transition hover:bg-cyan-100 dark:border-cyan-800 dark:bg-slate-950 dark:text-cyan-200 dark:hover:bg-slate-800">Choose QR Code Image</label>
          <input id="qrImageInput" type="file" accept="image/*" onChange={scanUploadedImage} className="hidden" />
          <div className="flex min-h-56 items-center justify-center rounded-3xl bg-cyan-50 p-4 text-center text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            {imagePreview ? <img src={imagePreview} alt="Uploaded QR preview" className="max-h-80 rounded-2xl object-contain" /> : 'QR image preview will appear here.'}
          </div>
        </section>

        <section className="space-y-5 rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">2. Camera Scanner</h2>
          <p className="leading-7 text-slate-600 dark:text-slate-300">Start the camera and hold a QR code clearly in front of it.</p>
          <video ref={videoRef} muted playsInline className="min-h-56 w-full rounded-3xl bg-slate-950 object-cover" />
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={startScanner} className="rounded-2xl bg-cyan-700 px-5 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Start Camera</button>
            <button type="button" onClick={stopScanner} className="rounded-2xl border border-cyan-600 px-5 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Stop Camera</button>
          </div>
        </section>
      </section>

      {imageRecord ? <AnalysisResult record={imageRecord} emptyText="" /> : <div className="rounded-3xl border border-dashed border-cyan-300 bg-white/80 p-6 text-center text-slate-600 shadow-sm dark:border-cyan-800 dark:bg-slate-900/70 dark:text-slate-300">{imageMessage}</div>}
      {cameraRecord ? <AnalysisResult record={cameraRecord} emptyText="" /> : <div className="rounded-3xl border border-dashed border-cyan-300 bg-white/80 p-6 text-center text-slate-600 shadow-sm dark:border-cyan-800 dark:bg-slate-900/70 dark:text-slate-300">{cameraMessage}</div>}

      <section className="space-y-5 rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-soft dark:border-cyan-900 dark:bg-slate-900">
        <h2 className="text-2xl font-black text-cyan-800 dark:text-cyan-300">3. Manual QR Data Input</h2>
        <p className="leading-7 text-slate-600 dark:text-slate-300">Use this option when browser camera or image decoding is not supported.</p>
        <label htmlFor="manualQRData" className="font-bold text-slate-700 dark:text-slate-200">Manual QR Data</label>
        <textarea id="manualQRData" placeholder="Paste QR data here, for example https://example.com, 03001234567, WIFI:T:WPA;S:CampusNet;P:12345678;;" value={manualValue} onChange={(event) => setManualValue(event.target.value)} className="min-h-36 w-full rounded-2xl border border-cyan-200 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-950" />
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={analyzeManualInput} className="rounded-2xl bg-cyan-700 px-5 py-3 font-extrabold text-white shadow transition hover:-translate-y-1 hover:bg-cyan-800">Analyze Data</button>
          <button type="button" onClick={() => useDemo('https://example.com/login-offer')} className="rounded-2xl border border-cyan-600 px-5 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Demo URL</button>
          <button type="button" onClick={() => useDemo('03001234567')} className="rounded-2xl border border-cyan-600 px-5 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Demo Phone</button>
          <button type="button" onClick={() => useDemo('WIFI:T:WPA;S:CampusNet;P:12345678;;')} className="rounded-2xl border border-cyan-600 px-5 py-3 font-extrabold text-cyan-700 transition hover:-translate-y-1 hover:bg-cyan-700 hover:text-white dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950">Demo WiFi</button>
        </div>
      </section>

      <AnalysisResult record={manualRecord} emptyText="Manual analysis result will appear here." />
    </main>
  );
}

export default Scanner;
